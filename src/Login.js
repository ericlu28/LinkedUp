import React from 'react'
import './Login.css';
import Button from '@mui/material/Button';
import { auth, provider} from './firebase';
import { useStateValue } from './StateProvider';
import {actionTypes} from "./reducer";

 


function Login() {
    const [state, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })

        })
        .catch(error => alert(error.message))
    }
    return (
    <div className = "login">
        <div className = "login__logo"> 
        <img src = "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png" alt = ""/>
        </div>
        <Button type = "submit" onClick = {signIn}>
            Sign In
        </Button>

    </div>
  )
}

export default Login