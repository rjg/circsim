/*globals Circsim */

Circsim.RowView = SC.View.extend({

  render: function(context){    
    var rows = Circsim.procedureController.get("content").get("rows");
      context.push('<ul id="grid-rows">');
      rows.forEach(function(h) {
        context.push("<li>");
        switch (h) {
          case "IS": 
            context.push('IS');
            break;
          case "CVP": 
            context.push('CVP');
            break;
          case "SV": 
            context.push('SV');
            break;
          case "HR": 
            context.push('HR');
            break;
          case "CO": 
            context.push('CO');
            break;
          case "Ra": 
            context.push('Ra');
            break;
          case "MAP": 
            context.push('MAP');
            break;
          default:
            context.push(h);
            break;
        }
        context.push("</li>");      
      });          
      context.push('</ul>');
  }

});
