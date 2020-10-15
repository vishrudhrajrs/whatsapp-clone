import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import "./login.css" 
import {auth, provider} from "../firebase"
import { useStateValue } from '../StateProvider'
import { actionType } from '../reducer'

function Login() {
    const [{}, dispatch] = useStateValue();
    const signin = ()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type: actionType.SET_USER,
                user:result.user
            })
        }).catch(err=>{
            alert(err.message)
        })
    }
    return (
        <div>
            <div className="login">
                <div className="login_container">
                    <img alt="logo" src="https://i.pinimg.com/originals/79/dc/31/79dc31280371b8ffbe56ec656418e122.png" />

                
                <div className="text">
                   <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signin} className="btn">
                    Sign In with Google
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
