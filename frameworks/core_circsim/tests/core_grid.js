/*globals CoreCircsim*/
sc_require('core_grid');

// ..........................................................
// Initial Variable Selection
// 
var procedure, grid;

module("Core Grid", {
  setup: function() {
    procedure = CoreCircsim.store.createRecord(CoreCircsim.Procedure, {}, 1);
    grid = CoreCircsim.store.createRecord(CoreCircsim.Grid, {}, 1);
    procedure.set('grid', grid);
    grid.set('procedure', procedure);
  },

  teardown: function() {
    [CoreCircsim.Procedure, CoreCircsim.Grid].forEach(function(model) {
      CoreCircsim.store.destroyRecord(model, 1);
    });
  }

});

test('CoreCircsim.createColumns()', function() {

  procedure.set('cols', ["col1", "col2"]);
  
  CoreCircsim.createColumns(procedure);
  
  equals(grid.get('columns').length(), 2, "creates the correct number of columns based on the cols property of the procedure");
  
  equals(grid.get('columns').firstObject().get('header'), "col1", "The column is named correctly.");
  
});
