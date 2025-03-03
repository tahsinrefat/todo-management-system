import axios from 'axios';
import { getToken } from './AuthService';

const BASE_RESt_API_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = getToken();
    return config;
}, (error) => {
    return Promise.reject(error);
})

export const getAllTodos = () => axios.get(BASE_RESt_API_URL);

export const saveTodo = (todo) => axios.post(BASE_RESt_API_URL, todo);

export const getTodo = (todoId) => axios.get(`${BASE_RESt_API_URL}/${todoId}`);

export const updateTodo = (todoId, todo) => axios.put(`${BASE_RESt_API_URL}/${todoId}`, todo);

export const deleteTodo = (todoId) => axios.delete(`${BASE_RESt_API_URL}/${todoId}`);

export const completeTodo = (todoId) => axios.patch(`${BASE_RESt_API_URL}/${todoId}/complete`);

export const inCompleteTodo = (todoId) => axios.patch(`${BASE_RESt_API_URL}/${todoId}/in-complete`);

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null) {
        return false;
    } else {
        return true;
    }
}

export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");