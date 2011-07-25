/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {
  
  createColumns: function(procedure){
    var headers = procedure.get('cols');
    var grid = procedure.get('grid');
    
    headers.forEach(function(header) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var col = CoreCircsim.store.createRecord(CoreCircsim.Column, {header: header}, id);
      grid.get('columns').pushObject(col);
    });
  }

});
