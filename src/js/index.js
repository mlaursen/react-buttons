import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.rippleEffect = null;
    this.ripple = null;
  }

  static propTypes = {
    iconBefore: PropTypes.bool,
    faIcon: PropTypes.string,
    materialIcon: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    ripple: PropTypes.bool,
    rippleTime: PropTypes.number,
  }

  static defaultProps = {
    iconBefore: false,
    type: 'button',
    onClick: () => {},
    ripple: false,
    rippleTime: 300,
  }

  onClick = (e) => {
    this.props.onClick(e);
    if(!this.props.ripple) {
      return;
    }

    const button = ReactDOM.findDOMNode(this)

    if(this.rippleEffect) {
      this.ripple.classList.remove('active');
    }

    const x = e.pageX - button.offsetLeft - this.ripple.offsetWidth / 2;
    const y = e.pageY - button.offsetTop - this.ripple.offsetHeight / 2;

    this.ripple.style.top = y + 'px';
    this.ripple.style.left = x + 'px';
    this.ripple.classList.add('active');
    this.rippleEffect = setTimeout(() => {
      this.ripple.classList.remove('active');
      this.rippleEffect = null;
    }, this.props.rippleTime);
  }

  componentDidMount() {
    if(this.props.ripple) {
      const button = ReactDOM.findDOMNode(this);
      const size = Math.max(button.offsetHeight, button.offsetWidth) + 'px';

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.height = size;
      ripple.style.width = size;

      button.insertBefore(ripple, button.firstChild);
      this.ripple = ripple;
    }
  }

  componentWillUnmount() {
    if(this.rippleEffect) {
      clearTimeout(this.rippleEffect);
    }
  }

  render() {
    const { iconBefore, faIcon, materialIcon, ripple, className, ...props } = this.props;
    let icon = null;
    if(faIcon) {
      icon = <i className={`icon fa fa-${faIcon}`} />;
    } else if(materialIcon) {
      icon = <i className="icon material-icons">{materialIcon}</i>;
    }

    const cn = classnames(className, {
      'icon-text-btn': icon,
      'ripple-btn': ripple,
    });

    return (
      <button {...props} className={cn} onClick={this.onClick}>
        <div>
          {iconBefore && icon}
          {this.props.children}
          {!iconBefore && icon}
        </div>
      </button>
    );
  }
}

const TAB = 9;
const SPACEBAR = 32;
const ENTER = 13;

export class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isTabFocused: false,
      isHelpTextVisible: false,
    };

    this.helpTextTimer = null;
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    helpPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    faIcon: PropTypes.string,
    materialIcon: PropTypes.string,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    helpTextTime: PropTypes.number,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    helpPosition: 'bottom',
    type: 'button',
    helpTextTime: 1000,
    onClick: () => {},
  }

  handleClick = (e) => {
    this.props.onClick(e);
    this.setHelpTextVisible(false);
  }

  handleKeyUp = (e) => {
    const key = e.which || e.keyCode;
    if(key === TAB) {
      this.setHelpTextVisible(true);
      this.setState({ isTabFocused: true });
    } else if(key === SPACEBAR || key === ENTER) {
      this.setHelpTextVisible(false);
    }
  }

  removeTabFocus = () => {
    this.setHelpTextVisible(false);
    this.setState({ isTabFocused: false });
  }

  handleMouseOver = () => {
    this.setHelpTextVisible(true);
  }

  handleMouseLeave = () => {
    this.setHelpTextVisible(false);
  }

  setHelpTextVisible(visible) {
    if(visible) {
      if(this.helpTextTimer) { return; }

      this.helpTextTimer = setTimeout(() => {
        this.setState({ isHelpTextVisible: true });
      }, this.props.helpTextTime);
    } else {
      if(this.helpTextTimer) {
        clearTimeout(this.helpTextTimer);
        this.helpTextTimer = null;
      }

      this.setState({ isHelpTextVisible: false });
    }
  }

  render() {
    const { isTabFocused, isHelpTextVisible } = this.state;
    const buttonProps = {
      className: classnames('icon-btn', this.props.className, {
        'tab-focus': isTabFocused,
      }),
      onClick: this.handleClick,
      'aria-label': this.props.label,
      onKeyUp: this.handleKeyUp,
      onBlur: this.removeTabFocus,
      onMouseOver: this.handleMouseOver,
      onMouseLeave: this.handleMouseLeave,
    };

    let icon = this.props.children;
    if(this.props.faIcon) {
      icon = <i className={`fa fa-${this.props.faIcon}`} />;
    } else if(this.props.materialIcon) {
      icon = <i className="material-icons">{this.props.materialIcon}</i>
    }
    return (
      <button {...buttonProps}>
        {icon}
        {isHelpTextVisible &&
          <div key="help-text" className={`help-text-${this.props.helpPosition}`}>
            {this.props.label}
          </div>
        }
      </button>
    );
  }
}


export class HamburgerButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
    helpPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.string,
  }

  static defaultProps = {
    active: false,
    helpPosition: 'bottom',
    size: 'md',
  }

  render() {
    const className = classnames('hamburger-btn', this.props.className, {
      'active': this.props.active,
      [`hamburger-btn-${this.props.size}`]: this.props.size,
    });

    return (
      <IconButton {...this.props} className={className}>
        <div className="bars-wrapper">
          <div className="left-bars" />
          <div className="right-bars" />
        </div>
      </IconButton>
    );
  }
}


export class FlatButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    color: PropTypes.string,
    active: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    color: 'default',
    active: false,
  }

  render() {
    const { className, color, active, ...props } = this.props;
    const fullClassName = classnames(className, 'flat-btn', `flat-btn-${color}`, {
      'active': active,
    });

    return <Button {...props} className={fullClassName} />;
  }
}


export class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    color: 'default',
    helpPosition: 'left',
  }

  render() {
    const className = classnames(this.props.className, 'floating-btn', `floating-btn-${this.props.color}`);

    return <IconButton {...this.props} className={className} />;
  }
}
