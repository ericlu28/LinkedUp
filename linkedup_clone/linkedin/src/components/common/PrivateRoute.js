import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('auth') ?
                <Component {...props} />
            : <Navigate to="/login" />
        )} />
    );
};

export default PrivateRoute;