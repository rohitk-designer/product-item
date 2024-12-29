import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import Signup from "./Component/Signup";
import PrivateComponent from "./Component/PrivateComponent";
import Login from "./Component/Login";
import Addproduct from "./Component/Addproduct";
import ProductList from "./Component/ProductList";
import Update from "./Component/Update";

function App() {
  return (
    <>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<Addproduct />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/logout" element={<h1>this is Logout page</h1>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
