import React from 'react'
import './Comment.css';

const Comment = (props) => (
  <div className="card-news card">
   {props.data.content}

   <button>upvote</button>
  </div>
)

export default Comment
