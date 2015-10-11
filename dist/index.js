'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Button = (function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var iconBefore = _props.iconBefore;
      var faIcon = _props.faIcon;
      var materialIcon = _props.materialIcon;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['iconBefore', 'faIcon', 'materialIcon', 'className']);

      var icon = null;
      if (faIcon) {
        icon = _react2['default'].createElement('i', { className: 'fa fa-' + faIcon });
      } else if (materialIcon) {
        icon = _react2['default'].createElement(
          'i',
          { className: 'material-icons' },
          materialIcon
        );
      }

      return _react2['default'].createElement(
        'button',
        _extends({}, props, { className: (0, _classnames2['default'])(className, { 'icon-text-btn': icon }) }),
        iconBefore && icon,
        this.props.children,
        !iconBefore && icon
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      iconBefore: _react.PropTypes.bool,
      faIcon: _react.PropTypes.string,
      materialIcon: _react.PropTypes.string,
      type: _react.PropTypes.oneOf(['button', 'submit', 'reset'])
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      iconBefore: false,
      onClick: function onClick(e) {
        console.warn('Button with no clicky click', e.target);
      },
      type: 'button'
    },
    enumerable: true
  }]);

  return Button;
})(_react.Component);

exports.Button = Button;

var TAB = 9;
var SPACEBAR = 32;
var ENTER = 13;

