import React, { useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export default function LogIn() {
  const history = useNavigate();
  const emailInputref = useRef();
  const passwordInputref = useRef();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputref.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ',{
        method:"POST",
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:enteredEmail
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{
        if(res.ok){
            alert("Your forgot password link has been sent to your email.");
            return res.json();
        }else{
            return res.json().then((data)=>{
                if(data && data.error && data.error.message){
                    let errMessage = "Authentication Failed, " + data.error.message;
                    throw new Error(errMessage);
                }
            })
        }
    }).then((data)=>{
        console.log(data);
        console.log("Forget Password Link has been sent successfully.")
    }).catch((err)=>{
        alert(err.meassage);
    })
};
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputref.current.value;
    const enteredpassword = passwordInputref.current.value;
    localStorage.setItem("userEmail", enteredEmail);
    //console.log(enteredEmail,enteredpassword)

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredpassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            //this also return a promise
            let errormessage = "authenication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.idToken);
        console.log(data.idToken);
        history('/welcome');
        //history('/expense');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={emailInputref}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwordInputref}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                        <p className="mb-0  text-center">
                        Forget passward??{" "}
                          <Link className="text-primary fw-bold"onClick={handleForgotPassword} >forget passward</Link>
                        </p>
                    </div>

                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}