import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import history from "../history";

import "./index.css"

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    // const { history } = this.props;
    console.log(this.props, history)

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
    history.go(0)
  };

  onSubmitFailure = (errorMsg) => {
    console.log(errorMsg);
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    
    const { username, password } = this.state;
    const userDetails ={"user_name": username, "password": password};
    
    const url = "http://127.0.0.1:8000/login/";
    const options = {
      method: "POST",
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify(userDetails)
      // body: '{"user_name": "santosh", "password": "santosh@123"}'
    }
    // const url = "http://127.0.0.1:8000/users_details/"
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.access_token);
    } else {
      this.onSubmitFailure(data.error_msg);
  }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        {/* <label className="input-label" htmlFor="password">
          PASSWORD
        </label> */}
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        {/* <label className="input-label" htmlFor="username">
          USERNAME
        </label> */}
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };



  render() {
    console.log(this.props, "prop-check")
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    console.log("LoginForm working")
    if (jwtToken !== undefined) {
      return <Navigate to="/"/>;
    }
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" 
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          {/* <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            
            alt="website logo"
          /> */}
          <img src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png" alt='comapny-logo' className="login-website-logo-desktop-image" />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit"  className="login-button" >
            Login
          </button>
          {showSubmitError && <p className="error-message">* Invalid Username and Password</p>}
        </form>
      </div>
    );
  }
}

export default   LoginForm ;