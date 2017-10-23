import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";




class Detail extends Component {
  state = {
    Customer: {},
    Notes: [],

    note: "",
    customerId: "",
    currentUser: ""
  };

  


  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
 

  componentDidMount() {
   this.loadCustomer();
   this.loadNotes();
  }

  loadCustomer = () => {
    API.getCustomer(this.props.match.params.id)
        .then(res => {
          if (res.data.statusCode == 401) {
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({ Customer: res.data.results, currentUser: res.data.sess.passport.user })
        }
      })
        .catch(err => console.log(err));
  };

  loadNotes = () => {
    API.findNotes(this.props.match.params.id)
            .then(res => this.setState({ Notes: res.data, note:"", customerId: "" }))
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
    if (this.state.note) {
      API.createNote({
        note: this.state.note,
        customerId: this.state.Customer._id
      })
        .then(res => this.loadNotes())
        .catch(err => console.log(err));
    }
  };

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
      <Nav userInfo={this.state.currentUser } />
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
              {this.state.Customer.companyName}
              </h1>
              <h2>
                {this.state.Customer.firstName}  {this.state.Customer.lastName}
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="lg-6">
            <article>
              <h1>Company Name</h1>
              <p>
                {this.state.Customer.companyName}
              </p>
              <h1>Company Address</h1>
              <p>
                {this.state.Customer.companyAddress}
              </p>
              <h1>Customer Budget</h1>
              <p>
                {this.state.Customer.companyBudget}
              </p>
              <h1>Expected Completion</h1>
              <p>
                {this.state.Customer.dateExpected}
              </p>
              <h1>Cient Needs</h1>
              <p>
                {this.state.Customer.companyNotes}
              </p>
            </article>
          </Col>
          <Col size="lg-6">
          <h1>Memo List</h1>
          {console.log(this.state.Notes)}
          


            {this.state.Notes[0] ? (
              <List>
                {this.state.Notes.map(note => (
                  <ListItem key={note._id}>
                    
                      <strong>
                        {note.note}
                      </strong>
                   
                    <DeleteBtn onClick={() => this.deleteNote(note._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Memos to Display</h3>
            )}















            <form>
              <Input
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Add A Note"
              />
              <FormBtn
                disabled={!(this.state.note)}
                onClick={this.handleFormSubmit}
              >
                Post Memo
              </FormBtn>
            </form>  
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Clients</Link>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Detail;
