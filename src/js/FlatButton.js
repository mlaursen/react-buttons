import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Button from './Button';

export default class FlatButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { className, type, ...props } = this.props;

    const fullClassName = classnames(className, 'flat-btn', {
      'flat-btn-primary': type === 'primary',
      'flat-btn-default': type === 'default',
      'flat-btn-error':   type === 'error',
    });

    return <Button {...props} className={fullClassName} />;
  }
}
