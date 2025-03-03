import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {

    const [todos, setTodos] =  useState([])

    const navigate = useNavigate()

    useEffect(() => {
        listTodos()
    }, [])
    

    const listTodos = () => {
        getAllTodos().then((response) => {
            setTodos(response.data)
        }).catch((error) => {
            console.error('Error fetching data', error)
        })
    }

    const addNewTodo = () =>{
        navigate('/add-todo')
    }

    const updateTodo = (id) => {
        console.log(id);
        navigate(`/update-todo/${id}`);
    }

    const removeTodo = (id) => {
        console.log(id);
        deleteTodo(id).then(response => {
            listTodos()
        }).catch(error => {
            console.error('Error deleting todo', error)
        })
    }

    const markCompleteTodo = (id) => {
        completeTodo(id).then(response => {
            listTodos()
        }
        ).catch(error => {
            console.error('Error completing todo', error)
        })
    }

    const markInCompleteTodo = (id) => {
        inCompleteTodo(id).then(response => {
            listTodos()
        }
        ).catch(error => {
            console.error('Error in-completing todo', error)
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
            Add Todo
        </button>
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? "Yes": "No"}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateTodo(todo.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginLeft: "10px"}}>Delete</button>
                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{marginLeft: "10px"}}>Complete</button>
                                    <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={{marginLeft: "10px"}}>In-complete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListTodoComponent