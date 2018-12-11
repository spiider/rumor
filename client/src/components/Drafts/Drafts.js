import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { getDrafts } from '../../actions/news';

class Drafts extends React.Component {
  constructor(props) {
    super(props);

    this.renderDraftsList = this.renderDraftsList.bind(this);
  }

  renderDraftsList() {
    return this.props.drafts.map((draft) => {
      return (
      <li>
        <Link to={`/news/${draft.id}/edit`}>{draft.title}</Link>
      </li>);
    });
  }

  componentDidMount() {
    const { token } = this.props;
    this.props.getDrafts(token);
  }

  render() {
    return (
      <ul>
        {this.renderDraftsList()}
      </ul>
    )
  }
};

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
  token: state.authentication.user.token || '',
  drafts: state.news.drafts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      getDrafts,
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);

