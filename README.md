# Float Form Input
_Made specifically for React_

<img src="https://gfycat.com/ifr/TinySatisfiedFlyingsquirrel" width="430" height="184" alt="demo-1.0.0"/>

Creates a form input element with dynamic floating label element.

Simply import the FloatInput script into your React Component script.

```
import FloatInput from './FloatInput.js';
```

Define a new `FormInput` element within your render's return output;
```
render() {
  return (
    ... Open component layout
      <FloatInput name="test" placeholder="What is your test?"/>
    ... Close component layout
  )
}
```

In it's simplest form, the `FloatInput` takes a `name` property which is assigned to the input elements HTML `name` property. The second property is the `placeholder`, and is used to display the _placeholder/label_ text to the client.