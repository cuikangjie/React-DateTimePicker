'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var classNames = require('classnames');
var fecha = require('./Utils/fecha');
var omit = require('./Utils/omit');
var ClassNameMixin = require('./Mixins/ClassNameMixin');
var Icon = require('./Lib/Icon');
var DatePicker = require('./DatePicker');
var TimePicker = require('./TimePicker');

var DateTimePicker = React.createClass({
  displayName: 'DateTimePicker',

  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    showTimePicker: React.PropTypes.bool,
    showDatePicker: React.PropTypes.bool,
    caretDisplayed: React.PropTypes.bool,
    amStyle: React.PropTypes.oneOf(['success', 'danger', 'warning']),
    viewMode: React.PropTypes.string,
    minViewMode: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func,
    daysOfWeekDisabled: React.PropTypes.array,
    format: React.PropTypes.string,
    dateTime: React.PropTypes.string,
    locale: React.PropTypes.string,
    weekStart: React.PropTypes.number,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'datepicker',
      dateTime: '',
      format: 'YYYY-MM-DD HH:mm',
      showTimePicker: true,
      showDatePicker: true,
      caretDisplayed: true
    };
  },

  getInitialState: function getInitialState() {
    var showToggle;
    var showTimePicker;

    if (this.props.showTimePicker && this.props.showDatePicker) {
      showToggle = true;
      showTimePicker = false;
    }

    if (!showToggle && !this.props.showDatePicker) {
      showTimePicker = true;
    }

    // `fecha.parse` return `false` when passed invalid parameter
    // fixes: https://github.com/amazeui/amazeui-react/issues/119
    var date = fecha.parse(this.props.dateTime, this.props.format);
    !date && (date = new Date());

    return {
      showTimePicker: showTimePicker,
      showDatePicker: this.props.showDatePicker,
      caretDisplayed: this.props.caretDisplayed,
      showToggle: showToggle,
      date: date,
      toggleDisplay: {
        toggleTime: {
          display: 'block'
        },
        toggleDate: {
          display: 'none'
        }
      }
    };
  },

  handleToggleTime: function handleToggleTime() {
    this.setState({
      showDatePicker: false,
      showTimePicker: true,
      toggleDisplay: {
        toggleTime: {
          display: 'none'
        },
        toggleDate: {
          display: 'block'
        }
      }
    });
  },

  handleToggleDate: function handleToggleDate() {
    this.setState({
      showDatePicker: true,
      showTimePicker: false,
      toggleDisplay: {
        toggleTime: {
          display: 'block'
        },
        toggleDate: {
          display: 'none'
        }
      }
    });
  },

  handleSelect: function handleSelect(date) {
    this.setState({
      date: date
    });
    this.props.onSelect(fecha.format(date, this.props.format));
  },

  renderToggleTime: function renderToggleTime() {
    if (this.state.showToggle) {
      return React.createElement(
        'div',
        {
          style: this.state.toggleDisplay.toggleTime,
          className: this.prefixClass('toggle'),
          onClick: this.handleToggleTime
        },
        React.createElement(Icon, { icon: 'clock-o' })
      );
    }
  },

  renderToggleDate: function renderToggleDate() {
    if (this.state.showToggle) {
      return React.createElement(
        'div',
        {
          style: this.state.toggleDisplay.toggleDate,
          className: this.prefixClass('toggle'),
          onClick: this.handleToggleDate
        },
        React.createElement(Icon, { icon: 'calendar' })
      );
    }
  },

  renderDatePicker: function renderDatePicker() {
    if (this.state.showDatePicker) {
      return React.createElement(DatePicker, {
        onSelect: this.handleSelect,
        onClose: this.props.onClose,
        weekStart: this.props.weekStart,
        viewMode: this.props.viewMode,
        minViewMode: this.props.minViewMode,
        daysOfWeekDisabled: this.props.daysOfWeekDisabled,
        format: this.props.format,
        date: this.state.date,
        locale: this.props.locale,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate
      });
    }
  },

  renderTimePicker: function renderTimePicker() {
    if (this.state.showTimePicker) {
      return React.createElement(TimePicker, {
        onSelect: this.handleSelect,
        date: this.state.date,
        format: this.props.format
      });
    }
  },

  renderCaret: function renderCaret() {
    if (this.state.caretDisplayed) {
      return React.createElement('div', { className: this.prefixClass('caret') });
    }
  },

  render: function render() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    this.props.amStyle && (classSet[this.prefixClass(this.props.amStyle)] = true);

    return React.createElement(
      'div',
      _extends({}, restProps, {
        className: classNames(classSet, this.props.className)
      }),
      this.renderCaret(),
      React.createElement(
        'div',
        { className: this.prefixClass('date') },
        this.renderDatePicker()
      ),
      React.createElement(
        'div',
        { className: this.prefixClass('time') },
        this.renderTimePicker()
      ),
      this.renderToggleTime(),
      this.renderToggleDate()
    );
  }
});

module.exports = DateTimePicker;
