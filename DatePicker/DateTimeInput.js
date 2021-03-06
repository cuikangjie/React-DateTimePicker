'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Events = require('./Utils/Events');
var isNodeInTree = require('./Utils/isNodeInTree');
var DateTimePicker = require('./DateTimePicker.js');

import './style.css'
var DateTimeInput = React.createClass({
  displayName: 'DateTimeInput',

  propTypes: {
    format: React.PropTypes.string,
    dateTime: React.PropTypes.string,
    date: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    showTimePicker: React.PropTypes.bool,
    showDatePicker: React.PropTypes.bool,
    amStyle: React.PropTypes.oneOf(['success', 'danger', 'warning']),
    viewMode: React.PropTypes.string,
    minViewMode: React.PropTypes.string,
    daysOfWeekDisabled: React.PropTypes.array,
    locale: React.PropTypes.string,
    weekStart: React.PropTypes.number,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateTime: '',
      format: 'YYYY-MM-DD HH:mm'
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.dateTime,
      showPicker: false
    };
  },
  componentWillReceiveProps :function(props) {
      this.setState({
        value: props.dateTime
      });
  },

  handleOuterClick: function handleOuterClick(event) {
    var picker = ReactDOM.findDOMNode(this.refs.DateTimePicker);

    if (!isNodeInTree(event.target, picker)) {
      this.handleClose();
    }
  },

  bindOuterHandlers: function bindOuterHandlers() {
    Events.on(document, 'click', this.handleOuterClick);
  },

  unbindOuterHandlers: function unbindOuterHandlers() {
    Events.off(document, 'click', this.handleOuterClick);
  },

  handleClose: function handleClose() {
    this.unbindOuterHandlers();
    return this.setState({
      showPicker: false
    });
  },

  handleClick: function handleClick() {
    this.bindOuterHandlers();

    var positionNode = ReactDOM.findDOMNode(this.refs.dateInput);
    // fixes #57
    // @see http://stackoverflow.com/questions/1044988/getting-offsettop-of-element-in-a-table
    var rect = positionNode.getBoundingClientRect();
    var offset = {
      top: rect.top + positionNode.offsetHeight,
      left: rect.left
    };

    var styles = {
      display: 'block',
      top: offset.top,
      left: offset.left,
      position: 'fixed',
      zIndex: 1120
    };

    this.setState({
      showPicker: true,
      pickerStyle: styles
    });
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  handleSelect: function handleSelect(date) {
    this.setState({
      value: date
    });

    this.props.onSelect && this.props.onSelect.call(this, date);
  },

  renderPicker: function renderPicker() {
    if (this.state.showPicker) {
      return React.createElement(DateTimePicker, {
        style: this.state.pickerStyle,
        ref: 'DateTimePicker',
        showDatePicker: this.props.showDatePicker,
        showTimePicker: this.props.showTimePicker,
        onSelect: this.handleSelect,
        onClose: this.handleClose,
        amStyle: this.props.amStyle,
        dateTime: this.state.value,
        viewMode: this.props.viewMode,
        minViewMode: this.props.minViewMode,
        daysOfWeekDisabled: this.props.daysOfWeekDisabled,
        weekStart: this.props.weekStart,
        format: this.props.format,
        locale: this.props.locale,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate
      });
    }
  },

  render: function render() {
    // var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
    const {placeholder,classNames,readOnly} = this.props;

    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'text',
        value: this.state.value,
        onClick: this.handleClick,
        onChange: this.handleChange,
        onSelect: null,
        ref: 'dateInput',
        readOnly:readOnly,
        placeholder:placeholder,
        className:classNames,
        style: {width:'100%'}

      }),
      this.renderPicker()
    );
  }
});

module.exports = DateTimeInput;

// TODO: 动画
