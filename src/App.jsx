import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import Orders from './pages/Orders';
import OrdersDetails from './pages/OrderDetails';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<div>Home</div>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
<Route path="/catalogue" element={<Catalogue/>} />
<Route path="/orders" element={<Orders/>} />
<Route path="/orders/:orderId" element={<OrdersDetails/>} />
<Route path="/addProduct" element={<ProtectedRoute requiredRole= 'ADMIN'>
                                        <AddProduct />
                                    </ProtectedRoute>} />
</Routes>
</BrowserRouter>
);
}

export default App;