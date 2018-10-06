import React from 'react';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { history } from '../helpers/history';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { AddBook } from './AddBook';
import Container from './Container';
import ApplicationTheme from '../theme';

export default function App() {
  return (
    <MuiThemeProvider theme={ApplicationTheme}>
      <Router history={history}>
        <Container>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/addBook" component={AddBook} />
        </Container>
      </Router>
    </MuiThemeProvider>
  );
}
