module( "Core events" );
test("Basic replacement", function(){

  BINDER.dataUpdateEvent({item:{val:'1'}});

   ok(document.getElementById('bd1').textContent==='1')

   BINDER.dataUpdateEvent({thing:{name:'h2g2'}});

   ok(document.getElementById('bd2').value==='h2g2');
   ok(document.getElementById('bd2a').value==='h2g2');

   BINDER.dataUpdateEvent({thingy:{query:'thing'}});

   ok(document.getElementById('bd3').value==='thing');

   BINDER.dataUpdateEvent({thingy:{query:'monster'}});

   ok(document.getElementById('bd3').value==='monster');

   BINDER.dataUpdateEvent({fruit:{type:'Pear'}});

   ok(document.getElementById('bd4').value==='Pear');
   ok(document.getElementById('rd2').getAttribute('checked')==='checked');

   BINDER.dataUpdateEvent({option:{truth:'true'}});

   ok(document.getElementById('cb1').value==='true');
   ok(document.getElementById('cb1').getAttribute('checked')==='checked');

});

test("Collection Replacement", function(){

  var items={items:[{name:'Tom'},{name:'Dick'},{name:'Larry'}]},
      items2={items:[{name:'Tom'},{name:'Richard'},{name:'Sally'}]},
      data1={data:['Anna','Elsa']};
  BINDER.dataUpdateEvent(items);

  ok(document.getElementById('bd7').textContent==='Larry');

  BINDER.dataUpdateEvent(items2);

  ok(document.getElementById('bd6').textContent==='Richard');
  ok(document.getElementById('bd7').textContent==='Sally');

  BINDER.dataUpdateEvent(data1);

  ok(document.getElementById('bd8').textContent==='Anna');
  ok(document.getElementById('bd9').textContent==='Elsa');



});

test("Complex Object / Complex HTML", function(){
  var data3= {
              panel1:{data:["A","B","C","D","E","F"], name:'Thing 1'},
              panel2:{data:["A","B","C","D","E","F"], name:"Thing 2"}
             }

  BINDER.dataUpdateEvent(data3);

  data3.panel2.data[4]="Q";
  data3.panel2.name="Thing Q";
  data3.panel2.href="/8"

  BINDER.dataUpdateEvent(data3);
  ok(document.getElementById('bd11').textContent==='Q');
  ok(document.getElementById('bd11').getAttribute('href')==='/8');

});

test("Show / Hide", function(){
  BINDER.dataUpdateEvent({person:{name:"Max",title:''}});
  ok(document.getElementById('p2').style.display==='inline');
  ok(document.getElementById('p1').style.display==='none');


  BINDER.dataUpdateEvent({character:{name:null,title:''}});
  ok(document.getElementById('p3').style.display==='block');

  BINDER.dataUpdateEvent({monster:{name:null,title:'Frank'}})

})

test("Entities", function(){
  BINDER.dataUpdateEvent({entity:{val:"&"}});

  ok(document.getElementById('bd10').textContent==='&');
  ok(document.getElementById('bd10').innerHTML==='&amp;');

});
