import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookCommentCard from './BookCommentCard';
import { userActions } from '../actions/user.actions';

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAddNote = this.handleAddNote.bind(this);
  }

  handleAddNote(note, bookID) {
    const { dispatch, user } = this.props;
    console.log('here: ', note);
    console.log('id: ', bookID);
    const updatedBooks = user.books.map((book) => {
      if (Object.keys(book)[0] === bookID) {
        return { [bookID]: note };
      }
      return book;
    });
    console.log('updatedBooks: ', updatedBooks);
    const updatedUser = { ...user, books: updatedBooks };
    dispatch(userActions.addBook(updatedUser));
  }

  render() {
    const { books } = this.props;

    return (
      <div>
        {(books.map((book, i) => (
          <BookCommentCard
            onSubmit={this.handleAddNote}
            note={book.note}
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
}
BookList.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(BookList);
