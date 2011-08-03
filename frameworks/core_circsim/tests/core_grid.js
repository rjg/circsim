/*globals CoreCircsim*/
sc_require('core_grid');

// ..........................................................
// Initial Variable Selection
// 
var procedure, grid;

module("Core Grid", {
  setup: function() {
    procedure = CoreCircsim.store.createRecord(CoreCircsim.Procedure, {}, 1);
  },

  teardown: function() {
    CoreCircsim.store.destroyRecord(CoreCircsim.Procedure, 1);
  }

});

test('CoreCircsim.createColumns()', function() {

  procedure.set('cols', ["col1", "col2"]);
  
  CoreCircsim.createColumns(procedure);
  
  var cols = procedure.get('columns');
  
  equals(cols.length(), 3, "creates the correct number of columns based on the cols property of the procedure (+1 for the first column)");
  
  equals(cols.lastObject().get('header'), "col2", "The columns are named correctly.");
  
  equals(cols.firstObject().get('header'), "Procedure Name:", "The first column header is set as 'Procedure Name:'");
});

test('CoreCircsim.createCells()', function() {
  procedure.set('cols', ["col1", "col2"]);
  CoreCircsim.createColumns(procedure);
  
  procedure.set('rows', ["proc name 1", "proc name 2", "proc name 3"]);
  
  CoreCircsim.createCells(procedure);

  var firstCol = procedure.get('columns').firstObject();
  var secondCol = procedure.get('columns').objectAt(1);
    
  equals(firstCol.get('cells').firstObject().get("text"), 'proc name 1', 'Sets the first column cells based on the names supplied in procedure.get("rows")');
  
  equals(secondCol.get('cells').length(), 3, 'Creates the correct number of cells based on the names supplied in procedure.get("rows")');
  
  

});

