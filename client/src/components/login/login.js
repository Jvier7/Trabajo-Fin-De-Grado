import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch (`${props.url}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.length > 0) {
                props.setIsLogged(true)
                props.setUser(data[0])
                navigate('/home')
            }
        }
        )
    }

    return (
        <section className="vh-100" style={{ background: 'linear-gradient(90deg, rgba(128,66,147,1) 45%, rgba(171,52,100,1) 79%, rgba(217,37,51,0.936186974789916) 97%)' }}>
            <div id="app" className="container py-5 h-100">
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
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h2 fw-bold mb-0">Login</span>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={ (e) => {
                                                    setEmail(e.target.value)
                                                } }/>
                                                <label className="form-label" htmlFor="form2Example17">Email</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={ (e) => {
                                                    setPassword(e.target.value)
                                                }}/>
                                                <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>Entrar</button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>¿Aún no tienes cuenta? <b onClick={() =>{
                                                navigate('/register')
                                            }}>Regístrate aquí</b></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;