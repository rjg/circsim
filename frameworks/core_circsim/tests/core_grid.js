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
  
  equals(cols.length(), 2, "creates the correct number of columns based on the cols property of the procedure");
  
  equals(cols.lastObject().get('header'), "col2", "The columns are named correctly.");
  
  equals(cols.firstObject().get('header'), "col1", "The first column header is set as 'Procedure Name:'");
});

test('CoreCircsim.createCells()', function() {
  procedure.set('cols', ["col1", "col2"]);
  CoreCircsim.createColumns(procedure);
  
  procedure.set('rows', ["var 1", "var 2", "var 3"]);
  
  CoreCircsim.createCells(procedure);

  var firstCol = procedure.get('columns').firstObject();
  var secondCol = procedure.get('columns').objectAt(1);
    
  ok(SC.compare(firstCol.get('cells').firstObject().get("value"), null) === 0, 'Creates the first column and sets value to null');  
  equals(secondCol.get('cells').length(), 3, 'Creates the correct number of cells based on the names supplied in procedure.get("rows")');
  
  

});

