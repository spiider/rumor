import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { register } from '../../actions/user';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
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
        const { email, password, firstName, lastName } = this.state;
        if (email && password && firstName && lastName) {
            this.props.register(email, password, firstName, lastName);
        }
    }

    render() {
        const { email, password, firstName, lastName, submitted } = this.state;
        const { message } = this.props;
        return (
            <div className="wrapper-register">
                <div className="container-register">
                    <h1>Register</h1>
                    <form name="form" onSubmit={this.handleSubmit} className="form">
                        {message &&
                            <div className="help-block">{message}</div>
                        }
                        <input type="text" name="firstName" value={firstName} onChange={this.handleChange} placeholder="First Name" />
                        {submitted && !firstName &&
                            <div className="help-block">First name is required</div>
                        }
                        <input type="text" name="lastName" value={lastName} onChange={this.handleChange} placeholder="LastName" />
                        {submitted && !lastName &&
                            <div className="help-block">Last name is required</div>
                        }
                        <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                        <button type="submit" id="login-button">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { message } = state.user || undefined;
    return {
        message,
    };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    register,
    }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
