import { useEffect, useContext } from 'react';
import axios from 'axios';
import LogInContext from '../context/LogInContext';

function CheckSession() {
    const { setIsLoggedIn, setIsVerified } = useContext(LogInContext);  //  Change destructuring

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.post('/api/user/check-session', { withCredentials: true });
                setIsLoggedIn(res.data.loggedIn);
                setIsVerified(res.data.verificationStatus)
            } catch (err) {
                console.error("Session check failed:", err);
                setIsLoggedIn(false);
                setIsVerified(false);
            }
        };

        checkAuth();
    }, [setIsLoggedIn, setIsVerified]);     //  Change

    return null; // No UI needed
}

export default CheckSession;
