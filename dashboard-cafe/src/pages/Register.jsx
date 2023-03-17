import React from "react";
import axios from "axios";
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      nama_user: "",
      role: "",
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

  handleRegister= (e) => {
    e.preventDefault();
    let user = {
        nama_user: this.state.nama_user,
        role: this.state.role,
        username: this.state.username,
        password: this.state.password
    }
    let url = "http://localhost:8000/user/tambah"
    axios.post(url, user)
        .then(res => {
            window.alert("Success to Register")
            window.location = "/login"
        })
        .catch(err => {
            console.log(err)
        })
}
  render() {
    return (
      <>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
					
				</div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                  <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last"></div>
                  <div className="Register-wrap p-4 p-lg-5">
                    
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Register</h3>
                      </div>
                      <div className="w-100">
        
                      </div>
                    </div>
                    <form onSubmit={(event) => this.handleRegister(event)}> 
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">
                         Nama
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nama User"
                          name="nama_user"
                          id="nama_user"
                          value={this.state.nama_user}
                          onChange={this.bind}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="role  ">
                            Role
                        </label>
                              <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="role" value={this.state.role} onChange={this.bind}>
                                <option value="DEFAULT">Role</option>
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="manajer">Manajer</option>
                              </select>
                            </div>
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
                          Register
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
export default Register;
