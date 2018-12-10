import React, { Fragment } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserAccount.css';

library.add(faUser)

class UserAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: true,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
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
        <div id="container-floating">
          <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create" >
            <p className="plus"><FontAwesomeIcon icon={faUser} /></p>
            <img className="edit" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png" />
          </div>

          </div>
      </Fragment>
    )
  }
}

export default UserAccount
