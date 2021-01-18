/*
1.39 - 17 Jan 2021-- removing special tag html
1.38 - 23 Aug -- restructuring code, change name to divless.js, modify several css shortname
1.37 - 13 July -- remove unnecessary HTML shortname
1.36 - 15 June -- prevent changing mode when reading an actual HTML tag attributes
1.35 - 9 June -- remove overflow-x & overflow-y, added more grid css shorthand
1.34 - 13 May -- remove w3.css support, added grid css shortcut
1.331 : 24 march 2020 -- update duplicate var error message
1.33 : 18 sep -- fix tag skips include error for Blogsphere, function encapsulation, unclose attribute handler, style without break handler
1.32 : 7 sep -- encapsulation
1.31 - 29 July - clear plate element
1.30 - 22 May - added more css shorthand
1.29 - 2 May - added skips for php
1.28 - 11 Apr - reduced code from 922 to 757 line
1.27 - 2 Apr - removing empty space after cook, rollback from let to var and const
1.26 - 29 Mar - center, form, table, tr, td, th HTMLShortname
1.25 - 27 Mar - removing default w3-row class for div
1.24 - 6 Mar - added ul and li tag
*/

(function () {
  
  function generateAttributes(attributes) {
    const atts = [];
  
    if (attributes.id.length > 0)
      atts.push('id="'+attributes.id.join('')+'"');
    if (attributes.class.length > 0)
      atts.push('class="'+attributes.class.join(' ')+'"');
    if (attributes.attribute.length > 0)
      atts.push(attributes.attribute.join(' '));
    if (attributes.style.length > 0) {
      for (let i in attributes.style)
        if (!attributes.style[i].endsWith(';'))
          attributes.style[i] += ';';
      atts.push('style="'+attributes.style.join('')+'"');
    }
    
    attributes.id.length = 0;
    attributes.class.length = 0;
    attributes.attribute.length = 0;
    attributes.style.length = 0;
    attributes.innerHTML.length = 0;
    
    if (atts.length > 0)
      return ' '+atts.join(' ');
    else
      return atts.join(' ');
  }
    
  let HTMLShortname = [
    [' '  ,'div'      ,true ,''],
    ['v'  ,'video'    ,true ,''],
    ['au' ,'audio'    ,true ,''],
    ['btn','button'   ,true ,''],
    ['can','canvas'   ,true ,''],
    ['in' ,'input'    ,false,''],
    ['s'  ,'span'     ,true ,''],
    ['l'  ,'label'    ,true ,''],
    ['t'  ,'textarea' ,true ,''],
    
    ['sel','select'   ,true ,''],
    ['opt','option'   ,true ,''],
    ['M'  ,'i'        ,true ,'material-icons'],
  ];
  let CSSShortname = {
    'p:': 'padding:',
    'pl:': 'padding-left:',
    'pt:': 'padding-top:',
    'pr:': 'padding-right:',
    'pb:': 'padding-bottom:',
    
    'm:': 'margin:',
    'ml:': 'margin-left:',
    'mt:': 'margin-top:',
    'mr:': 'margin-right:',
    'mb:': 'margin-bottom:',
    
    'td:': 'text-decoration:',
    'tt:': 'text-transform:',
    'ff:': 'font-family:',
    'fs:': 'font-size:',
    'ft:': 'font-style:',
    'fw:': 'font-weight:',
    
    'ta:': 'text-align:',
    'ws:': 'white-space:',
    
    'f:': 'float:',
    'ov:': 'overflow:',
    
    'mw:': 'min-width:',
    'mh:': 'min-height:',
    'Mw:': 'max-width:',
    'Mh:': 'max-height:',
    'w:': 'width:',
    'h:': 'height:',
    
    'd:': 'display:',
    'vis:': 'visibility:',
    'op:': 'opacity:',
    
    'rows:': 'grid-template-rows:',
    'cols:': 'grid-template-columns:',
    'col-start:': 'grid-column-start:',
    'row-start:': 'grid-row-start:',
    'col-end:': 'grid-column-end:',
    'row-end:': 'grid-row-end:',
    'gap:': 'grid-gap:',
    
    'col:': 'color:',
    'bg:': 'background:',
    
    'rad:': 'border-radius:',
    'bor:': 'border:',
    
    'pos:': 'position:',
    'z:': 'z-index:',
    't:': 'top:',
    'l:': 'left:',
    'r:': 'right:',
    'b:': 'bottom:',
    
    'lh:': 'line-height:',
  };
  
  function replaceShortName(meat, attributes) {
    
    const lt = String.fromCharCode(60);
    const gt = String.fromCharCode(62);
      
    const settings = {
      tag: [],
      class: [
        {short: '.', prefix: ''},
      ],
      attributes: [
        {open: '{', close: '}', name: 'style'},
        {open: '"', close: '"', name: 'innerHTML'},
        {open: "'", close: "'", name: 'innerHTML'},
        {open: '@', close: ' ', name: 'id'},
      ]
    };
    
    const skips = [
      {open:'<code>', close:'</code>'},
      {open:'<style>', close:'</style>'},
      {open:'<script', close:'</script>'},
    ];
    
    for (const tag of HTMLShortname) {
      settings.tag.push({
        short: tag[0],
        tag: tag[1],
        close: tag[2],
        attributes: { class: tag[3] }
      });
    }
      
    divless.tag.forEach(function(t) {

      settings.tag.forEach(function(s) {
        
        if (s.short === t.short)
          s.attributes.class = t.attributes.class;
        
      });
    });
    
    const shortHandStack = [];
    var shortHandPointer = 0;
    const shortHandCheck = [];
    var waitImportant = false;
    
    var dontClose = 0;
    const listen = [];
    var pointer = 0;
    const ht = [];
    const stack = [];
    var openingClose = '';
    const closeTag = [];
    var scanType = '';
    
    var spaceOne = false;
    var typeLock = false;
    
    var tagStack = [];
    var unClose = 0;
    const attStack = [];
    var attMode = '';
    var lock = '';
    var innerLock = '';
  
    var waitSkip = '';
    const newMatch = [];
    var charBypass = '';
    var mode = '';
    
    function finishTag() {
      var tagName = tagStack.join('');
      var choosenTag = {
        tag: tagName,
        close: true,
        attributes: { class: '' }
      };
          
      if (tagStack.length === 0)
        choosenTag = settings.tag[0];
      
      settings.tag.forEach(function(tag) {
        if (tag.short === tagName)
          choosenTag = tag;
      });
      
      ht.push(choosenTag.tag);
      if (choosenTag.close) {
        openingClose = gt;
        closeTag.push(lt+'/'+choosenTag.tag+gt);
      } else {
        unClose--;
        openingClose = '';
        closeTag.push('/'+gt);
      }
      mode = 'scanTag';
      tagStack.length = 0;
      attributes.class = choosenTag.attributes.class.split(' ');
      if (attributes.class[0].length === 0)
        attributes.class.length = 0;
    }
    
    function stopRender(char) {
      if (dontClose > 0) {
        ht.push(char);
        dontClose--;
        return;
      }
      
      if (mode == 'getTagName')
        finishTag();
        
      if (mode == 'scanTag' || mode == 'scanAtt' || unClose > 0) {
        if (scanType == 'class') {
          attributes.class.push(stack.join(''));
          stack.length = 0;
        } else if (scanType == 'id') {
          attributes.id.push(stack.join(''));
          stack.length = 0;
        } else if (scanType == 'innerHTML') {
          attributes.innerHTML.push(stack.join(''));
          stack.length = 0;
        }
        
        
        if (attStack.length > 0)
          attributes.attribute.push(attStack.join(''));
        
        const innerHTML = attributes.innerHTML.join('');
        const newAtt = generateAttributes(attributes);
        
        if (char == ']') {
          stack.push(newAtt+openingClose+innerHTML+closeTag[closeTag.length-1]);
          closeTag.pop();
        } else {
          stack.push(newAtt+openingClose+innerHTML+'\n');
        }
        
        if (newAtt.length === 0) {
          for (const xs of stack)
            ht.push(xs);
        } else {
          for (const xs of stack)
            ht.push(xs);
        }
        
        attStack.length = 0;
        spaceOne = false;
        openingClose = '';
        stack.length = 0;
        mode = ''
        scanType = '';
      } else {
        ht.push(char);
      }
    }
    
    
    for (var char of meat) {
      if (mode == 'open' || mode == 'skip') {
        stack.push(char);
        var match = false;
        var done = false;
        
        if (mode == 'open') {
          for (const skip of skips) {
            var search = skip.open;
            
            if (search[pointer] == char) {
              match = true;
              
              if (search.length == pointer+1) {
                mode = 'skip';
                waitSkip = skip.close;

                done = true;
                pointer = 0;
                
                  for (const xs of stack)
                    ht.push(xs);
                  
                stack.length = 0;
                break;
              }
            }
          }
        } else if (mode =='skip') {
          if (waitSkip[pointer] == char) {
            match = true;
            
            if (waitSkip.length == pointer+1) {
              mode = '';

              done = true;
              pointer = 0;
              
                for (const xs of stack)
                  ht.push(xs);
              
                
              waitSkip = '';
              stack.length = 0;
            }
          }
        }
        
        if (match) {
          if (done) continue;
          pointer++;
        } else {
          if (mode == 'open')
            mode = '';
          else
            pointer = 0;
          
            for (const xs of stack)
              ht.push(xs)
            stack.length = 0;
        }
      } else {
        if (scanType == 'attribute' || attMode == 'lock') {
          charBypass = char
          char = 'a';
        }
        
        if (scanType == 'innerHTML') {
          if (char != innerLock) {
            stack.push(char);
            continue;
          } else {
            innerLock = '';
          }
        }
        
        switch (char) {
          case lt:
            
            stack.push(char);
            pointer = 1;
            if (mode === '')
              mode = 'open';
              
            break;
          case '[':
            
            attMode = '';
            unClose++;
            ht.push(lt);
            mode = 'getTagName';
            
            break;
          case ']':
          case '\n':
          case '\r':

            stopRender(char);
            
            break;
          default:
            
            if (charBypass != '') {
              char = charBypass;
              charBypass = '';
            }
            
            if (char === ' ' && mode === 'getTagName') {
              finishTag();
            } else if (mode == 'scanTag') {
              var match = false;
              if (attMode == '') {
                for (const cls of settings.class) {
                  if (cls.short == char) {
                    match = true;
                    mode = 'scanAtt';
                    scanType = 'class';
                    stack.push(cls.prefix);
                    break;
                  }
                }
              }
              
              if (!match) {
                
                if (attMode == '') {
                  for (const attribute of settings.attributes) {
                    if (attribute.open == char) {
                      match = true;
                      mode = 'scanAtt';
                      
                      switch (attribute.open) {
                        case '@':
                          scanType = 'id';
                        break;
                        case '"':
                          scanType = 'innerHTML';
                          innerLock = '"'
                        break;
                        case "'":
                          scanType = 'innerHTML';
                          innerLock = "'"
                        break;
                        default:
                          scanType = 'attribute';
                      }
                      
                      for (let key in CSSShortname)
                        shortHandCheck.push(key);
                      break;
                    }
                  }
                }
                
                if (!match) {
                  if (attMode == 'value') {
                    attStack.push(char)
                    attMode = 'lock'
                    
                    if (char == '"' || char == "'")
                      lock = char;
                    else
                      lock = ' '
                  } else if (attMode == 'lock') {
                    if (lock == ' ' && (char == '\n' || char == ']')) {
                      attributes.attribute.push(attStack.join(''));
                      attMode = '';
                      lock = '';
                      attStack.length = 0;
                      stopRender(char)
                    } else if (char == lock) {
                      if (lock != ' ')
                        attStack.push(char)
                      attributes.attribute.push(attStack.join(''));
                      
                      attMode = '';
                      lock = '';
                      attStack.length = 0;
                    } else {
                      attStack.push(char);
                    }
                      
                  } else {
                    if (char == ' ') {
                      if (attMode == 'waitForValue') {
                        attributes.attribute.push(attStack.join(''));
                        attMode = '';
                        attStack.length = 0;
                      } else {
                        if (!spaceOne)
                          spaceOne = true;
                      }
                    } else {
                      attStack.push(char);
                      
                      if (char == '=')
                        attMode = 'value';
                      else
                        attMode = 'waitForValue'
                    }
                  }
                }
              }
            } else if (mode == 'scanAtt') {
              if ((char == ' ' && scanType != 'attribute') || char == '}' || char == '"' && scanType != 'attribute' || char == "'" && scanType != 'attribute') {
                if (scanType == 'class') {
                  attributes.class.push(stack.join(''));
                } else if (scanType == 'innerHTML') {
                  attributes.innerHTML.push(stack.join(''));
                } else if (scanType == 'id') {
                  attributes.id.push(stack.join(''));
                } else if (scanType == 'attribute') {
                  attributes.style.push(shortHandStack.join(''))
                  shortHandStack.length = 0;
                  shortHandPointer = 0;
                }
  
                stack.length = 0;
                mode = 'scanTag'
                scanType = ''
              } else {
                if (scanType == 'attribute') {
                  var match = false;
                  for (var i = 0; i < shortHandCheck.length; i++) {
                    if (shortHandCheck[i][shortHandPointer] == char)
                      match = true;
                    else {
                      shortHandCheck.splice(i,1);
                      i -= 1;
                    }
                  }
                  
                  if (match) {
                    shortHandStack.push(char);
                    shortHandPointer++;
                    if (char == ':') {
                      const start = shortHandStack.length-shortHandPointer;
                      const end = shortHandPointer;
                      shortHandStack.splice(start,end);
                      
                      for (const char of CSSShortname[shortHandCheck[0]].split(''))
                        shortHandStack.push(char);
                    }
                  } else {
                    if (char == '!') {
                      waitImportant = true;
                    } else if (char == ';' || char == ' ') {
                      if (char == ';' && waitImportant) {
                        char = 'important;'
                        waitImportant = false;
                      }
                      
                      shortHandPointer = 0;
                      for (let key in CSSShortname)
                        shortHandCheck.push(key);
                    }
                    
                    shortHandStack.push(char);
                  }
                } else {
                  stack.push(char);
                }
              }
            } else if (mode == 'getTagName') {
              tagStack.push(char);
            } else {
              ht.push(char)
            }
          
          // end of default
        }
      }
    }
    
    return ht.join('');
  }
  
  
  const divless = {
    tag: [],
    replace: function(HTML) {
      const attributes = {
        class: [],
        attribute: [],
        style: [],
        id: [],
        innerHTML: []
      };
      
      HTML = replaceShortName(HTML, attributes);
      
      return HTML;
    },
  }
  
  if (window.divless === undefined)
    window.divless = divless;
  else
    console.error('divless.js:', 'Failed to initialize. Duplicate variable exists.');
})();
