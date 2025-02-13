import { useNavigate } from "react-router-dom";

const Logout = () => {
    localStorage.setItem("login", false);
    let navigate = useNavigate();
    navigate('/login', { replace: true });
}

export default Logout;