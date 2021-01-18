# divless.js
Generate HTML code from divless-HTML format.

## Use Case & Basic Usage
You can see the use case here: https://github.com/tmpmachine/codetmp under **Divless-HTML** section.
```javascript
let html = divless.replace(divlessHTMLText);
```

## Example
```javascript
let html = divless.replace(`

  [ {bor:1px solid}
    [p "Hello world!"]
  ]

`);
```
Returned result :
```html

  <div style="border:1px solid">
    <p>Hello world!</p>
  </div>

```
