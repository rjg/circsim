/*globals Circsim*/

Circsim.GridHeaderView = SC.View.extend({
    
    render: function(context){    
      var headers = Circsim.procedureController.get("content").get("cols");
        context.push('<div id="grid-headers">');

        headers.forEach(function(h) {
        context.push('<div>');
          switch (h) {
            case "DR": 
              context.push('DR');
              break;
            case "RR": 
              context.push('RR');
              break;
            case "SS": 
              context.push('SS');
              break;
            default:
              context.push(h);
              break;
          }
        context.push('</div>');          
        });

        context.push('</div>');

    }
});
