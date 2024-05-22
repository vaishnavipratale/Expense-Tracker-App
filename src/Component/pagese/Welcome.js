import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Expense from '../Expense/Expense';
const Welcome = () => {
  const [isVerified, setIsVerified] = useState(false);

  const VerifyEmailId = () => {
    let token = localStorage.getItem('token');
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxmN7U0TnbCcdz-VjYAe4liAz7oYG6wlQ',
      {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              let errMessage = 'Authentication Failed, ' + data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);

        alert(
          'Email verification sent successfully. Please check your email and verify your account to start using Expense Tracker.'
        );
        setIsVerified(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (isVerified) {
      alert("Your email has been verified successfully!")

      const timer = setTimeout(() => {
        setIsVerified(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  return (
    <div>
      <div style={{ fontSize: '200%' }}>Welcome to Expense Tracker</div>

      <Button
        variant="outline-success"
        onClick={VerifyEmailId}
        style={{ float: 'right', marginBottom: '500px' }}
      >
        Verify Email
      </Button>
      <p>
        Your profile is incomplete{' '}
        <Link to="completeprofile">
          <span>Complete now</span>
        </Link>
      </p>

      <hr />
      <div style={{padding:'2%'}}><Expense/></div>
    </div>
  );
};

export default Welcome;