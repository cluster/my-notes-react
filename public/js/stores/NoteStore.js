var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NoteConstants = require('../constants/NoteConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _notes = {};

/**
 * Create a NOTE item.
 * @param  {obj} text The content of the NOTE
 */
function create(note) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _notes[id] = {
    id: id,
    complete: false,
    title: note.title,
    description: note.description
  };
  fetch('/api/notes', {method:"post", headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },body:JSON.stringify(note)})
  .then(
    function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

}

/**
 * Update a NOTE item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _notes[id] = assign({}, _notes[id], updates);
}

/**
 * Update all of the NOTE items with the same object.
 *     the data to be updated.  Used to mark all NOTEs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _notes) {
    update(id, updates);
  }
}

/**
 * Delete a NOTE item.
 * @param  {string} id
 */
function destroy(id) {
  delete _notes[id];
}

/**
 * Delete all the completed NOTE items.
 */
function destroyCompleted() {
  for (var id in _notes) {
    if (_notes[id].complete) {
      destroy(id);
    }
  }
}

var NoteStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining NOTE items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _notes) {
      if (!_notes[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of NOTEs.
   * @return {object}
   */
  getAll: function() {
    return _notes;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case NoteConstants.NOTE_CREATE:
      note = action.note;
      if (note.title !== '' && note.description !== '') {
        create(note);
        NoteStore.emitChange();
      }
      break;

    case NoteConstants.NOTE_TOGGLE_COMPLETE_ALL:
      if (NoteStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      NoteStore.emitChange();
      break;

    case NoteConstants.NOTE_UNDO_COMPLETE:
      update(action.id, {complete: false});
      NoteStore.emitChange();
      break;

    case NoteConstants.NOTE_COMPLETE:
      update(action.id, {complete: true});
      NoteStore.emitChange();
      break;

    case NoteConstants.NOTE_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        NoteStore.emitChange();
      }
      break;

    case NoteConstants.NOTE_DESTROY:
      destroy(action.id);
      NoteStore.emitChange();
      break;

    case NoteConstants.NOTE_DESTROY_COMPLETED:
      destroyCompleted();
      NoteStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = NoteStore;
