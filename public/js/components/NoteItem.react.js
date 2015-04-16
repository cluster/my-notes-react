var React = require('react');
var ReactPropTypes = React.PropTypes;
var NoteActions = require('../actions/NoteActions');
var NoteTextInput = require('./NoteTextInput.react');

var cx = require('react/lib/cx');

var NoteItem = React.createClass({

  propTypes: {
   note: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var note = this.props.note;

    var input;
    if (this.state.isEditing) {
      input =
        <NoteTextInput
          className="edit"
          onSave={this._onSave}
          value={note}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': note.complete,
          'editing': this.state.isEditing
        })}
        key={note.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {note.title} : {note.description}
          </label>
          <button className="destroy" onClick={this._onDestroyClick}> Delete</button>
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    NoteActions.toggleComplete(this.props.note);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within NoteTextInput.
   * Defining this here allows NoteTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    NoteActions.updateText(this.props.note.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    NoteActions.destroy(this.props.note.id);
  }

});

module.exports = NoteItem;
