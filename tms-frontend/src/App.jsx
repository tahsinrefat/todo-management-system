import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTodoComponent from './components/ListTodoComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/TodoService'

function App() {

  const AuthenticatedRoute = ({children}) => {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    } else {
      return <Navigate to='/' />
    }
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/todos' element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          } />
          <Route path='/add-todo' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>
          <Route path='/update-todo/:id' element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }></Route>
          <Route path='/register' element={<RegisterComponent />}></Route>
          <Route path='/login' element={<LoginComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
