import React from "react";
import { Navigate, Route, RouteProps, Routes, useLocation } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    let location = useLocation();

    return loggedIn === "true" ? (
        <Routes>
            <Route path="//*" element={<Component />} />
        </Routes>
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};
