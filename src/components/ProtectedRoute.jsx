import { Navigate } from 'react-router-dom';

function ProtectedRoute({children,requiredRole}){
    const role = localStorage.getItem('role');
    if(! role === requiredRole ){
        return <Navigate to ="/login" />;
    }
    return children;

}
export default ProtectedRoute;