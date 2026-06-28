import { useState , useEffect } from 'react';
import axios from 'axios';




function Orders(){


    const [orders,setOrders] = useState([]);
    const [orderedItems,setOrderedItems] = useState([]);
    const [page , setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [status,setStatus] = useState('');
    const [destination,setDestination] = useState('');





    useEffect(() => {
            getOrders()
            }, [page]);


    const getOrders = async () => {
           const token = localStorage.getItem('token');
           const response = await axios.get('http://localhost:8080/api/order/getOrders',{
               params : {
                page : page,
                size : 10,
                status: status || undefined
               },
               headers: {Authorization: `Bearer ${token}`}
           });
            setOrders(response.data.content);
            setTotalPages(response.data.totalPages);
    };







    return(
        <div>
            <h2>    Orders history    </h2>
            {orders.map((order) => (
                <div key={order.orderId}>
                    <h2>Order: </h2>
                    <p>Created at: {order.createdAt}</p>
                    <p>Estimated arrival: {order.estimatedArrival}</p>
                    <p>Destination: {order.destination}</p>
                    <p>Status: {order.status}</p>
                    <p></p>
                    <p></p>
                </div>
            ))}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                 <option value="">Select order status</option>
                 <option value="PENDING">Pending</option>
                 <option value="DELIVERED">Delivered</option>
                 <option value="CANCELLED">Cancelled</option>
            </select>
            <button onClick={getOrders}> search </button>
            <button onClick ={() => setPage(page - 1)} disabled={page === 0}> Previous </button>
            <button onClick ={() => setPage(page + 1)} disabled={page === totalPages - 1}>Next </button>
        </div>
    );


}
export default Orders;