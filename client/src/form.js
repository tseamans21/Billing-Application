import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router} from 'react-router-dom';
import swal from 'sweetalert';
import CompanyLogo from './logo.png'
import './App.css';
// True or False options 
const trueOrFalse = [
  {label: 'None', value: 'None'},
  {label: 'True', value: 'true'}, 
  {label: 'False', value: 'false'}
]
class Form extends React.Component {
  //message that info has been sent, need to reconfigure incase the entry is a duplicate.
onButtonCLickHandler = () => {
}
//imported from Schema and saved as strings so you can view in Web App console to see the inputs being stored; also used for Payload//
  state = {
    name: '',
    email: '',
    phone: '', 
    credits: 200, 
    creditsReset: 30, 
    creditUser: '',
    canGoNegative: '',
    posts: []
  };
  componentDidMount = () => {
    this.getblogpost();
  };
//used for creating payload to send to MongoDB//
  getblogpost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }
//Shows real time input from input boxes//
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  handleChange2 = ({ target }) => { 
    const { name, value } = target; 
    this.setState({ [name]: value });
  };
  submit = (event) => {   
    event.preventDefault();
    // Here is where we check if the user/group are credit users. 
    // If they are not evaluated to be credit users then we set 
    // their credits to 0.
    if (this.state.creditUser === "false") { 
      console.log('We made it in the Submit IF.');
      this.state.credits = 0;
    } else { 
      console.log("We entered the else.");
    }
//payload sent to Node.js to be posted in MongoDB//
    const payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone, 
      credits: this.state.credits, 
      creditsReset: this.state.creditsReset, 
      creditUser: this.state.creditUser,
      canGoNegative: this.state.canGoNegative,
    };
//estabishing connection to Node.js and MongoDB//
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getblogpost();
        swal('Information has been sent to Database', {
          className: "green-bg",
        })
      })
      .catch(() => {
        swal('The Information was NOT sent to the Database' ,{
          className: "red-bg",
        });
        console.log('Internal server error');
      });;
  };
  resetUserInputs = () => {
    this.setState({
      name: '',
      email: '', 
      phone: '',
      credits: 200, 
      creditsResest: 30, 
      creditUser: '', 
      canGoNegative: ''
    });
  };
  render() {
    console.log('State: ', this.state);
    //JSX
    return(
<Router>
    <div>
      {/* inputs for payload to be sent to DB */}
      <div className="app">
        <h1 className="header1">Add a New User:</h1>
        <br></br>
        <form onSubmit={this.submit}>
         {/* input text box's for needed payload */}
          <div className="form-input">
            <input 
              type="text"
              name="name"
              placeholder="Enter First and Last Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="text"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          < div className ="form-input">
            <input 
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={this.state.phone}
            onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="select-Container">
          <label style= {{marginLeft:"30%", color:"white"}}>Are they credit users?</label>
            <select name="creditUser" value={this.state.creditUser} onChange={this.handleChange}>
              {trueOrFalse.map((option) => (
                <option id= "creditUser" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="select-Container">
          <label style= {{marginLeft:"30%", color:"white"}}>Can they go negative on credits?</label>
            <select name="canGoNegative" value={this.state.canGoNegative} onChange={this.handleChange}>
              {trueOrFalse.map((option) => (
                <option id= "stateOfProject" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button className="formButton"  onClick={this.submit}>Create User or Group</button>
        </form>
</div>
<br></br>
      <img className="photo" src= {CompanyLogo}></img>
      </div>
      </Router>
    );
  }
}
export default Form;