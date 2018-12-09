import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import './App.css';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </main>
  </div>
)

export default App
