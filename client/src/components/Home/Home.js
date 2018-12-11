import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { listNews } from '../../actions/news';
import Card from '../Card'
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.renderNews = this.renderNews.bind(this);
  }

  componentDidMount() {
    this.props.listNews(this.props.token);
  }

  renderNews() {
    const { loading, list } = this.props;
    if (loading) {
      if (loading && list.length === 0) {
        return(
          <div>Ops... No content</div>
        )
      } else {
        return(
          <div className="laoading">Loading...</div>
        )
      }
    } else {
      return this.props.list.map((result) => <Card data={result} />)
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderNews()}
      </div>
    )}

  }

const mapStateToProps = (state) => ({
  token: state.authentication.user.token,
  loading: state.news.loading,
  list: state.news.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    listNews,
    }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
