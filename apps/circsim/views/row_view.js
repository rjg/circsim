/*globals Circsim */

Circsim.RowView = SC.View.extend({

  render: function(context){    
    var rows = Circsim.procedureController.get("content").get("rows");
      context.push('<ul id="grid-rows">');
      rows.forEach(function(h) {
        context.push('<li>'+h+'</li>');
      });          
      context.push('</ul>');
  }

});
