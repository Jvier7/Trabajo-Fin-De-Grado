import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css'

function Profile(props) {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [newName, setNewName] = useState('')
    const [actualPassword, setActualPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        if (props.user === null) {
            navigate('/login')
        } else {
            setIsLoading(false)
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let array = [ {
            val : newName,
            column : 'name',
            type : 'string'
        },
        {
            val : newPassword,
            column : 'password',
            type : 'string'
        }]

        if (newPassword === '' && actualPassword === '' && newName === '') {
            alert('Por favor, rellene todos los campos')
            return
        }
        array.forEach((element, index) => {
            if (element.val === '') {
                array.splice(index, 1)
            }
        })
        if(array.length === 0){
            navigate('/home')
        }

        setIsLoading(true)

        fetch(props.url + '/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ array, user: props.user, actualPassword })
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            }
        )
    }

    if (isLoading) return (<div>Cargando tareas...</div>)

    return (
        <div>
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
                                                if (e.key === 'Enter') {
                                                    handleSubmit(e)
                                                }
                                            }}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h2 fw-bold mb-0">Perfil</span>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example17">Nombre</label>
                                                    <input type="name" id="form2Example17" className="form-control form-control-lg" onChange={(e) => {
                                                        setNewName(e.target.value)
                                                    }} />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Contraseña Actual</label>
                                                    <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => {
                                                        setActualPassword(e.target.value)
                                                    }} />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Nueva Contraseña</label>
                                                    <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => {
                                                        setNewPassword(e.target.value)
                                                    }} />
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>Entrar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Profile;