import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

const TAB = 9;
const SPACEBAR = 32;
const ENTER = 13;

export default class IconButton extends Component {
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
};
