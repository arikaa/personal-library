import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { userActions } from '../actions/user.actions';
import { bookActions } from '../actions/books.actions';
import MenuAppBar from './MenuAppBar';
import BookCard from './BookCard';

const styles = {
  addBook: {
    display: 'flex',
    alignItems: 'center',
  },
  addLabel: {
    paddingLeft: 5,
  },
};

function Library(props) {
  const { books } = props;
  return (
    <div>
      {(books.map((book, i) => (
        <BookCard
          key={i}
          id={book.id}
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors}
          image={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail}
        />
      )))
      }
    </div>
  );
}

Library.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedBooks: [],
    };

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
    const { books } = this.state;
    const { user, dispatch } = this.props;
    if (user.books && user.books.length > 0) {
      user.books.forEach((book) => {
        // call Google API request to get books and add to state collection
        dispatch(bookActions.getGoogleBook(book));
      });
    }
  }

  render() {
    const { classes, user, loadedBooks } = this.props;
    console.log('loaded: ', loadedBooks);
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
        {loadedBooks && <Library books={loadedBooks} />}
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
