'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var classNames = require('classnames');
var omit = require('../Utils/omit');
var ClassNameMixin = require('../Mixins/ClassNameMixin');
var PropTypes = React.PropTypes;

var Icon = React.createClass({
  displayName: 'Icon',

  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    component: PropTypes.node.isRequired,
    amStyle: PropTypes.string,
    amSize: PropTypes.string,
    fw: PropTypes.bool,
    spin: PropTypes.bool,
    button: PropTypes.bool,
    size: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

  render: function render() {
    var classes = this.getClassSet(true);
    var props = this.props;
    var Component = props.href ? 'a' : props.component;
    var prefixClass = this.prefixClass;
    var setClassNamespace = this.setClassNamespace;
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    // am-icon-[iconName]
    classes[prefixClass(props.icon)] = true;

    // am-icon-btn
    classes[prefixClass('btn')] = props.button;

    // button style
    props.button && props.amStyle && (classes[setClassNamespace(props.amStyle)] = true);

    // am-icon-fw
    classes[prefixClass('fw')] = props.fw;

    // am-icon-spin
    classes[prefixClass('spin')] = props.spin;

    return React.createElement(
      Component,
      _extends({}, restProps, {
        href: this.props.href,
        className: classNames(classes, this.props.className)
      }),
      this.props.children
    );
  }
});

module.exports = Icon;
