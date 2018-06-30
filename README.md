# React Flow Input

> Made specifically for React.

<img src="https://thumbs.gfycat.com/KaleidoscopicQuarrelsomeIberianemeraldlizard-size_restricted.gif" width="438" height="132" alt="demo-1.0.0"/>

## Install

```
npm install react-flow-components
```

## Usage

> Via React with Javascript ES6

Import the `FlowInput` from the `react-flow-components` module as such;

```
import FlowInput from 'react-flow-components';
```

Then implement within your component's `render` function like so;

```
render() {
  return (
    ... Open Component Layout ...
      <FlowInput/>
    ... Close Component Layout ...
  )
}
```

## Options
| Property |       Type       |      Description     |
| -------- | :--------------: | -------------------- |
| name	   | `string`  		  | Input/Component name |
| value	   | `string|number`  | Initial input value  |
| type	   | `string`         | Input value type     |