var IconButton = (function (_Component2) {
  _inherits(IconButton, _Component2);

  function IconButton(props) {
    var _this = this;

    _classCallCheck(this, IconButton);

    _get(Object.getPrototypeOf(IconButton.prototype), 'constructor', this).call(this, props);

    this.helpTextTimer = null;

    this.handleClick = function (e) {
      _this.props.onClick(e);
      _this.setHelpTextVisible(false);
    };

    this.handleKeyUp = function (e) {
      var key = e.which || e.keyCode;
      if (key === TAB) {
        _this.setHelpTextVisible(true);
        _this.setState({ isTabFocused: true });
      } else if (key === SPACEBAR || key === ENTER) {
        _this.setHelpTextVisible(false);
      }
    };

    this.removeTabFocus = function (e) {
      _this.setHelpTextVisible(false);
      _this.setState({ isTabFocused: false });
    };

    this.handleMouseOver = function (e) {
      _this.setHelpTextVisible(true);
    };

    this.handleMouseLeave = function (e) {
      _this.setHelpTextVisible(false);
    };

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
    this.state = {
      isTabFocused: false,
      isHelpTextVisible: false
    };
  }

  _createClass(IconButton, [{
    key: 'setHelpTextVisible',
    value: function setHelpTextVisible(visible) {
      var _this2 = this;

      if (visible) {
        if (this.helpTextTimer) {
          return;
        }

        this.helpTextTimer = setTimeout(function () {
          _this2.setState({ isHelpTextVisible: true });
        }, this.props.helpTextTime);
      } else {
        if (this.helpTextTimer) {
          clearTimeout(this.helpTextTimer);
          this.helpTextTimer = null;
        }

        this.setState({ isHelpTextVisible: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isTabFocused = _state.isTabFocused;
      var isHelpTextVisible = _state.isHelpTextVisible;

      var buttonProps = {
        className: (0, _classnames2['default'])('icon-btn', this.props.className, {
          'tab-focus': isTabFocused
        }),
        onClick: this.handleClick,
        'aria-label': this.props.label,
        onKeyUp: this.handleKeyUp,
        onBlur: this.removeTabFocus,
        onMouseOver: this.handleMouseOver,
        onMouseLeave: this.handleMouseLeave
      };

      var icon = this.props.children;
      if (this.props.faIcon) {
        icon = _react2['default'].createElement('i', { className: 'fa fa-' + this.props.faIcon });
      } else if (this.props.materialIcon) {
        icon = _react2['default'].createElement(
          'i',
          { className: 'material-icons' },
          this.props.materialIcon
        );
      }
      return _react2['default'].createElement(
        'button',
        buttonProps,
        icon,
        isHelpTextVisible && _react2['default'].createElement(
          'div',
          { key: 'help-text', className: 'help-text-' + this.props.helpPosition },
          this.props.label
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string.isRequired,
      helpPosition: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      faIcon: _react.PropTypes.string,
      materialIcon: _react.PropTypes.string,
      type: _react.PropTypes.oneOf(['button', 'reset', 'submit']),
      helpTextTime: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      helpPosition: 'bottom',
      type: 'button',
      helpTextTime: 1000,
      onClick: function onClick(e) {
        console.warn('IconButton with no clicky click', e.target);
      }
    },
    enumerable: true
  }]);

  return IconButton;
})(_react.Component);

exports.IconButton = IconButton;

var HamburgerButton = (function (_Component3) {
  _inherits(HamburgerButton, _Component3);

  function HamburgerButton(props) {
    _classCallCheck(this, HamburgerButton);

    _get(Object.getPrototypeOf(HamburgerButton.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
  }

  _createClass(HamburgerButton, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames2['default'])('hamburger-btn', this.props.className, {
        'active': this.props.active,
        'hamburger-btn-lg': this.props.isLarge
      });

      return _react2['default'].createElement(
        IconButton,
        _extends({}, this.props, { className: className }),
        _react2['default'].createElement(
          'div',
          { className: 'bars-wrapper' },
          _react2['default'].createElement('div', { className: 'left-bars' }),
          _react2['default'].createElement('div', { className: 'right-bars' })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      active: _react.PropTypes.bool,
      isLarge: _react.PropTypes.bool,
      label: _react.PropTypes.string.isRequired,
      helpPosition: _react.PropTypes.oneOf(['top', 'left', 'bottom', 'right'])
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      active: false,
      isLarge: false,
      helpPosition: 'bottom',
      onClick: function onClick(e) {
        console.warn('HamburgerButton with no clicky click', e.target);
      }
    },
    enumerable: true
  }]);

  return HamburgerButton;
})(_react.Component);

exports.HamburgerButton = HamburgerButton;

var FlatButton = (function (_Component4) {
  _inherits(FlatButton, _Component4);

  function FlatButton(props) {
    _classCallCheck(this, FlatButton);

    _get(Object.getPrototypeOf(FlatButton.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
  }

  _createClass(FlatButton, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var className = _props2.className;
      var color = _props2.color;
      var active = _props2.active;

      var props = _objectWithoutProperties(_props2, ['className', 'color', 'active']);

      var fullClassName = (0, _classnames2['default'])(className, 'flat-btn', 'flat-btn-' + color, {
        'active': active
      });

      return _react2['default'].createElement(Button, _extends({}, props, { className: fullClassName }));
    }
  }], [{
    key: 'propTypes',
    value: {
      color: _react.PropTypes.string,
      active: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      color: 'default',
      active: false
    },
    enumerable: true
  }]);

  return FlatButton;
})(_react.Component);

exports.FlatButton = FlatButton;

var FloatingButton = (function (_Component5) {
  _inherits(FloatingButton, _Component5);

  function FloatingButton(props) {
    _classCallCheck(this, FloatingButton);

    _get(Object.getPrototypeOf(FloatingButton.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactAddonsPureRenderMixin2['default'].shouldComponentUpdate.bind(this);
  }

  _createClass(FloatingButton, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames2['default'])(this.props.className, 'floating-btn', 'floating-btn-' + this.props.color);

      return _react2['default'].createElement(IconButton, _extends({}, this.props, { className: className }));
    }
  }], [{
    key: 'propTypes',
    value: {
      color: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      color: 'default',
      helpPosition: 'left'
    },
    enumerable: true
  }]);

  return FloatingButton;
})(_react.Component);

exports.FloatingButton = FloatingButton;