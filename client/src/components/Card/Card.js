import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Card.css';

library.add(faHeart)

const Home = () => (
  <div className="row">
    <div className="card-news card">
    <div className="wrapper">
      <div className="header">
        <div className="date">
          12 Aug 2016
        </div>
        <ul className="menu-content">
          <li><a><FontAwesomeIcon icon={faHeart} /><span>18</span>
        </a></li>
        </ul>
      </div>
      <div className="data">
        <div className="content">
          <span className="author">Jane Doe</span>
          <h1 className="title"><a href="#">Stranger Things: The sound of the Upside Down</a></h1>
          <p className="text">The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
          <a href="#" className="button">Read more</a>
        </div>
      </div>
    </div>
  </div>

  </div>
)

export default Home
