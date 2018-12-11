import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class ReadNews extends React.Component {
  constructor(props) {
    super(props);
    this.renderCommentBox = this.renderCommentBox.bind(this);
    this.renderComments = this.renderComments.bind(this);
  }

  renderComments() {

  }

  renderCommentBox() {
    return(
      <div>
        <textarea></textarea>
      </div>
    )
  }
  render() {
    const { match, loggedIn } = this.props;
    return (
      <div>
        <h1>title</h1>
        <code>
          text
        </code>
        {match.params.id}
        {this.renderComments()}
        {loggedIn && this.renderCommentBox()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReadNews);
