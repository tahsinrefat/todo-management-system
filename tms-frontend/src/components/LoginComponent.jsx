import React from 'react'
import { useState } from 'react'
import { loginAPICall, storeToken } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { saveLoggedInUser } from '../services/TodoService'

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();
        loginAPICall(usernameOrEmail, password).then(response => {
            console.log(response.data);

            // const token = 'Basic '+window.btoa(usernameOrEmail+":"+password);
            const token = "Bearer " + response.data.accessToken;
            storeToken(token);

            saveLoggedInUser(usernameOrEmail);
            navigate('/todos');

            window.location.reload(false);
        }).catch(error => {
            console.error(error)
        })
    }
  return (
    <div className="container-fluid px-0">
        <br />
        <br />
        <div className="row mx-0">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h2 className='text-center'>Login Form</h2>
                    </div>

                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">Username or Email</label>
                                <div className="col-md-9">
                                    <input type="text" 
                                        name='usernameOrEmail'
                                        className='form-control'
                                        placeholder='Enter Username or Email'
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                    <input type="password" 
                                        name='password'
                                        className='form-control'
                                        placeholder='Enter Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-9 offset-md-3">
                                    <button className='btn btn-primary' onClick={handleLoginForm}>Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent