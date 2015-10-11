# react-buttons

A few common buttons with css and helpers.

Live example: [react-buttons](http://mlaursen.github.io/react-buttons)

## Installation

```bash
$ npm install -S react-buttons
```

Include the css file or import the sass file

```sass
// symlink way
@import "vendors/react-buttons/react-buttons";

// or
@import "../some/path/to/node_modules/react-buttons/src/scss/react-buttons";
```

> I personally prefer the symlink way. You can checkout
> [my postinstall script](https://github.com/mlaursen/gulpfile-example/blob/master/scripts/postinstall.js#L31)
> for an example.


## Example

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, IconButton, HamburgerButton, FloatingButton, FlatButton } from 'react-buttons';

class Example extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <Button faIcon="plus" onClick={/* sommething */}>New Thing</Button>
        <Button materialIcon="favorite" iconBefore={true} onClick={/* sommething */}>Favorite</Button>
        
        <IconButton faIcon="plus" label="Add a new thing" onClick={/* something */} />
        <IconButton materialIcon="favorite" label="Add this as a favorite" onClick={/* something */} />

        <HamburgerButton active={false} isLarge={true} onClick={/* something */} />
        <HamburgerButton active={this.props.btnActive} onClick={/* toggle */} />

        <FlatButton color="primary" onClick={/* something */} />

        <FloatingButton faIcon="plus" label="Add a new thing" onClick={/* something */} />
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('app'));
```

> Check out the examples folder or the live demo for other ideas.

## React Components

#### Button
This is just a basic button that helps with placing icons on a button before or after the text.

```js
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
```

When giving a font-awesome icon, do not pass in 'fa fa-whatever'. All that is needed is 'whatever'.

There is a corresponding css class names `.icon-text-btn` that gets applied to this button that adds a margin to icons and their text.

#### IconButton
This is a button that is only an icon with no text. There is some attempted accessibility built into
this component as well. If you hover over the button, help text will appear describing what that button
should be doing.

```js
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
```

The prop `label` is used as the text for the help text.

The prop `helpPosition` is used to tell which side of the button the floating-box of text will appear

The corresponding css class name is `.icon-btn`. The help text extends a class `floating-box`.

> HamburgerButton and FloatingButton both use IconButton and pass all props into it. So the propTypes
> here are valid for them as well.

#### HamburgerButton
This is just a *pretty* hamburger button that has the lines move into an X if you change the prop `active` to true.

```js
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
```

The hamburger button is generated with some css and the corresponding class is `.hamburger-btn`.

Since modifying the colors and changing the sizes is a bit of work, there are 3 sass mixins available.
`hamburger-size`, `hamburger-color`, `hamburger-position`

So if you wanted to create a new alternative color button,

```sass
.hamburger-btn.hamburger-btn-blue {
  $background-color: #3498dbl
  $line-color: #ecf0f1;
  @include hamburger-color($background-color, $line-color);
}

.hamburger-btn.hamburger-btn-xs {
  $icon-size: 12px;
  $line-size: 2px;
  @include hamburger-size($icon-size, $line-size);
  @include hamburger-position($icon--size, $line-size);
}
```

> I can't promise that custom sizes always work correctly. Even numbers usually worked ok.

#### FlatButton
Creates a 'flat' button that presses down when clicked.

```js
  static propTypes = {
    color: PropTypes.string,
    active: PropTypes.bool,
  }

  static defaultProps = {
    color: 'default',
    active: false,
  }
```

The color is any string that you want to add to the end of `flat-btn-`.
There are 3 types available at the start `default`, `primary`, `error`.

There is a mixin you can use to create a new button color alternative `flat-btn`

```sass
.flat-btn {
  
  $name: 'irock',
  $background-color: #95a5a6; // concrete
  $text-color: #000;
  $border-color: #7f8c8d; // asbestos
  $border-size: $flat-btn-border-size;
  @include($name, $background-color, $text-color, $border-color, $border-size);
}

// creates
.flat-btn.flat-btn-irock {
  background-color: #95a5a6;
  color: #000
  border-bottom: 2px solid #7f8c8d;

  box-shadow: inset 0 -2px #7f8c8d;
}
```

#### FloatingButton
This is just a button that *floats* in the bottom right hand corner of the screen.

```js
  static propTypes = {
    color: PropTypes.string,
  }

  static defaultProps = {
    color: 'default',
    helpPosition: 'left',
  }
```

The color is any string that you want to add to the end of `floating-btn-`.
There are 3 types available at the start `default`, `primary`, `error`.

There is no mixin for this one because it is easy enough to create your own here.


##### .floating-box / .help-text
There is a reusable relative menu named `.floating-box`. View `src/scss/_helpers.scss` for more.


### Development

To run the local build and check for changes in the examples,

```bash
$ npm start

# or

$ gulp serve
```

To build for a release

```bash
$ npm run build

# or

$ gulp dist
```
