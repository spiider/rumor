import React, { Fragment } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import socketIOClient from "socket.io-client"
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Home from '../Home'
import Register from '../Register'
import Login from '../Login'
import UserAccount from '../UserAccount'
import PrivateRoute from '../PrivateRoute'
import NewsEditor from '../NewsEditor'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    return (
      <Fragment>
        <header>
          <h1><Link to="/">Rumor</Link></h1>
          <p>News for everyone!</p>
          <div className="menu">
          </div>
          <Link to="/news/add">Add news</Link>
          <div>

          </div>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/news/add" component={NewsEditor} />
          {/* <PrivateRoute exact path="/news/add" component={NewsAdd} /> */}
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              className="modal"
              overlayClassName="overlay"
              contentLabel="Example Modal"
            >

              <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form>
            </Modal>
            <UserAccount />
        </main>
        <ToastContainer />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  return {
      loggingIn
  };
}

export default withRouter(connect(mapStateToProps)(App));
