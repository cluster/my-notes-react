var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var NoteTextInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    title: ReactPropTypes.string,
    description: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      title: this.props.title || '',
      description: this.props.description || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div>
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder='title'
        onChange={this._onChangeTitle}
        onKeyDown={this._onKeyDown}
        value={this.state.title}
        autoFocus={true}
      />
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder='description'
        onChange={this._onChangeDesc}
        onKeyDown={this._onKeyDown}
        value={this.state.description}
        autoFocus={true}
      />
      </div>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onSave({title:this.state.title, description: this.state.description});
    this.setState(
      {title:'', description: ''}
    );
  },

  /**
   * @param {object} event
   */
  _onChangeTitle: function(event) {
    this.setState({title:event.target.value});
  },
  _onChangeDesc: function(event) {
    this.setState({description:event.target.value});
  },
  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = NoteTextInput;
