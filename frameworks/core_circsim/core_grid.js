/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  createGrid: function(procedure){
    procedure = this.createColumns(procedure);
    procedure = this.createCells(procedure);
    return procedure;
  },

  createColumns: function(procedure) {
    var headers = procedure.get('cols');

    headers.forEach(function(header) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var col = CoreCircsim.store.createRecord(CoreCircsim.Column, {
        header: header
      }, id);
      procedure.get('columns').pushObject(col);
    });
    
    return procedure;
  },

  createCells: function(procedure) {
    var cols = procedure.get('columns');
    var rows = procedure.get('rows');
    var firstColumn = cols.firstObject();
    
    // Setup first column
    rows.forEach(function(physiologicalVariable) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var cell = CoreCircsim.store.createRecord(CoreCircsim.Cell, { text: physiologicalVariable }, id);
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
