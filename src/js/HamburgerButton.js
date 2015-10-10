import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import IconButton from './IconButton';

export default class HamburgerButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    isLarge: PropTypes.bool,
    label: PropTypes.string.isRequired,
    helpPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  }

  static defaultProps = {
    isOpen: false,
    isLarge: false,
    helpPosition: 'bottom',
    onClick: (e) => { console.warn('HamburgerButton with no clicky click', e.target); },
  }

  render() {
    const className = classnames('hamburger-btn', this.props.className, {
      'active': this.props.isOpen,
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
};
