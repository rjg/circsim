/*globals Circsim*/

Circsim.GridHeaderView = SC.View.extend({
    
    render: function(context){    
      var headers = Circsim.procedureController.get("content").get("cols");
        context.push('<div id="grid-headers">');
        headers.forEach(function(h) {
          context.push('<div>'+h+'</div>');
        });          
        context.push('</div>');
        

    }
});
