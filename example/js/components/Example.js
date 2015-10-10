import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, FlatButton, IconButton, HamburgerButton, FloatingButton } from '../../../src/js/index';

const FLOATING_BTN_PROPS = [
  { label: 'Change to floating-btn-primary', faIcon: 'cube', color: 'default' },
  { label: 'Change to floating-btn-error', faIcon: 'plus', color: 'primary' },
  { label: 'Change to floating-btn-default', faIcon: 'times', color: 'error' },
];

const FLAT_BTN_PROPS = [
  { color: 'default' },
  { color: 'primary', faIcon: 'optin-monster', iconBefore: true },
  { color: 'error', materialIcon: 'favorite_border' },
];

const ICON_BTN_PROPS = [
  { label: 'Change to material icon', faIcon: 'beer' },
  { label: 'Change help position to left', materialIcon: 'face' },
  { label: 'Change help position to left', materialIcon: 'feedback', helpPosition: 'left' },
];
export default class Example extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isHamburgerOpen: { 0: false, 1: false, 2: false, 3: false },
      floatingBtnPropsIndex: 0,
      flatBtnPropsIndex: 0,
      iconBtnPropsIndex: 0,
    };
  }

  toggleHamburger = (index) => {
    const isHamburgerOpen = Object.create(this.state.isHamburgerOpen);

    isHamburgerOpen[index] = !isHamburgerOpen[index];

    this.setState({ isHamburgerOpen: isHamburgerOpen });
  }

  _next(i, list, key) {
    let index = i + 1;
    if(index === list.length) {
      index = 0;
    }

    const state = {};
    state[`${key}BtnPropsIndex`] = index;
    this.setState(state);
  }

  nextFloatingBtn = (e) => {
    this._next(this.state.floatingBtnPropsIndex, FLOATING_BTN_PROPS, 'floating');
  }

  nextFlatBtn = (e) => {
    this._next(this.state.flatBtnPropsIndex, FLAT_BTN_PROPS, 'flat');
  }

  nextIconBtn = (e) => {
    this._next(this.state.iconBtnPropsIndex, ICON_BTN_PROPS, 'icon');
  }

  render() {
    const { isHamburgerOpen } = this.state;

    return (
      <div className="container">
        <header><h2>React Buttons</h2></header>
        <main>
          <div className="buttons-container">
            <Button faIcon="users">Hello, World!</Button>
            <a href="#" className="icon-text-btn"><i className="fa fa-users" />Hello, world!</a>
            <FlatButton {...FLAT_BTN_PROPS[this.state.flatBtnPropsIndex]} onClick={this.nextFlatBtn}>Click for other props</FlatButton>
            <IconButton {...ICON_BTN_PROPS[this.state.iconBtnPropsIndex]} onClick={this.nextIconBtn} />
            <HamburgerButton isOpen={isHamburgerOpen[0]} onClick={this.toggleHamburger.bind(this, 0)} label="Boop" />
            <HamburgerButton isOpen={isHamburgerOpen[1]} onClick={this.toggleHamburger.bind(this, 1)} isLarge={true} label="Boop" />
            <HamburgerButton className="fancy-dancy" isOpen={isHamburgerOpen[2]} onClick={this.toggleHamburger.bind(this, 2)} label="Boop" />
            <HamburgerButton className="fancy-dancy" isOpen={isHamburgerOpen[3]} onClick={this.toggleHamburger.bind(this, 3)} isLarge={true} label="Boop" />
          </div>
        </main>
        <FloatingButton {...FLOATING_BTN_PROPS[this.state.floatingBtnPropsIndex]} onClick={this.nextFloatingBtn} />
        <footer>
          <a href="https://github.com/mlaursen/react-buttons">
            <i className="fa fa-github" />
          </a>
        </footer>
      </div>
    );
  }
}
