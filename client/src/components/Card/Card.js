import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Card.css';

library.add(faHeart)

const Home = (props) => (
  <div className="row">
    <div className="card-news card">
    <div className="wrapper">
      <div className="header">
        <div className="date">
          {moment(props.data.created_at).format("DD MMM YYYY")}
        </div>
        <ul className="menu-content">
          <li><a><FontAwesomeIcon icon={faHeart} /><span>{props.data.votes}</span>
        </a></li>
        </ul>
      </div>
      <div className="data">
        <div className="content">
          <span className="author">{props.data.User.displayName}</span>
          <h1 className="title"><a href="#">{props.data.title}</a></h1>
          <p className="text">{props.data.content.substring(0, 50)}</p>
          <Link to={`/news/${props.data.id}`} className="button">Read more</Link>
        </div>
      </div>
    </div>
  </div>

  </div>
)

export default Home
