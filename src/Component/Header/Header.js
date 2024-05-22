import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";



const Header = (props) => {

  const history = useNavigate();


  const logoutHandler = ()=> {
    localStorage.removeItem('idToken');

    alert("Do you want Logout")
    history('login')
  };
  
  return (
    <div style={{backgroundColor: 'beige'}}>
      <Nav className="justify-content-center" activeKey="/home">
      <div style={{margin:'20px'}}><Link to="/">SignUp</Link></div>
    
    <div style={{margin:'20px'}}><Link to="login" onClick={logoutHandler}><Button variant="outline-danger">Logout</Button></Link></div>

      </Nav>
       </div>
  )
};

export default Header;