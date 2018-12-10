import React from 'react'
import ReactMde from 'react-mde';
import { Markdown } from 'react-showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './NewsEditor.css'

class NewsEditor extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**"
    };
  }

  handleValueChange = (value) => {
    this.setState({ value });
  };

  generatePreview = (markdown) => <Markdown markup={ markdown } />

  render () {
    return (
      <div className="editor">
        <input type="text" />
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={this.generatePreview}
        />
      </div>
    );
  }
}

export default NewsEditor;
