import React, { Component, PropTypes } from 'react';
import { login } from '../../connection';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: true,
      errorMessage: "",
      loading: false // if we are currently checking a password
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleRememberMeChange(e) {
    this.setState({ rememberMe: e.target.checked });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { router } = this.context;
    this.setState({ loading: true });
    // call login(userIdent, password, rememberMe?, callback)
    login(["user/username", this.state.username], this.state.password, this.state.rememberMe, (result) => {
      if (result.status !== 200) {
        this.setState({
          errorMessage: result.body.message || "Unknown error, please retry.",
          loading: false
        });
      } else {
        router.push(this.props.location.query.redirect || "/");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    {this.state.errorMessage ? <div className="alert alert-danger">{this.state.errorMessage}</div> : null}
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                    <div className="form-check mb-4">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name="rememberMe" checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)}/>
                         <span>Keep me signed in </span>
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" disabled={this.state.loading} className="btn btn-primary px-4">{this.state.loading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : "Login"}</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                <div className="card-block text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button type="button" className="btn btn-primary active mt-3">Register Now!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
