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

## CSS Shortname (inline style only!)
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
