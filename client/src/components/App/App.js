import React, { Fragment } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import socketIOClient from "socket.io-client"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { logout } from '../../actions/user';
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import PrivateRoute from '../PrivateRoute'
import NewsEditor from '../NewsEditor'
import ReadNews from '../ReadNews'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // const socket = socketIOClient('http://localhost:8000');
    // socket.on("notfication", data => toast(data, { autoClose: 7000 }));
  }

  openModal() {
    this.setState({ modalIsOpen: false });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleLogout() {
    this.props.logout()
  }

  userLogin() {
    const { loggedIn, displayName } = this.props;
    if (!loggedIn) {
      return(
        <Fragment>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Link to="/news/add">Add news</Link>
        <Link to="/drafts">Drafts</Link>
        <span>{displayName}</span> 
        <span onClick={this.handleLogout}>Logout</span>
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        <header>
          <h1><Link to="/">Rumor</Link></h1>
          <p>News for every one!</p>
          <div className="menu">
            <div className="right">
              {this.userLogin()}
            </div>
          </div>
          <div>

          </div>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/news/:id" component={ReadNews} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/news/add" component={NewsEditor} />
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
  displayName: `${state.authentication.user.firstName} ${state.authentication.user.lastName}`,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      logout,
    }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
