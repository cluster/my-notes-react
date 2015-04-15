var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var NoteStore = require('../stores/NoteStore');

/**
 * Retrieve the current Note data from the NoteStore
 */
function getNoteState() {
  return {
    allNotes: NoteStore.getAll()
  };
}

var NoteApp = React.createClass({

  getInitialState: function() {
    return getNoteState();
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header />
        <MainSection
          allNotes={this.state.allNotes}
        />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the NoteStore
   */
  _onChange: function() {
    this.setState(getNoteState());
  }

});

module.exports = NoteApp;
