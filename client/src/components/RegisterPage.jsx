import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from './MenuAppBar';
import { userActions } from '../actions/user.actions';

const styles = {
  content: {
    padding: '100px',
  },
  form: {
    display: 'grid',
  },
};

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering, classes } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <MenuAppBar />
        <h2>Register</h2>
        <div className={classes.content}>
          <form className={classes.form} name="form" onSubmit={this.handleSubmit}>
            <TextField
              label="First Name"
              margin="normal"
              onChange={this.handleChange}
              value={user.firstName}
              name="firstName"
            />
            {submitted && !user.firstName
              && <div>First Name is required</div>
            }
            <TextField
              label="Last Name"
              margin="normal"
              onChange={this.handleChange}
              value={user.lastName}
              name="lastName"
            />
            {submitted && !user.lastName
              && <div>Last Name is required</div>
            }
            <TextField
              label="Email"
              margin="normal"
              onChange={this.handleChange}
              value={user.username}
              name="username"
            />
            {submitted && !user.username
              && <div>Email is required</div>
            }
            <TextField
              label="Password"
              margin="normal"
              onChange={this.handleChange}
              value={user.password}
              name="password"
            />
            {submitted && !user.password
              && <div>Password is required</div>
            }
            <Button
              type="submit" 
              variant="contained"
              color="primary"
            >Register</Button>
            {registering && <CircularProgress size={20} /> }
            <Button href="/login">Cancel</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(withStyles(styles)(RegisterPage));
export { connectedRegisterPage as RegisterPage };
