import React, {useState} from 'react'
import main_url from '../../config'
import Card from 'react-bootstrap/Card'
function Register() {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passClass, setPassClass] = useState('');
    const [confirmPass, setConfirmPass] = useState('hidden-pw');
    
    const confirmPassword = (event) => {
        if (password !== event.target.value){
            console.log('passwordDoesnt')
            setPassClass('error-pass');
            setConfirmPass('pass-not-match')
        } else {
            console.log('passwordMatches')
            setPassClass('correct');
            setConfirmPass('hidden-pw')
            }
        }


    const handleSubmit = (event) => {
        if (passClass !== 'correct') {
            alert('please ensure that your password matches');
        } else {
            const user = {
                username: email,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }

            main_url.post("/users/api/user/", user)
                .then(() => {
                    const loginInfo = {
                        username: email,
                        password: password,
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                    }
                    main_url.post("/users/api-token-auth/", loginInfo)
                    .then(res => {
                        window.localStorage['token'] = res.data['token']
                    }).then(() => {
                        main_url.get("/api/users/", {
                            headers: {
                                Authorization: `Token ${window.localStorage['token']}`
                            }
                        }
                    )
                    })
                }).catch(e => {
                    console.log(e)
                    alert('Please ensure that you have the correct email')
                }).then(()=>{
                    window.location.href='/'
                })

            }
            
        event.preventDefault();
    }
    
    if (window.localStorage.token !== null){
        return(
            <div>
                <Card>
                    <Card.Body>
                        It looks like you are already logged in, to create a new account, logout first!
                    </Card.Body>
                </Card>
            </div>
        )
    }
    
    return (
        <div>
        <div className='container card border-primary mb-3'>
            <h1>JOIN NOW</h1>
            <form className='"card text-white bg-dark mb-3"' onSubmit={handleSubmit}>
                <h2 className='card-header'>Create Account</h2>
                <div className='card-body'>
                <label htmlFor='email'><b> Email: </b>
                <input type='text' value={email} placeholder = 'Email' name='email' onChange = {(e)=> setEmail(e.target.value)}required/>
                </label>
                <br/><br/>
                <label htmlFor='first_name'><b>First Name: </b>
                <input type='text' value={first_name} placeholder = 'First Name' name='first_name' onChange = {(e)=> setFirstName(e.target.value)}required/>
                </label>
                <br/><br/>
                <label htmlFor='first_name'><b>Last Name: </b>
                <input type='text' value={last_name} placeholder = 'Last Name' name='last_name' onChange = {(e)=> setLastName(e.target.value)}required/>
                </label>
                <br/><br/>
                <label htmlFor='password'><b> Password:  </b>
                <input type='password' value={password} placeholder = 'Password' name='password' onChange = {(e)=> setPassword(e.target.value)}required/>
                </label>
                <br/><br/>
                <label htmlFor='password'><b>Confirm Password: </b>
                <input type='password' className={passClass}  placeholder = 'Confirm Password' name='confirmPassword' onChange = {confirmPassword}required/>
                <p className={confirmPass}>Password does not match</p>
                </label>
                <br/><br/>
                <input type='submit' value='Sign-up'/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Register
