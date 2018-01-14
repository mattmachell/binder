#Binder#

A tiny library for updating dynamic data on a webpage.

Say you have an JSON/JS object:

```
var data = { items: ['bob','sally']}
```
and some html:

```
<li data-bd="items.0">Tom</li>
<li data-bd="items.1">Harry</li>
```
update the document data with:

```
BINDER.dataUpdateEvent(data);
```
This will update every occurrence on a page.

```
<li data-bd="items.0">bob</li>
<li data-bd="items.1">sally</li>
```

Works will with AJAX responses or Proxy objects listening for changes.

##Attributes##

You can update attributes rather than node content via:

```
<a data-bd="items.1=href" href="/1">Tom</li>
```

##Show/Hide##
You can set elements to show hide based on content:

```
<li data-bd-show-if="set:items.0">Tom</li>
<li data-bd-hide-if"set:items.1">Harry</li>
```

##Extensible##
Add triggers and their associated test evaluations to act on elements when a condition is met.

```
BINDER.registerTrigger('do-something-if', function(element, attribute){
  //do something with an element based on the contents of the data-attribute attribute
});
```

```
BINDER.registerTest('is-null', function(v){return v === null})
```

```
<li data-bd-do-something-if="is-null:items.0">Tom</li>
```


##Config##

By default uses data-bd as the attribute prefix, but you can set that:

```
BINDER.prefix = 'data-bound';
```
