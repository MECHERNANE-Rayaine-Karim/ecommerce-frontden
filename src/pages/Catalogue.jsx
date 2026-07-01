import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';



function Catalogue(){

    const role = localStorage.getItem('role');
    const navigate = useNavigate();


    return (
        <div>
            {role === 'ADMIN' && <AdminPanel />}
            {role === 'USER' && <UserPanel />}
        </div>
    );

}
export default Catalogue;