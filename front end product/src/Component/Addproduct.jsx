import {useState} from 'react'

const Addproduct = () => {
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [company,setCompany]=useState("")
    const [error,setError]=useState(false)

    const Addhandle = (e)=>{
        e.preventDefault();
    }
    const Additem = async()=>{

      if(!name || !price || !category || !company){
        setError(true)

        return false
      }
      try {
        const userId = JSON.parse(localStorage.getItem("item"))._id
       
           let result = await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
              "Content-type":"application/json"
            }
  
           }) 
           result = await result.json()
           console.log(result,"abc")
           setName("")
           setCompany("")
           setPrice("")
           setCategory("")
  
        
      } catch (error) {
        console.log("add product",error)
      }
     
    }
  return (
    <div className="logindiv">
        <form onSubmit={Addhandle}>
      <input type='text' placeholder='NAME' value={name}   onChange={(e)=>setName(e.target.value)}/>
     <br></br>
    {error && !name && <span className='invalid-input'>name is not valid </span>} 
     <br></br>
      <input type='text' placeholder='PRICE'value={price} onChange={(e)=>setPrice(e.target.value)}/><br></br>
      {error && !price && <span className='invalid-input'>price is not valid </span>} <br></br>
      <input type='text' placeholder='CATERGORY' value={category} onChange={(e)=>setCategory(e.target.value)}/><br></br>
      {error && !category && <span className='invalid-input'>category is not valid </span>} <br></br>
      <input type='text' placeholder='COMPANY' value={company} onChange={(e)=>setCompany(e.target.value)}/><br></br>
      {error && !company && <span className='invalid-input'>company is not valid </span>} <br></br>
      <button type='submit' onClick={Additem}>SUBMIT</button>
      </form>
      
    </div>
  )
}

export default Addproduct
