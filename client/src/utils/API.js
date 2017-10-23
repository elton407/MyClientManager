import axios from "axios";

export default {
  // Gets all books
  getCustomers: function() {
    return axios.get("/api/customer");
  },
  // Gets the book with the given id
  getCustomer: function(id) {
    return axios.get("/api/customer/" + id);
  },
  // Deletes the book with the given id
  deleteCustomer: function(id) {
    return axios.delete("/api/customer/" + id);
  },
  // Saves a book to the database
  saveCustomer: function(customerData) {
    return axios.post("/api/customer", customerData);
  },
  createNote: function(noteData){
    return axios.post("/api/note/", noteData);
  },
  findNotes: function(id){
    return axios.get("/api/note/" + id);
  },
  deleteNote: function(id) {
    return axios.delete("/api/note/" + id + "/notes");
  },
  findNote: function(id) {
    return axios.get("/api/note" + id + "/notes");
  },
  login: function(userData) {
    return axios.post("/api/auth/login", userData);
  },
  logout: function() {
    return axios.get("/api/auth/logout");
  },
  register: function(userData) {
    return axios.post("/api/auth/register", userData);
  }
};
