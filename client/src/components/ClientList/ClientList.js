import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
import {List, ListItem, } from "../../components/List";
import { Link } from "react-router-dom";
import API from "../../utils/API";


 




class ClientList extends React.Component {


  render(){
    return(
      <div>
        {this.props.Customers.length ? (
                      <List>
                      {console.log('hello')}
                        {this.props.Customers.map(Customers => (
                          <ListItem key={Customers._id}>
                            <Link to={"/customer/" + Customers._id}>
                              <strong>
                                {Customers.firstName} {Customers.lastName}
                              </strong>
                            </Link>
                            <DeleteBtn onClick={()=>this.props.handleDelete(Customers._id)} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (

                      <h3>No Results to Display {this.props.userInfo}</h3>
                    )}
        </div>
    )
  }
    

}
export default ClientList;



