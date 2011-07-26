/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  createColumns: function(procedure) {
    var headers = procedure.get('cols');
    var grid = procedure.get('grid');

    headers.unshift("Procedure Name:");

    headers.forEach(function(header) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var col = CoreCircsim.store.createRecord(CoreCircsim.Column, {
        header: header
      }, id);
      grid.get('columns').pushObject(col);
    });
    
    return grid.get('columns');
  },

  createCells: function(procedure) {
    var grid = procedure.get('grid');
    var cols = grid.get('columns');
    var rows = procedure.get('rows');
    var firstColumn = cols.firstObject();
    
    // Setup first column
    rows.forEach(function(physiologicalVariable) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var cell = CoreCircsim.store.createRecord(CoreCircsim.Cell, { value: physiologicalVariable }, id);
      firstColumn.get('cells').pushObject(cell);        
    });
    
    // Fill out the rest of the columns
    cols.forEach(function(col) {
      if (cols.indexOf(col) !== 0) {
        for (var i=0; i < rows.length; i++) {
          var id = Math.random(Math.floor(Math.random() * 99999999));
          var cell = CoreCircsim.store.createRecord(CoreCircsim.Cell, {}, id);        
          col.get('cells').pushObject(cell);          
        }
      }
    });
    
   return procedure;   

  }
});
