import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import './register.css'

function Register(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e) {

        e.preventDefault();
        if (name.length === 0 || email.length === 0 || password.length === 0) {
            alert("Los campos no pueden estar vacíos")
            return
        }
    
        if (password.length < 8 || password.length > 16) {
            alert("La contraseña debe tener entre 8 y 16 caracteres")
            return
        }
        
        fetch(props.url + "/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message)
                    setEmail("")
                    setPassword("")
                    setName("")
                } else {
                    navigate('/login')
                }
            } 
        )
    }


    return (
        <div>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-md-block">
                                    <img src="/assets/logo.png" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 1rem 1rem 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onKeyDown={(e) => {
                                            if(e.key === 'Enter') {
                                                handleSubmit(e)
                                            }
                                        }}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i> */}
                                                <span className="h1 fw-bold mb-0">Register</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-outline manolo">
                                                        <label className="form-label" htmlFor="form3Example1">Nombre</label>
                                                        <input type="text" id="form3Example1" className="form-control"  onChange={ (e) => {
                                                            setName(e.target.value)
                                                        }}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example17">Correo</label>
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={ (e) => {
                                                            setEmail(e.target.value)          
                                                }}/>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={ (e) => {
                                                            setPassword(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>Regístrate</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;