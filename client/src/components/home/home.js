import { React, useEffect, useState } from 'react';
import './home.css'
import Todo from '../todo/todo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Home(props) {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newTask, setNewTask] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getTask()
        setInterval(() => {
            getTask()
        }, 10000)
    }, [])

    function addTask() {
        if (newTask === "") {
            setError(true)
            setMsg("No puede estar vacio")
            setNewTask("")
            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }

        if (newTask.length > 50) {
            setError(true)
            setMsg("No puede tener mas de 50 caracteres")
            setNewTask("")
            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }

        fetch(props.url + "/api/addTasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTask,
                userId: props.user.id
            })
        })
            .then(response => response.json())
            .then(data => {
                getTask()
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
                setNewTask("")
            })
    }

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
        <div className="container2">
            <div className="todoTasks">
                {
                    tasks.length === 0 ? <p>No hay tareas</p> :
                        tasks.map((task, index) => {
                            return (
                                <Todo url={props.url} task={task} key={index} getTask={getTask}></Todo>
                            )
                        })
                }
            </div>
            <div className="addTodos">
                {/* <input type="text" onChange={(event) => {
                    setNewTask(event.target.value)
                }} value={newTask} onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        addTask()
                    }
                }}></input> */}
                <TextField className="textfield-home" id="filled-basic" label="Nueva Tarea" variant="filled" onChange={(event) => {
                    setNewTask(event.target.value)
                }} value={newTask} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask()
                    }
                }} />
                {/* <button onClick={addTask}>Añadir tarea</button> */}
                <Button variant="contained" onClick={addTask}>+</Button>
            </div>
            {
                error ? <Stack sx={{ width: '20%', position: 'fixed', top: 20 }} spacing={2}>
                    <Alert severity="error">{msg}</Alert>
                </Stack> : null
            }
        
            {
                success ? <Stack sx={{ width: '20%', position: 'fixed', left: 500, top: 20 }} spacing={2}>
                    <Alert severity="success">Tarea añadida correctamente</Alert>
                </Stack> : null
            }
        </div>
    )
}
export default Home;