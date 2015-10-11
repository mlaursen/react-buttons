import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconBefore: PropTypes.bool,
    faIcon: PropTypes.string,
    materialIcon: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  }

  static defaultProps = {
    iconBefore: false,
    onClick: (e) => { console.warn('Button with no clicky click', e.target); },
    type: 'button',
  }

  render() {
    const { iconBefore, faIcon, materialIcon, className, ...props } = this.props;
    let icon = null;
    if(faIcon) {
      icon = <i className={`fa fa-${faIcon}`} />;
    } else if(materialIcon) {
      icon = <i className="material-icons">{materialIcon}</i>;
    }

    return (
      <button {...props} className={classnames(className, { 'icon-text-btn': icon })}>
        {iconBefore && icon}
        {this.props.children}
        {!iconBefore && icon}
      </button>
    )
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
      isHelpTextVisible: false
    };
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    helpPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    faIcon: PropTypes.string,
    materialIcon: PropTypes.string,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    helpTextTime: PropTypes.number,
  }

  static defaultProps = {
    helpPosition: 'bottom',
    type: 'button',
    helpTextTime: 1000,
    onClick: (e) => { console.warn('IconButton with no clicky click', e.target); },
  }

  helpTextTimer = null

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

  removeTabFocus = (e) => {
    this.setHelpTextVisible(false);
    this.setState({ isTabFocused: false });
  }

  handleMouseOver = (e) => {
    this.setHelpTextVisible(true);
  }

  handleMouseLeave = (e) => {
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
    isLarge: PropTypes.bool,
    label: PropTypes.string.isRequired,
    helpPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  }

  static defaultProps = {
    active: false,
    isLarge: false,
    helpPosition: 'bottom',
    onClick: (e) => { console.warn('HamburgerButton with no clicky click', e.target); },
  }

  render() {
    const className = classnames('hamburger-btn', this.props.className, {
      'active': this.props.active,
      'hamburger-btn-lg': this.props.isLarge,
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
