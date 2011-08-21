/*globals Circsim*/

Circsim.PVView = SC.View.extend({
    
  
    
    render: function(context){          
      var rows = Circsim.procedureController.get('rows');
      
      context.push('<option>');
      rows.forEach(function(row) {
        context.push('<select>'+row+'</select>');
      });        
      context.push('</option><button id="submitPV">Evaluate PV Selection</button>');      
    }
    
});
