import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [asc, setAsc] = useState(false);
  useEffect(() => {
    Getproduct();
  }, []);
  const Getproduct = async () => {
    let result = await fetch("http://localhost:5000/products");

    result = await result.json();
    console.log(result, "abc");
    setProduct(result);
  };
  const ProductDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      Getproduct();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      Getproduct();
    }
  };
  const Shortdata = (key) => {
    const sortedProducts = [...product].sort((a, b) => {
      if (asc) {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
    setProduct(sortedProducts);
    setAsc((prevState) => !prevState);
  };

  return (
    <div>
      <h1>product list </h1>
      <input
        type="text"
        placeholder="search item "
        style={{ width: "300px", padding: "5px" }}
        onChange={searchHandle}
      />
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "90%",
          textAlign: "center",
          margin: "auto",
        }}>
        <thead>
          <tr>
            <th
              style={{ border: "1px solid black" }}
              onClick={() => Shortdata("name")}>
              <button>NAME</button>
            </th>
            <th
              style={{ border: "1px solid black" }}
              onClick={() => Shortdata("price")}>
              <button>PRICE</button>
            </th>
            <th
              style={{ border: "1px solid black" }}
              onClick={() => Shortdata("category")}>
              <button>CATERGORY</button>
            </th>
            <th
              style={{ border: "1px solid black" }}
              onClick={() => Shortdata("company")}>
              <button>COMPANY</button>
            </th>
            <th style={{ border: "1px solid black" }} onClick={Shortdata}>
              OPRATION
            </th>
            <th style={{ border: "1px solid black" }} onClick={Shortdata}>
              EDITOPRATION
            </th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? (
            product.map((item, id) => (
              <tr key={id}>
                <td style={{ border: "1px solid black" }}>{item.name}</td>
                <td style={{ border: "1px solid black" }}>$ {item.price}</td>
                <td style={{ border: "1px solid black" }}>{item.category}</td>
                <td style={{ border: "1px solid black" }}>{item.company}</td>
                <td
                  style={{ border: "1px solid black" }}
                  onClick={() => ProductDelete(item._id)}>
                  <button>Delete </button>{" "}
                </td>
                <td style={{ border: "1px solid black" }}>
                  <button>
                    <Link to={"/update/" + item._id}>update</Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <h1>data is not found</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
