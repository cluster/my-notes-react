var React = require('react');
var NoteActions = require('../actions/NoteActions');
var NoteTextInput = require('./NoteTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Notes</h1>
        <NoteTextInput
          id="new-note"
          onSave={this._onSave}
          title='toto4'
        />
      </header>
    );
  },

  /**
   * Event handler called within NoteTextInput.
   * Defining this here allows NoteTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(note) {
    if (note.title && note.description){
      NoteActions.create(note);
    }

  }

});

module.exports = Header;
