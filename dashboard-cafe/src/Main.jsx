import React from "react"
import {Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Menu from "./pages/Menu"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Meja from "./pages/Meja"
class Main extends React.Component{
    render(){
        return(
            <Routes>
                <Route exact path="/" element={<Dashboard />}></Route>
                <Route exact path="/menu" element={<Menu />}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/register" element={<Register/>}></Route>
                <Route exact path="/meja" element={<Meja/>}></Route>
            </Routes>
        )
    }
}
export default Main;