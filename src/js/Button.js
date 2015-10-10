import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconBefore: PropTypes.bool,
    faIcon: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  }

  static defaultProps = {
    iconBefore: false,
    faIcon: null,
    className: null,
    onClick: (e) => { console.warn('Button with no clicky click', e.target); },
    type: 'button',
  }

  render() {
    const { iconBefore, faIcon, className, ...props } = this.props;
    const icon = faIcon && <i className={`fa fa-${faIcon}`} />;

    return (
      <button {...props} className={classnames(className, { 'icon-text-btn': icon })}>
        {iconBefore && icon}
        {this.props.children}
        {!iconBefore && icon}
      </button>
    )
  }
}
