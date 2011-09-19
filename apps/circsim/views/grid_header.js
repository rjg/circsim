/*globals Circsim*/

Circsim.GridHeaderView = SC.View.extend({
    
    render: function(context){    
      var headers = Circsim.procedureController.get("content").get("cols");
        context.push('<div id="grid-headers">');

        headers.forEach(function(h) {
        context.push('<div>');
          switch (h) {
            case "DR": 
              context.push('<a href="#" rel="twipsy" data-original-title="Direct Response">'+h+'</a>');
              break;
            case "RR": 
              context.push('<a href="#" rel="twipsy" data-original-title="Reflex Response">'+h+'</a>');
              break;
            case "SS": 
              context.push('<a href="#" rel="twipsy" data-original-title="Steady State">'+h+'</a>');
              break;
            default:
              context.push(h);
              break;
          }
        context.push('</div>');          
        });

        context.push('</div>');
        $("#grid-headers a[rel=twipsy]").twipsy({live:true, placement: "above"});        

    }
});
