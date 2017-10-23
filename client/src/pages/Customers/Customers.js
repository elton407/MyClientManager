import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import ClientList from "../../components/ClientList";







class Customers extends Component {
  state = {
    Customers: [],

    firstName: "",
    lastName: "",
    companyName: "",
    companyAddress: "",
    companyBudget: "",
    companyNotes: "",
    dateExpected: "",
    currentUser: ""
  };




  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    API.getCustomers()
      .then(res => {
        if(res.data.statusCode == 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({ currentUser: res.data.sess.passport.user, Customers: res.data.results, firstName: "", lastName: "", companyName: "", companyBudget: "", companyAddress: "", companyNotes: "", dateExpected: "" })
        }   
      })
      .catch(err => console.log(err));
  };


  //   loadCustomers = () => {
  //   API.getCustomers()
  //     .then(res =>
  //       this.setState({ currentUser:res.data.sess.passport.user, Customers: res.data, firstName: "", lastName: "", companyName: "", companyBudget: "", companyAddress: "", companyNotes: "", dateExpected: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  deleteCustomer = id => {
    API.deleteCustomer(id)
      .then(res => this.loadCustomers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.firstName && this.state.lastName) {
      API.saveCustomer({
        userId: this.state.currentUser,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        companyName: this.state.companyName,
        companyBudget: this.state.companyBudget,
        companyAddress: this.state.companyAddress,
        companyNotes: this.state.companyNotes,
        dateExpected: this.state.dateExpected
      })
        .then(res => this.loadCustomers())
        .catch(err => console.log(err));
    }
  };

  render() {

  var well =  {
  minHeight: "20px",
  padding: "19px",
  paddingBottom: "50px",
  marginBottom: "30px",
  backgroundColor: "#083e4b",
  border: "1px solid transparent",
  borderRadius: "4px",
  webkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.05)",
  boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.05)"
}
    return (
    <div>
     <Nav userInfo={this.state.currentUser } />
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add Client</h1>
            </Jumbotron>
          <div>
          <div style = {well}>
            <form>
              <Input
                value={this.state.firstName}
                onChange={this.handleInputChange}
                name="firstName"
                placeholder="First Name (required)"
              />
              <Input
                value={this.state.lastName}
                onChange={this.handleInputChange}
                name="lastName"
                placeholder="Last Name (required)"
              />
              <Input
                value={this.state.companyName}
                onChange={this.handleInputChange}
                name="companyName"
                placeholder="Company Name is (required)"
              />
              <Input
                value={this.state.companyAddress}
                onChange={this.handleInputChange}
                name="companyAddress"
                placeholder="Address  (required)"
              />
               <Input
                value={this.state.companyBudget}
                onChange={this.handleInputChange}
                name="companyBudget"
                placeholder="Budget  (required)"
              />
               <Input
                value={this.state.dateExpected}
                onChange={this.handleInputChange}
                name="dateExpected"
                placeholder="Finsih Date  (required)"
              />
              <TextArea
                value={this.state.companyNotes}
                onChange={this.handleInputChange}
                name="companyNotes"
                placeholder="Notes (Optional)"
              />
              <FormBtn
                disabled={!(this.state.firstName && this.state.lastName)}
                onClick={this.handleFormSubmit}
              >
                Submit Customer
              </FormBtn>
            </form>
            </div>
            </div>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Your Clients</h1>
            </Jumbotron>
            <div style={well}>
            <ClientList Customers={this.state.Customers} userInfo = {this.state.currentUser} handleDelete = {this.deleteCustomer} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}

export default Customers;
