import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { login } from '../../actions/user';
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { email, password, submitted } = this.state;
        const { message } = this.props;
        return (
            <div className="wrapper">
                <div className="container">
                    <h1>Login</h1>
                    <form name="form" onSubmit={this.handleSubmit} className="form">
                        {message &&
                            <div className="help-block">{message}</div>
                        }
                        <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                        <button type="submit" id="login-button">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { message } = state.authentication || undefined;
    return {
        message,
    };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
      login,
    }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
