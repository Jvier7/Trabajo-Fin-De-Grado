import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css'

function Profile(props) {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newTask, setNewTask] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()


    function getTask() {
        fetch(props.url + "/api/tasks/" + props.user.id)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => {
                    if (a.priority && !b.priority) return -1
                    if (!a.priority && b.priority) return 1
                    return 0
                })
                setTasks(data)
                setIsLoading(false)
            })
    }

    if (isLoading) return (<div>Cargando tareas...</div>)

    return (
        <div>
            <h1>Perfil</h1>
        </div>
    )
        }


export default Profile;