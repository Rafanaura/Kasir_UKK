import React from "react"
import axios from "axios"
class Menu extends React.Component{
    constructor(){
        super()
        this.state = {
            menu : [],
            isModalOpen: false,
            token: "",
            id_menu: 0,
            nama_menu: "",
            jenis: "",
            deskripsi: "",
            harga: "",
            gambar: "",
            id_user: 0,
            action : ""
        }
        if(localStorage.getItem("token")) {
            if(
                localStorage.getItem("role") === "admin"
            ) {
              this.state.token = localStorage.getItem("token")
              this.state.nama_user = localStorage.getItem("nama_user")
            } else {
              window.alert("You're not admin!")
              window.location="/"
            }
          } else {
            window.location = "/login"
          }
    }
    bind = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        })
      }
    
      Modal = () => {
        this.setState({
          isModalOpen : false
        })
      }
      getMenu = () => {
        let url = "http://localhost:3000/menu"
        axios.get(url)
        .then(res => {
          this.setState({
            menu : res.data.menu
          })
          console.log(this.state.menu)
        })
        .catch(err => {
          console.log(err)
        })
      }
      handleFile = (e) => {
        this.setState({
            gambar: e.target.files[0]
        })
    }
    Add = () => {
        this.setState({
          isModalOpen : true,
          nama_menu: "",
          jenis: "",
          deskripsi: "",
          gambar: "",
          harga : "",
          action : "insert"
        })
      }
    Edit = (item) => {
        this.setState({
          isModalOpen: true,
          id_menu : item.id_menu,
          nama_menu: item.nama_menu,
          jenis: item.jenis,
          deskripsi: item.deskripsi,
          gambar: item.gambar,
          harga : item.harga,
          action: "update"
        })
      }
      Drop = (id_menu) => {
        let url = "http://localhost:8000/menu" + id_menu
        if(window.confirm("Are you sure to delete this paket?"))
        axios.delete(url)
          .then(res => {
            console.log(res.data.message)
            this.getMenu()
          })
          .catch(err => {
            console.log(err.message)
          })
      }
      saveMenu = (event) => {
        event.preventDefault()
        let data = {
          nama_menu : this.state.nama_menu,
          jenis :this.state.jenis,
          deskripsi: this.state.deskripsi,
          gambar: this.state.gambar,
          harga : this.state.harga
        }
        let url = ""
        if(this.state.action === "insert") {
          url = "http://localhost:8000/menu/tambah-menu"
          axios.post(url,data)
          .then(res => {
            this.getMenu()
            this.Modal()
          })
          .catch(err => {
            console.log(err.message)
          })
          this.setState({
            isModalOpen : false
          })
        } else if (this.state.action === "update"){
          url = "http://localhost:8000/menu/" + this.state.id_menu
          axios.put(url,data)
          .then(res => {
            this.getMenu()
            this.Modal()
          })
          .catch(err => {
            console.log(err.message)
          })
          this.setState({
            isModalOpen : false
          })
        }
      }
      componentDidMount(){
        this.getMenu()
      }
    
    render(){
        return(
            <section className="menu section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <h2 className="text-center mb-lg-5 mb-4">Menus</h2>
                            <button type="button" className="btn btn-outline-dark" onClick={() => this.Add()}>Tambah Data</button>
                        </div>
                        <br></br>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/breakfast/brett-jordan-8xt8-HIFqc8-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Breakfast</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Morning Fresh</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>12.50</span>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">4.3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">102 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/lunch/farhad-ibrahimzade-MGKqxm6u2bc-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Lunch</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Tooplate Soup</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>24.50</span>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">50 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/dinner/keriliwi-c3mFafsFz2w-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Dinner</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Premium Steak</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>45</span>

                                    <del className="ms-4"><small>$</small>150</del>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">86 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/dinner/farhad-ibrahimzade-ZipYER3NLhY-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Dinner</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Seafood Set</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>86</span>

                                    <del className="ms-4"><small>$</small>124</del>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">44 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/breakfast/louis-hansel-dphM2U1xq0U-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Breakfast</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Burger Set</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>20.50</span>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">4.3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">102 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="menu-thumb">
                                <div className="menu-image-wrap">
                                    <img src="images/lunch/farhad-ibrahimzade-D5c9ZciQy_I-unsplash.jpg" className="img-fluid menu-image" alt=""/>

                                    <span className="menu-tag bg-warning">Lunch</span>
                                </div>

                                <div className="menu-info d-flex flex-wrap align-items-center">
                                    <h4 className="mb-0">Healthy Soup</h4>

                                    <span className="price-tag bg-white shadow-lg ms-4"><small>$</small>34.20</span>

                                    <div className="d-flex flex-wrap align-items-center w-100 mt-2">
                                        <h6 className="reviews-text mb-0 me-3">3/5</h6>

                                        <div className="reviews-stars">
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star-fill reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                            <i className="bi-star reviews-icon"></i>
                                        </div>

                                        <p className="reviews-text mb-0 ms-4">64 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}
export default Menu;