import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const RouteGuard = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user._id) {
        return <Navigate to="/" replace />
    }

    return children;
};

export default RouteGuard;