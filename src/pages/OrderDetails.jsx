import { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';






function OrdersDetails(){


    const { orderId } = useParams();
    const [order,setOrder] = useState(null);


    useEffect(() => {
       getOrderDetails();
    },[]);

    const getOrderDetails = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/order/getOrderDetails/${orderId}`,{
                   headers: {Authorization: `Bearer ${token}`}
        });
        setOrder(response.data);
    };



    if (!order) return <div> Loading... </div>

    return (
        <div>
            <h3>    Order details    </h3>
            <p>Created at: {order.createdAt}</p>
            <p>Estimated arrival: {order.estimatedArrival}</p>
            <p>Destination: {order.destination}</p>
            <p>Status: {order.status}</p>
            <p>Items: </p>
            {order.orderItemList.map((item) => (
                <div key = {item.itemId}>
                    <p>Product : {item.product.productName}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Price at purchase : {item.priceAtPurchase}</p>
                </div>
            ))}
        </div>
    );

};
export default OrdersDetails;