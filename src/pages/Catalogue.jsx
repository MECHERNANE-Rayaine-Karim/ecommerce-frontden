import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Catalogue(){

    const [products,setProducts] = useState([]);
    const [page , setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [status,setStatus] = useState('');
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(0);
    const [quantities,setQuantity] = useState({});
    const [destination,setDestination] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetchProducts()
        }, [page]);

    const fetchProducts = async () => {
       const response = await axios.get('http://localhost:8080/api/product/getCatalogue',{
           params : {
            page : page,
            size : 10,
            status: status || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
           }
       });
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
    };

    const ordersHistory = async () => {
        const token = localStorage.getItem('token');
        navigate('/Orders');
    };


    const placeOrder = async () => {
        if(  Object.keys(quantities).length === 0 || Object.values(quantities).every(q => q ===  0) )  {
            alert('Please select at least one product');
            return;
        }
        const token = localStorage.getItem('token');
        const filteredQuantities = Object.fromEntries(
            Object.entries(quantities).filter(([id,qty]) => qty > 0 )
        );
        const response = await axios.post('http://localhost:8080/api/order/placeOrder',{
            selectedProducts : filteredQuantities,
            destination
           },
           {
               headers: {Authorization: `Bearer ${token}`}
        });

    };


    const takingProduct = (productId) => {
        setQuantity({
            ...quantities,
            [productId]: (quantities[productId] || 0 ) +1
        });
    };

    const returningProduct =  (productId) => {
        setQuantity({
            ...quantities,
            [productId]: Math.max(0,(quantities[productId] || 0 ) -1 )
        });
    };


    return (
        <div>
            <h2> Product Catalogue </h2>
            {products.map((product) => (
                <div key={product.productId}>
                    <h3>{product.productName}</h3>
                    <p>{product.productDescription}</p>
                    <p>Price: ${product.productPrice}</p>
                    <p>Status: {product.status}</p>
                    <p>Quantity: {quantities[product.productId] || 0 }</p>
                    <button onClick={() => takingProduct(product.productId)}>+</button>
                    <button onClick={() => returningProduct(product.productId)}>-</button>
                </div>
            ))}

            <input
                type ="Number"
                placeholder="minimum price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                 type ="Number"
                 placeholder="maximum price"
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Select status</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="OUT_OF_STOCK">Out of stock</option>
                  <option value="DISCONTINUED">Discontinued</option>
            </select>
            <button
                onClick={placeOrder}>Order
            </button>
            <button
                onClick={fetchProducts}>Fetch
            </button>
            <button onClick={ordersHistory}>Orders history </button>
            <button
                onClick ={() => setPage(page - 1)}
                disabled={page === 0}>
                Previous
            </button>

            <button
                onClick ={() => setPage(page + 1)}
                disabled={page === totalPages - 1}>
                Next
            </button>
        </div>
    );

}
export default Catalogue;