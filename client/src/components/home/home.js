import { React, useEffect, useState } from 'react';
import './home.css'
import Todo from '../todo/todo';

function Home(props) {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newTask, setNewTask] = useState("")

    useEffect(() => {
        getTask()
    }, [])

    function addTask() {
        if(newTask === "") return alert("No se puede añadir una tarea vacía")
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

    if(isLoading) return (<div>Cargando tareas...</div> )

    return (
        <div className="container2">
            <h1>Tareas Por Hacer De {props.user.name}</h1>
            <div className="todoTasks">
                {
                    tasks.length === 0 ? <p>No hay tareas</p> :
                    tasks.map((task, index) => {
                        return (
                            <Todo url={props.url} task={task} key={index} getTask = {getTask}></Todo>
                        )
                    })
                }
            </div>
            <div className="addTodos">
                <input type="text" onChange={(event) => {
                    setNewTask(event.target.value)
                }} value={newTask} onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        addTask()
                    }
                }}></input>
                <button onClick={addTask}>Añadir tarea</button>
            </div>
        </div>
    )
}
export default Home;