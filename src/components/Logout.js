import { useContext } from 'react';
import UserContext from './../context/UserContext';

export default function Logout({ setShowModal }) {
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        setUser(null)
        setShowModal(true)
    }

    return <div>
        <div className='navbar'>
            {user ? <span className='h4'>Hola, {user}</span> : null}
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    </div>
}