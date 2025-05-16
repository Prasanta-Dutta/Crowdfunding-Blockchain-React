import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LogInContext from '../context/LogInContext';

const Logout = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(LogInContext);
    const navigatePage = useNavigate();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        if(hasLoggedOut.current) return;
        hasLoggedOut.current = true;

        if (isLoggedIn) {
            axios.post('/api/user/logout', {}, { withCredentials: true })
                .then(() => {
                    toast.success('Logged out');
                    setIsLoggedIn(false);
                    setTimeout(() => navigatePage('/signin'), 1000);
                })
                .catch((err) => {
                    toast.error(`❌ ${err.message}`);
                });
        } 
        else {
            // Already logged out (e.g., due to refresh)
            navigatePage('/signin');
            return;
        }
    }, []);    

    return null;
};

export default Logout;
