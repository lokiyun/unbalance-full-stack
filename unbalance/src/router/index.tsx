import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import Main from "../pages/main"

const IRouter = () => {
  return (
    <Router>
     <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<Main />} />
     </Routes>
    </Router>
  )
}

export default IRouter