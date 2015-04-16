var React = require('react');
var ReactPropTypes = React.PropTypes;
var NoteActions = require('../actions/NoteActions');
var NoteItem = require('./NoteItem.react');

var MainSection = React.createClass({

  propTypes: {
    allNotes: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are Notes.
    if (Object.keys(this.props.allNotes).length < 1) {
      return null;
    }

    var allNotes = this.props.allNotes;
    var notes = [];

    for (var key in allNotes) {
      notes.push(<NoteItem key={key} note={allNotes[key]} />);
    }

    return (
      <section id="main">
        <ul id="note-list">{notes}</ul>
      </section>
    );
  }
});

module.exports = MainSection;
