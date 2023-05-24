import { React, useEffect, useState } from 'react';
import './todo.css'

function Todo(props) {

    function deleteTask() {
        fetch(props.url + "/api/deleteTask/" + props.task.id)
            .then(response => response.json())
            .then(data => {
                props.getTask()
            })
    }

    function makeImportant() {
        fetch(props.url + "/api/makeImportant/" + props.task.id)
            .then(response => response.json()) 
            .then(data => {
                props.getTask()
            })
    }

    function isCompleted() {
        fetch(props.url + "/api/isCompleted/" + props.task.id)
            .then(response => response.json())
            .then(data => {
                props.getTask()
            })
    }

    function setNotCompleted() {
        fetch(props.url + "/api/setNotCompleted/" + props.task.id)
            .then(response => response.json())
            .then(data => {
                props.getTask()
            })
    }

    function makeUnimportant() {
        fetch(props.url + "/api/makeUnimportant/" + props.task.id)
            .then(response => response.json())
            .then(data => {
                props.getTask()
            })
    }
    
    return (
        <div className='todo'>
            {
                props.task.isCompleted ? <img className="circleCompleted" src = "/assets/circleCompleted.png" onClick={setNotCompleted}></img> : <img className="circleNotCompleted" src = "/assets/circle.png" onClick={isCompleted}></img>
            }
            <p>{
                props.task.isCompleted ? <s className='isCompleted'>{props.task.text}</s> : props.task.text
            }</p>
            <div className="containerStarDelete">
                {
                    props.task.priority ? <img src = "/assets/importantCompleted.png" onClick={makeUnimportant}></img> : <img src = "/assets/important.png" onClick={makeImportant}></img>
                }
                <img src = "/assets/delete.png" onClick={deleteTask}></img>
            </div>
        </div>
    )
}

export default Todo;