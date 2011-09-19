/*globals Circsim */

Circsim.RowView = SC.View.extend({

  render: function(context){    
    var rows = Circsim.procedureController.get("content").get("rows");
      context.push('<ul id="grid-rows">');
      rows.forEach(function(h) {
        context.push("<li>");
        switch (h) {
          case "IS": 
            context.push('<a href="#" rel="twipsy" data-original-title="Inotropic State">'+h+'</a>');
            break;
          case "CVP": 
            context.push('<a href="#" rel="twipsy" data-original-title="Central Venous Pressure">'+h+'</a>');
            break;
          case "SV": 
            context.push('<a href="#" rel="twipsy" data-original-title="Stroke Volume">'+h+'</a>');
            break;
          case "HR": 
            context.push('<a href="#" rel="twipsy" data-original-title="Heart Rate">'+h+'</a>');
            break;
          case "CO": 
            context.push('<a href="#" rel="twipsy" data-original-title="Cardiac Output">'+h+'</a>');
            break;
          case "Ra": 
            context.push('<a href="#" rel="twipsy" data-original-title="Arterial Resistance">'+h+'</a>');
            break;
          case "MAP": 
            context.push('<a href="#" rel="twipsy" data-original-title="Mean Arterial Pressure">'+h+'</a>');
            break;
          default:
            context.push(h);
            break;
        }
        context.push("</li>");      
      });          
      context.push('</ul>');
      $("#grid-rows a[rel=twipsy]").twipsy({live:true, placement: "left"});
  }

});
