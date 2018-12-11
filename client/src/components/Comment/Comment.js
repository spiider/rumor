import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Comment.css';

library.add(faHeart)

const Comment = (props) => (
  <div className="card-news card">
   {props.data.content}
   <button>upvote</button>
  </div>
)

export default Comment
