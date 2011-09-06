/*globals Circsim */

Circsim.cellsController = SC.ArrayController.create({  
  
  colsBinding: "Circsim.procedureController.columns",

  allCells: function() {
    var cols     = this.get("cols"),
        allCells = [];         

    cols.forEach(function(col) {
      var cells = col.get('cells');
      cells.forEach(function(cell) {
        allCells.pushObject(cell);
      });
    });
    return allCells;
  }.property("cols").cacheable()
});
