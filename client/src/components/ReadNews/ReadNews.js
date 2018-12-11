import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Comment from '../Comment';
import { getNews, getComments, addComment } from '../../actions/news';


class ReadNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };

    this.renderCommentBox = this.renderCommentBox.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { token } = this.props;
    this.props.getNews(token, id);
    this.props.getComments(id);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderComments() {
    const { comments } = this.props;
    return (comments) ? 
      comments.map((content) => <Comment data={content} />)
      : <div>No comments yet.</div>;
  }

  handleComment(e) {
    e.preventDefault();

      const { comment } = this.state;
      const { token } = this.props;
      const { id } = this.props.match.params;
      if (comment) {
          this.props.addComment(token, comment, id);
      }
  }

  renderCommentBox() {
    return(
      <div>
        <textarea name="comment" onChange={this.handleChange}></textarea>
        <button onClick={this.handleComment}>Comment</button>
      </div>
    )
  }
  render() {
    const { loggedIn, title, content } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <code>
          {content}
        </code>
        <button>Upvote</button>
        {this.renderComments()}
        {loggedIn && this.renderCommentBox()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
  token: state.authentication.user.token || '',
  title: state.news.news.title || '',
  content: state.news.news.content || '',
  comments: state.news.comments,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      addComment,
      getNews,
      getComments,
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReadNews);
