import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'space-between',
    height: 200,
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
    backgroundSize: 'contain',
  },
  comment: {
    paddingTop: 10,
  },
};

class BookCommentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: "",
    };

    this.handleUpdateNote = this.handleUpdateNote.bind(this);
  }

  // updates the note when the user types
  handleUpdateNote(event) {
    this.setState({
      note: event.target.value,
    });
  }


  render() {
    const {
      classes,
      id,
      onClick,
      image,
      title,
      authors,
      onSubmit,
      note,
    } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">{title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {authors}
            </Typography>
            <div className={classes.comment}>
              <TextField
                label="Notes"
                multiline
                rows="4"
                defaultValue={note}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleUpdateNote}
                onBlur={() => onSubmit(this.state.note, id)}
              />
            </div>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={image}
          title="Title of Image"
        />
      </Card>
    );
  }
}

BookCommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookCommentCard);
