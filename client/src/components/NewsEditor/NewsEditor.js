import React from 'react'
import ReactMde from 'react-mde';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { editNews } from '../../actions/news';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './NewsEditor.css'

class NewsEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        title: '',
        id: undefined,
        content: '**** Start writing your news ****',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleDraft = this.handleDraft.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handlePublish(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { title, content, id } = this.state;
      const { token } = this.props;
      if (title && content) {
          this.props.editNews(token, title, content, id, 1);
      }
  }

  handleDraft(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { title, content, id } = this.state;
    const { token } = this.props;
    if (title && content) {
        this.props.editNews(token, title, content, id, 2);
    }
  }

  handleValueChange = (value) => {
    this.setState({ content: value });
  };

  render () {
    const { title, content } = this.state;
    return (
      <div className="editor">
          <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="News title" />
          <ReactMde
            name="content"
            onChange={this.handleValueChange}
            value={content}
            generateMarkdownPreview={() =>
              Promise.resolve(false)
            }
          />
          <button type="submit" className="btn" onClick={this.handlePublish} >Publish</button>
          <button type="submit" className="btn" onClick={this.handleDraft}>Save draft</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state.authentication.user;
  return {
      token,
  };
}
const mapDispatchToProps = dispatch =>
bindActionCreators({
    editNews,
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsEditor));

