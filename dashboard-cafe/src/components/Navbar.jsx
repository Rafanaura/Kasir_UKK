import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    constructor(){
        super()
        this.state = {
          role : ""
        }
        this.state.role = localStorage.getItem("role")
        }
    
        Logout = ()=> {
          localStorage.clear();
          window.location ="/"
        }
    render(){
        return(
            <nav className="navbar navbar-expand-lg bg-white shadow-lg">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <a className="navbar-brand" href="index.html">
                    Nau's Cafe
                </a>

                <div className="d-lg-none">
                    <button type="button" className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>

                        {/* <li className="nav-item">
                            <a className="nav-link" href="about.html">Story</a>
                        </li> */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/menu">Menu</Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" to="/meja">Meja</Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="contact.html">Transaksi</a>
                        </li>
                    
                    </ul>
                </div>

                <div className="d-none d-lg-block">
                    <button onClick={()=> this.Logout()} type="button" className="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Logout</button>
                </div>

            </div>
        </nav>
        )
    }
}
export default Navbar;