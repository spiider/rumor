import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import './App.css';


const App = () => (
  <div>
    <header>
      <h1><Link to="/">Rumor</Link></h1>
      <p>News for everyone!</p>
      <div className="menu">
      </div>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </main>
  </div>
)

export default App
