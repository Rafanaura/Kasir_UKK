import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      username: "",
      password: "",
      logged: true,
    };
  }
  bind = (event) => {
    //event for handling
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    //event prevent default untuk mencegah terjadinya event bawaan dari sebuah DOM, misalnya tag "a href" jika kita klik, maka halaman browser akan melakukan reload, atau sebuah form jika kita klik tombol submit maka akan melakukan reload pula.
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    let url = "http://localhost:8000/user/login";
    axios.post(url, data).then((res) => {
      // this.setState({logged : res.data.logged})
      if (res.data.logged) {
        let user = res.data.user;
        let token = res.data.token;
        let nama_user = res.data.user.nama_user;
        let role = res.data.user.role;
        let id_user = res.data.user.id_user;
        localStorage.setItem("user", JSON.stringify(user));
        // JSON.parse(localStorage.getItem("user"))
        localStorage.setItem("token", token);
        localStorage.setItem("nama_user", nama_user);
        localStorage.setItem("role", role);
        localStorage.setItem("id_user", id_user);
        window.location = "/";
      } else {
        window.alert(res.data.message);
      }
    });
  };
  render() {
    return (
      <>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Login #07</h2>
				</div> */}
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                  <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last"></div>
                  <div className="login-wrap p-4 p-lg-5">
                    
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Sign In</h3>
                      </div>
                      <div className="w-100">
                        <p className="social-media d-flex justify-content-end">
                          <a
                            href="/#"
                            className="social-icon d-flex align-items-center justify-content-center"
                          >
                            <span className="fa fa-facebook"></span>
                          </a>
                          <a
                            href="/#"
                            className="social-icon d-flex align-items-center justify-content-center"
                          >
                            <span className="fa fa-twitter"></span>
                          </a>
                        </p>
                      </div>
                    </div>
                    {!this.state.logged ? (
                      <div className="alert alert-danger mt-1">
                        {this.state.message}
                      </div>
                    ) : null}
                    <form onSubmit={(event) => this.handleLogin(event)}>
                    <input type="hidden" />
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="name">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          id="username"
                          value={this.state.username}
                          onChange={this.bind}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          id="password"
                          value={this.state.password}
                          onChange={this.bind}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control btn btn-primary submit px-3"
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="form-group d-md-flex">
                        <div className="w-50 text-left">
                          <label className="checkbox-wrap checkbox-primary mb-0">
                            Remember Me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="w-50 text-md-right">
                          <a href="/#">Forgot Password</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Login;
