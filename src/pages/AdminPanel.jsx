import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function AdminPanel(){

    const [products,setProducts] = useState([]);
    const [page , setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [status,setStatus] = useState('');
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(0);
    const [newPrice,setNewPrice] = useState(0);
    const [editingPriceId,setEditingPriceId] = useState(null);
    const [newStatus,setNewStatus] = useState('');
    const [editingStatusId,setEditingStatusId] = useState(null);
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

    const deleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8080/api/product/deleteProduct/${productId}`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        fetchProducts();
    };

    const changePrice = async (productId,newPrice) => {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`http://localhost:8080/api/product/changePrice/${productId}`,{},{
            headers: {Authorization: `Bearer ${token}`},
            params:{ newPrice }
        });
        setNewPrice(0);
        fetchProducts();
    };

    const changeStatus = async (productId,newStatus) => {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:8080/api/product/changeStatus/${productId}`,{},{
                headers: {Authorization: `Bearer ${token}`},
                params:{ newStatus }
            });
            setNewStatus('');
            fetchProducts();
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
                    <button onClick={() => deleteProduct(product.productId)}> delete </button>
                    { !(editingPriceId === product.productId) ? (
                            <button onClick={() => setEditingPriceId(product.productId)}> change price </button>
                        ) : (
                                <div>
                                    <input
                                        type = "Number"
                                        placeholder ="enter the price"
                                        value ={newPrice}
                                        onChange = {(e)=>setNewPrice(e.target.value)}
                                    />
                                    <button onClick={() => {changePrice(product.productId,newPrice);
                                        setEditingPriceId(null);} }> save </button>
                                    <button onClick={() => setEditingPriceId(null)}> cancel </button>
                                </div>
                    )}
                    { !(editingStatusId === product.productId) ? (
                       <button onClick={() => setEditingStatusId(product.productId)}> change status </button>) :
                       (
                            <div>
                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="">Select status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="OUT_OF_STOCK">Out of stock</option>
                                    <option value="DISCONTINUED">Discontinued</option>
                                </select>
                                <button onClick={() => {changeStatus(product.productId,newStatus);
                                                            setEditingStatusId(null);} }> save </button>
                                <button onClick={() => setEditingStatusId(null)}> cancel </button>
                            </div>
                       )}
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
                onClick={fetchProducts}>Fetch
            </button>
            <button
                onClick={() => navigate('/addProduct')}> add product
            </button>
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
export default AdminPanel;