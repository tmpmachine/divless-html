# divless.js
Generate HTML code from divless-HTML format.

## Use Case & Basic Usage
You can see the use case here: https://github.com/tmpmachine/codetmp#divless-html under **Divless-HTML** section.
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

## Skip Divless Format
Divless.js will skip replacing divless HTML format if wrapped inside one of these matching sequence :
| Start skip | End skip |
| --- | --- |
| <style	 | </style> |
| <script	 | </script> |
| &lt;!--nodivless--> | &lt;!--/nodivless--> |

Example :
```html
[btn "Button 1"]
<!--nodivless-->
[ #my-div
  Do not replace this part
]
<!--/nodivless-->
[btn "Button 2"]
```
Returned result :
```html
<button>Button 1</button>
<!--nodivless-->
[ #my-div
  Do not replace this part
]
<!--/nodivless-->
<button>Button 2</button>
```

## Reserved Attribute Prefix
### ID
Use `#` to set element ID.
```html
[ #my-div
  Hello World.
]
```
Returned result :
```html
<div id="my-div">
  Hellow World.
</div>
```

### Class
Use `.` to set element class.
```html
[ .class1 .class2
  Hello World.
]
```
Returned result :
```html
<div class="class1 class2">
  Hellow World.
</div>
```

### Inline Style
Use `{}` to wrap inline style. CSS properties shortname available below.
```html
[ {p:8px 16px} {bor:1px solid} {pos:absolute;top:0} 
  Hello World.
]
```
Returned result :
```html
<div style="padding:8px 16px;border:1px solid;position:absolute;top:0">
  Hellow World.
</div>
```

## Limitation
Currently not supporting one line nested tags, for example this one will fail replaced correctly :
```
[ [btn 'This is a button inside a div container']]
```
Solution: use divless on the inner most element :
```
<div>[btn 'This is a button inside a div container']</div>
```

## HTML Shortname
| HTML Tag | Shortname |
| --- | --- |
| div	 |  |
| video	 | v |
| audio	 | au |
| button	 | btn |
| canvas	 | can |
| input	 | in |
| span	 | s |
| label	 | l |
| textarea	 | t |
| select	 | sel |
| option	 | opt |

## CSS Shortname
Note : available only for inline style properties.
| CSS Property | Shortname |
| --- | --- |
| padding	 | p |
| padding-left	 | pl |
| padding-top	 | pt |
| padding-right	 | pr |
| padding-bottom	 | pb |
| margin	 | m |
| margin-left	 | ml |
| margin-top	 | mt |
| margin-right	 | mr |
| margin-bottom	 | mb |
| text-decoration	 | td |
| text-transform	 | tt |
| font-family	 | ff |
| font-size	 | fs |
| font-style	 | ft |
| font-weight	 | fw |
| text-align	 | ta |
| white-space	 | ws |
| float	 | f |
| overflow	 | ov |
| min-width	 | mw |
| min-height	 | mh |
| max-width	 | Mw |
| max-height	 | Mh |
| width	 | w |
| height	 | h |
| display	 | d |
| visibility	 | vis |
| opacity	 | op |
| color	 | col |
| background	 | bg |
| border-radius	 | rad |
| border	 | bor |
| position	 | pos |
| z-index	 | z |
| top	 | t |
| left	 | l |
| right	 | r |
| bottom	 | b |
| line-height	 | lh |

### Flexbox / Grid
| CSS Property | Shortname |
|---|---|
| grid-template-rows	 | rows |
| grid-template-columns	 | cols |
| grid-gap	 | Gap |
| grid-column-start	 | col-start |
| grid-column-end	 | col-end |
| grid-row-start	 | row-start |
| grid-row-end	 | row-end |
| align-items | ali |
| align-self | als |
| justify-content | jt |
