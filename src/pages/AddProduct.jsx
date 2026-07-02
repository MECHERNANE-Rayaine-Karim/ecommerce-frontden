import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function AddProduct(){
    const [productName,setProductName] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [status,setStatus] = useState('');
    const navigate = useNavigate();

    const addProduct = async() => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:8080/api/product/addProduct`,{
            productName,
            productDescription,
            productPrice: price,
            status
        },{headers: {Authorization: `Bearer ${token}`}});
        navigate('/catalogue');
    }

   return(
      <div>
            <h3> Add Product</h3>
            <input
                type ="text"
                placeholder="product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type ="text"
                placeholder="product description"
                value ={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
            />
            <input
                type ="Number"
                placeholder = "price"
                value ={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="AVAILABLE">Available</option>
                <option value="OUT_OF_STOCK">Out of stock</option>
                <option value="DISCONTINUED">Discontinued</option>
            </select>
            <button onClick={() => addProduct()}> Add </button>
      </div>
   );


}
export default AddProduct;