/*globals Circsim */

Circsim.cellsController = SC.ArrayController.create({  
  
  contentBinding: "Circsim.columnController.selection",

  allCells: function() {
    var cols     = Circsim.procedureController.get('columns'),
        allCells = [];         
    cols.forEach(function(col) {
      var cells = col.get('cells');
      cells.forEach(function(cell) {
        allCells.pushObject(cell);
      });
    });
    return allCells;
  }.property().cacheable()
});
