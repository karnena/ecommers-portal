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
    console.log(JSON.stringify(userDetails), "ok")
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
          src="data:image/png;base64,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"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          {/* <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            
            alt="website logo"
          /> */}
          <img src="https://www.x-cart.com/wp-content/uploads/2019/01/ecommerce.jpg" alt='comapny-logo' className="login-website-logo-desktop-image" />
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