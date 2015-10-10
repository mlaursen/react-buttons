import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import IconButton from './IconButton';

export default class FloatingButton extends Component {
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
