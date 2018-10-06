import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { userActions } from '../actions/user.actions';
import { bookActions } from '../actions/books.actions';
import MenuAppBar from './MenuAppBar';
import BookList from './BookList';

const styles = {
  addBook: {
    display: 'flex',
    alignItems: 'center',
  },
  addLabel: {
    paddingLeft: 5,
  },
};

function mapNotesToGoogleBooks(notes, books) {
  let updatedBooks;
  if (books) {
    updatedBooks = [...books];
    updatedBooks.map((book) => {
      const localBook = notes.filter(note => Object.keys(note)[0] === book.id);
      book.note = localBook[0][book.id]; // eslint-disable-line no-param-reassign
    });
  }
  return updatedBooks;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleLoadLibrary = this.handleLoadLibrary.bind(this);
  }

  componentWillMount() {
    this.handleLoadLibrary();
    localStorage.setItem('books.loadedBooks', JSON.stringify([]));
  }


  handleDeleteUser(id) {
    const { dispatch } = this.props;
    return () => dispatch(userActions.delete(id));
  }

  handleLoadLibrary() {
    const { user, dispatch } = this.props;
    if (user.books && user.books.length > 0) {
      user.books.forEach((book) => {
        // call Google api request to get books and add to state collection
        dispatch(bookActions.getGoogleBook(Object.keys(book)[0]));
      });
    }
  }

  render() {
    const { classes, user, loadedBooks } = this.props;
    let booksWithNotes = null;

    if (!user){
      return '';
    }
    if (loadedBooks) {
      booksWithNotes = mapNotesToGoogleBooks(user.books, loadedBooks);
    }

    return (
      <div>
        <MenuAppBar />
        <h1>{`Welcome to your virtual library, ${user.firstName}!`}</h1>
        <div className={classes.addBook}>
          <Button
            mini
            href="/addBook"
            variant="fab"
            color="primary"
          >
            <AddIcon />
          </Button>
          <h1 className={classes.addLabel}>Add a Book</h1>
        </div>
        {loadedBooks && <BookList books={booksWithNotes} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, books } = state;
  const { user } = authentication;
  const { loadedBooks } = books;
  return {
    user,
    loadedBooks,
  };
}

const connectedHomePage = connect(mapStateToProps)(withStyles(styles)(HomePage));
export { connectedHomePage as HomePage };
