(function(document, window){
  "use strict";

  var BINDER = {
        prefix : 'data-bd'
      },
      triggers = {},
      tests = {},
      display_values ={},
      property_cache ={};

  /**
   * Quick html entities encode
   * @param  String      text to encode
   * @return String      html encoded string
   */
  function enc( str ) {
    return document.createElement( 'div' ).appendChild( document.createTextNode( str ) ).parentNode.innerHTML;
  }

  /**
  * @param object   data to traverse
  * @param keys     key to find as array
  */
  function getProp(data, keys){
    var index = keys.pop(),
        obj = data[index];

    if(keys.length && typeof obj ==='object'){
        return getProp(obj, keys);
    }

    if(obj!=undefined){
      return obj;
    }
  }

  function setValueInput(element, value){
    var attribute=element.getAttribute('type');
    if((attribute==='radio' || attribute==='checkbox') && element.value===value){
      element.setAttribute('checked','checked');
    }
    else{
      element.value = enc(value);
    }
  }

  function setValue(element, value){
    if(value){
      if(element.nodeName==='INPUT'
          || element.nodeName==='TEXTAREA'
          || element.nodeName==='SELECT'){
        setValueInput(element, value);
      }
      else{
        element.textContent=value;
      }
    }
  }

  /**
  * get default display values.
  */
  function getDefaultDisplay( elem ) {
    var  temp_node, display = display_values[elem.nodeName];
    if ( display ) {
      return display;
    }
    temp_node = document.body.appendChild( document.createElement( elem.nodeName ) );
    if(!!window.getComputedStyle){
      display = window.getComputedStyle(temp_node).display;
    }
    else{
      display = temp_node.currentStyle.display;
    }
    if ( display === "none" ) {
      display = "block";
    }
    temp_node.parentNode.removeChild( temp_node );
    display_values[elem.nodeName] = display;

    return display;
  }

  function showElement(element){
    element.style.display=getDefaultDisplay(element);
  }

  function hideElement(element){
    element.style.display='none';
  }

  function eachNode(nodeList, func){
    for (var count=0; count < nodeList.length; count ++){
      func(nodeList[count]);
    }
  }

  function getPropValue(data, propertyName)
  {
    var value;
    if(!!property_cache[propertyName]){
      //set in object so we can know about cached null/false values
      return property_cache[propertyName].value
    }
    value = getProp(data, propertyName.split('.').reverse());
    property_cache[propertyName] = {value:value}
    return value;
  }

  function runTrigger(data, element, attribute, func){
    var bound=element.getAttribute(attribute),
        options=bound.split(':'),
        value=getPropValue(data, options[1]),
        test;

    for(test in tests){
      if(tests[test](options[0])){
        func(element, attribute);
      }
    }
  }

  function runBind (data, element){
      var bound=element.getAttribute('data-bd'),
      options=bound.split(','),
      value,
      slice,
      count;

      for (count = 0; count < options.length; ++count) {
          slice=options[count].split('='); //key=value
          value=getPropValue(data, slice[0]);

          if(slice.length==1 || slice[1]=='text'){
            setValue(element, value);
          }
          else{
            element.setAttribute(slice[1], value);
          }
      }
    }

  BINDER.dataUpdateEvent=function (data){

    eachNode(document.querySelectorAll('*['+BINDER.prefix+']'), function(element){
      runBind(data, element);
    });

    for(var trigger in triggers){
      eachNode(document.querySelectorAll('*['+BINDER.prefix+trigger+']'), function(element){
        var attribute = BINDER.prefix+trigger;
        runTrigger(data, element, attribute, triggers[trigger]);
      });
    }
    property_cache = {};
  };

  BINDER.registerTrigger=function(TriggerName, func){
    triggers['-'+TriggerName] = func;
  }

  BINDER.registerTest=function(testName, func){
    tests[testName] = func;
  }

  //default triggers show-if and hide-if

  BINDER.registerTrigger('show-if', showElement);

  BINDER.registerTrigger('hide-if', hideElement);

  //default tests that can be combined with triggers

  BINDER.registerTest('set',function(v){return !!v});

  BINDER.registerTest('notset',function(v){return !v});

  window.BINDER = BINDER;

}(document, window));
