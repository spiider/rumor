import React, { Fragment } from 'react';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/user';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import NewsEditor from '../NewsEditor';
import ReadNews from '../ReadNews';
import Drafts from '../Drafts';
import { URL } from '../../constants';
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
    this.notifyMe = this.notifyMe.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props;
    const socket = socketIOClient(URL);
    socket.on('notification', data => {
      if (!data.user || data.user === userId) {
        //this.notifyMe(data);
      }
      // socket.emit("server", "i got it");
  });

  }

  notifyMe(content) {
    if (!('Notification' in window)) {
      alert(content);
    } else if (Notification.permission === 'granted') {
      const options = {
        body: content.message,
        dir : "ltr",
        requireInteraction: true
      };
      new Notification(content.title ,options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }
        if (permission === "granted") {
          const options = {
            body: content.message,
            dir : "ltr",
            requireInteraction: true
          };
          new Notification(content.title, options);
        }
      });
    }
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
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/news/add" component={NewsEditor} />
            <Route path="/news/:id" component={ReadNews} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/drafts" component={Drafts} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
  userId: state.authentication.user.id,
  displayName: `${state.authentication.user.firstName} ${state.authentication.user.lastName}`,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      logout,
    }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
