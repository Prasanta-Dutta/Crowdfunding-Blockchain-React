import { useEffect, useContext } from 'react';
import axios from 'axios';
import LogInContext from '../context/LogInContext';

function CheckSession() {
    const { setIsLoggedIn } = useContext(LogInContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.post('/api/user/check-session', {
                    withCredentials: true,
                });
                if (res.data.loggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error("Session check failed:", err);
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, [setIsLoggedIn]);

    return null; // No UI needed
}

export default CheckSession;
