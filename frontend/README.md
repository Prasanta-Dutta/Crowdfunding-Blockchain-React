# Functionality of some functions:
### Handle Change:
```
const handleChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));    //  When typing/fill input field at that time userData value is set i.e. name,email,mobile,password
    };
```
##### When typing/fill input field at that time userData value is set i.e. name,email,mobile,password are field at user's reaction

### Handle Submit:

```
const handleSubmit = (e) => {
        e.preventDefault();
        // Sign in logic (API call or validation)
        console.log("Logging in with", userData);
        axios.post('/api/user/login', userData, { withCredentials: true }) //  when not using proxy http://localhost:4000/api/register
            .then((res) => {
                .....
            })
            .catch((err) => {
                .....
            });
    };
```
##### When using Proxy, use the route only, axios.post('/api/user/login', userData,)
##### Not using Proxy, use full route, http://localhost:4000/api/register