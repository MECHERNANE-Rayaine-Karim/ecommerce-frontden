import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogue from './pages/Catalogue';
import Orders from './pages/Orders';


function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<div>Home</div>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
<Route path="/catalogue" element={<Catalogue/>} />
<Route path="/orders" element={<Orders/>} />
<Route path="/orders/:orderId" element={<div>Order Details</div>} />
<Route path="/admin" element={<div>Admin Panel</div>} />
</Routes>
</BrowserRouter>
);
}

export default App;