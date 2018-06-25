# Flow Input
_Made specifically for React_

<img src="https://thumbs.gfycat.com/KaleidoscopicQuarrelsomeIberianemeraldlizard-size_restricted.gif" width="430" height="184" alt="demo-1.0.0"/>

Creates a form input element with dynamic floating label element.

Simply import the FlowInput script into your React Component script.

```
import FlowInput from './FlowInput.js';
```

Define a new `FormInput` element within your render's return output;
```
render() {
  return (
    ... Open component layout
      <FlowInput name="test" placeholder="What is your test?"/>
    ... Close component layout
  )
}
```

In it's simplest form, the `FlowInput` takes a `name` property which is assigned to the input elements HTML `name` property. The second property is the `placeholder`, and is used to display the _placeholder/label_ text to the client.