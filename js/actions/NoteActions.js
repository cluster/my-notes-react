var AppDispatcher = require('../dispatcher/AppDispatcher');
var NoteConstants = require('../constants/NoteConstants');

var NoteActions = {

  /**
   * @param  {object} note: title & description
   */
  create: function(note) {
    console.log("note actions")
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_CREATE,
      note: note
    });
  },

  /**
   * @param  {string} id The ID of the note item
   * @param  {string} note
   */
  updateNote: function(id, note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_UPDATE_TEXT,
      id: id,
      note: note
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_DESTROY,
      id: id
    });
  },

};

module.exports = NoteActions;
