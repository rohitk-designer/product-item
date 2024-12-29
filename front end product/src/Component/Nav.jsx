import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  let auth = localStorage.getItem("item");
  try {
     auth = auth ? JSON.parse(auth) : null;
  } catch (error) {
    console.error("Invalid auth data in localStorage:", error);
    auth = null;
  }
   
  const logout = () => {
    localStorage.removeItem("item");
    
    navigate("/Signup");
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add product</Link>
          </li>
          <li>
            <Link to="/update">update Product</Link>
          </li>

         
          <li>
            <Link to="/Signup" onClick={logout}>
               Logout ({auth?.name || ""})
              
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            {" "}
            <Link to="/Signup">Signup</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
