import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Signup =()=>{
    const [Name,setName]=useState("")
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("item")
        if(auth){
            navigate('/')
        }
    },[])
    const formhandle=(e)=>{
        e.preventDefault();
    
        
    }
    const AddData = async () => {
        if (!Name || !Email || !Password) {
          alert("Please fill all fields!");
          return;
        }
      
        try {
          let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({ name: Name, email: Email, password: Password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!result.ok) {
            const errorData = await result.json();
            console.error("Error response from server:", errorData);
            alert(errorData.message || "An error occurred during registration");
            return;
          }
      
          result = await result.json();
          console.log(result, "User Registration Result");
      
          // Assuming 'result' contains the registered user object
          if (result) {
            localStorage.setItem("item", JSON.stringify(result)); // Save user info in localStorage
            navigate("/"); // Redirect to home or dashboard
            setName(""); // Reset form fields
            setEmail("");
            setPassword("");
          } else {
            alert("Failed to register user");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("An error occurred. Please try again later.");
        }
      };
    return(
        <div>
            <div >
                <h1 style={{textTransform:"capitalize"}}>this is Register page</h1>
                <div>
                    <form onSubmit={formhandle}>

                    <input  type="text" style={{marginTop:"20px"}} value={Name} placeholder="ENTER NAME" onChange={(e)=>setName(e.target.value)}/><br></br><br></br>
                    <input type="text" placeholder="ENTER EMAIL" value={Email} onChange={(e)=>setEmail(e.target.value)}/><br></br><br></br>
                    <input type="text" placeholder="ENTER PASSWORD"  value={Password} onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
                    <button type="button" onClick={()=>AddData()}>SUBMIT</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
export default Signup;