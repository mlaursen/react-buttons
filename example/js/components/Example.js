import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, FlatButton, IconButton, HamburgerButton } from '../../../src/js/index';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="container">
        <header><h2>React Buttons</h2></header>
        <main>
          <Button faIcon="users">Hello, World!</Button>
          <a href="#" className="icon-text-btn"><i className="fa fa-users" />Hello, world!</a>
          <FlatButton type="primary">Hello, world!</FlatButton>
          <FlatButton type="default">Hello, world!</FlatButton>
          <FlatButton type="error">Hello, world!</FlatButton>
          <IconButton faIcon="beer" label="beer" helpPosition="top" />
          <IconButton faIcon="beer" label="beer" helpPosition="right" />
          <IconButton faIcon="beer" label="beer" helpPosition="bottom" />
          <IconButton faIcon="beer" label="beer" helpPosition="left" />
          <IconButton materialIcon="face" label="Face" />
          <HamburgerButton label="Boop" />
          <HamburgerButton isLarge={true} label="Boop" />
        </main>
        <footer>
          <a href="https://github.com/mlaursen/react-buttons">
            <i className="fa fa-github" />
          </a>
        </footer>
      </div>
    );
  }
}
