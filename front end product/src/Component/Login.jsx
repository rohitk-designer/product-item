import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("item")
        if(auth){
            navigate("/")
        }
    },[])
  const formhandle = (e) => {
    e.preventDefault();
  };
  const loginhandle = async () => {
      
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email,password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result =  await result.json();
    console.log(result,"abv")
    if(result){
      console.log(result.user,"abc")
            localStorage.setItem("item",JSON.stringify(result));
          
            navigate("/")

    }else{
        alert("please  enter correct  data")
    }
  };

  return (
    <div className="logindiv">
      <form onSubmit={formhandle}>
        <input
          type="text"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          type="text"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit" onClick={loginhandle}>
          LOGIN
        </button>
      </form>
    </div>
  );
};
export default Login;
