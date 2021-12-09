import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
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

  // onSubmitSuccess = (jwtToken) => {
  //   const { history } = this.props;

  //   Cookies.set("jwt_token", jwtToken, {
  //     expires: 30,
  //     path: "/",
  //   });
  //   history.replace("/");
  // };

  onSubmitFailure = (errorMsg) => {
    console.log(errorMsg);
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    
    const { username, password } = this.state;
    const user_name =username
    const userDetails ={"user_name": "santosh", "password": "santosh@123"};
    // console.log(JSON.stringify(userDetails))
    const url = "http://127.0.0.1:8000/login/";
    const options = {
      method: "POST",
      headers: {
      "Content-Type": "application/json"},
      body: '{"user_name": "santosh", "password": "santosh@123"}'
    }
    // const url = "http://127.0.0.1:8000/users_details/"
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
  //   if (response.ok === true) {
  //     this.onSubmitSuccess(data.jwt_token);
  //   } else {
  //     this.onSubmitFailure(data.error_msg);
  // }
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
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    // if (jwtToken !== undefined) {
    //   return <Navigate to="/" />;
    // }
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
          <img src="data:image/png;base64,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" alt='comapny-logo' className="login-website-logo-desktop-image" />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;