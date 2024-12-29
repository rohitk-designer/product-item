import {useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const Update = () => {
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [company,setCompany]=useState("")
    const params = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        getapidata()
        // console.log(params)
    },[])
    const getapidata =async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
       setName(result.name)
       setPrice(result.price)
       setCategory(result.category)
       setCompany(result.company)
    }
    const updatehandle = (e)=>{
        e.preventDefault();
    }
    const updateitem =async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-type":"application/json"
            }
        })
        result = await result.json()
        console.log(result)
        navigate("/")

    }
  return (
    <div className="logindiv">
      <form onSubmit={updatehandle}>
      <input type='text' placeholder='NAME' value={name}   onChange={(e)=>setName(e.target.value)}/>
     <br></br><br></br>

      <input type='text' placeholder='PRICE'value={price} onChange={(e)=>setPrice(e.target.value)}/><br></br><br></br>
     
      <input type='text' placeholder='CATERGORY' value={category} onChange={(e)=>setCategory(e.target.value)}/><br></br><br></br>
      
      <input type='text' placeholder='COMPANY' value={company} onChange={(e)=>setCompany(e.target.value)}/><br></br><br></br>
     
      <button type='submit' onClick={updateitem}>UpdateItem</button>
      </form>
    </div>
  )
}

export default Update;
