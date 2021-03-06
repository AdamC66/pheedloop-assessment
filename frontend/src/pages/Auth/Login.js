import React, { useState } from 'react'
import main_url from '../../config'

function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    const handleLogin = (event) => {
        const user = {
            username: email,
            password: password
        }

        main_url.post("/users/api-token-auth/", user)
        .then(res => {
            window.localStorage['token'] = res.data['token']
        }).catch(() => {
            alert('Incorrect login credentials, please try again');
            setPassword('');
        })
        .then(() => {
            if(window.localStorage['token'] !== 'null'){
                window.location.href = '/'
            }});
        event.preventDefault();
        }


    
    return (
        <div>
            <div className='card text-white bg-secondary mb-3' style={{width: "80%", margin:"0 auto", textAlign:"center"}}>
            <h1>Login</h1>
            <form className='card bg-primary mb-3' style={{width: "80%", margin:"0 auto"}} onSubmit = {handleLogin}>
                <br/>
                <label htmlFor='email'><b> Email: </b>
                <input type='text' className="form-control" style={{width: "60%", margin:"0 auto"}} value={email} placeholder = 'Email' name='email' onChange = {(e)=> setEmail(e.target.value)}required/>
                </label>
                <br/>
                <label htmlFor='password'><b> Password: </b></label>
                <input type='password' className="form-control" style={{width: "60%", margin:"0 auto"}} value={password} placeholder = 'Password' name='password' onChange = {(e)=> setPassword(e.target.value)} required/>
                <br/>
                <input className="btn btn-secondary" style={{width: "60%", margin:"20px auto"}}  type='submit' value='Login'/>
            </form>
        </div>
        </div>
    )
}

export default Login
