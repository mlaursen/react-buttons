import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * Initializes a ripple effect for a button
 *
 * @param button a dom element to insert the ripple into as html
 * @param effectName the ripple effect's name. Defaults to 'ripple-effect'
 * @return the ripple DOM element
 */
export function initRipple(button, effectName = 'ripple-effect') {
  const size = Math.max(button.offsetHeight, button.offsetWidth) + 'px';

  const ripple = document.createElement('span');
  ripple.classList.add(effectName);
  ripple.style.height = size;
  ripple.style.width = size;

  button.insertBefore(ripple, button.firstChild);

  return ripple;
}

/**
 * Animates the ripple effect by taking the click event, the button, and the ripple.
 *
 * @param e the click event
 * @param button the button that was clicked
 * @param ripple the ripple element
 * @param rippleTimeout the timeout used for the click event
 * @param rippleDuration? the duration of the ripple effect. Defaults to 300
 * @return the updated rippleTimeout
 */
export function animateRipple(e, button, ripple, rippleTimeout, rippleDuration = 300) {
  if(rippleTimeout) {
    ripple.classList.remove('active');
  }

  const x = e.pageX - button.offsetLeft - ripple.offsetWidth / 2;
  const y = e.pageY - button.offsetTop - ripple.offsetHeight / 2;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  ripple.classList.add('active');
  rippleTimeout = setTimeout(() => {
    ripple.classList.remove('active');
    rippleTimeout = null;
  }, rippleDuration);

  return rippleTimeout;
}

export class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.ripple = null;
    this.rippleTimeout = null;
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
    rippleDuration: PropTypes.number,
  }

  static defaultProps = {
    iconBefore: false,
    type: 'button',
    onClick: () => {},
    ripple: false,
    rippleDuration: 300,
  }

  onClick = (e) => {
    this.props.onClick(e);
    if(!this.props.ripple) {
      return;
    }

    this.rippleTimeout = animateRipple(e, ReactDOM.findDOMNode(this), this.ripple, this.rippleTimeout, this.props.rippleDuration);
  }

  componentDidMount() {
    if(this.props.ripple) {
      this.ripple = initRipple(ReactDOM.findDOMNode(this));
    }
  }

  componentWillUnmount() {
    if(this.rippleTimeout) {
      clearTimeout(this.rippleTimeout);
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
        {iconBefore && icon}
        {this.props.children}
        {!iconBefore && icon}
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
    ripple: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    helpPosition: 'bottom',
    type: 'button',
    helpTextTime: 1000,
    onClick: () => {},
    ripple: false,
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
      faIcon: this.props.faIcon,
      materialIcon: this.props.materialIcon,
      ripple: this.props.ripple,
    };

    return (
      <Button {...buttonProps}>
        {this.props.children}
        {isHelpTextVisible &&
          <div key="help-text" className={`help-text-${this.props.helpPosition}`}>
            {this.props.label}
          </div>
        }
      </Button>
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
