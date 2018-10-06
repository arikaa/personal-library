import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { bookActions } from '../actions/books.actions';
import { userActions } from '../actions/user.actions';
import BookCard from './BookCard';
import MenuAppBar from './MenuAppBar';

const styles = {};

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerms: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerms: event.target.value });
  }

  handleSearch() {
    const { searchTerms } = this.state;
    const { dispatch } = this.props;
    if (searchTerms !== '') {
      dispatch(bookActions.searchGoogleBooks(searchTerms));
    }
  }

  handleAddBook(bookID) {
    const { dispatch, user } = this.props;
    if (bookID) {
      const updatedUser = { ...user, books: [...user.books, { [bookID]: 'Leave a book note here' }] };
      dispatch(userActions.addBook(updatedUser));
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    const { searching, items } = this.props;
    const { searchTerms } = this.state;
    return (
      <div>
        <MenuAppBar />
        <h1>Add a Book</h1>
        <TextField
          id="search"
          label="Search for a book"
          type="search"
          margin="normal"
          value={searchTerms}
          onChange={this.handleChange}
          autoFocus
          onKeyPress={this.handleKeyPress}
        />
        <IconButton mini variant="fab" color="primary" onClick={this.handleSearch}>
          <SearchIcon />
        </IconButton>

        {items && items.map((book, i) => (
          <BookCard
            key={i}
            id={book.id}
            onClick={this.handleAddBook}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            image={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail}
          />
        ))}

        {searching && <CircularProgress size={20} /> }
      </div>
    );
  }
}

AddBook.propTypes = {
  searching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { searching, items } = state.books;
  return {
    searching,
    items,
    user,
  };
}

const connectedAddBook = connect(
  mapStateToProps,
  null,
)(withStyles(styles)(AddBook));

export { connectedAddBook as AddBook };
