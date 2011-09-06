/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  createGrid: function(procedure){

    var columns = procedure.get('columns');

    // This is a check to now create more cols/cells if the procedure has already been created.
    if (columns.length()>0) {      
      return procedure;
    }
    

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
    
    cols.forEach(function(col) {
      for (var i=0; i < rows.length; i++) {
        var id = Math.random(Math.floor(Math.random() * 99999999));
        var cell = CoreCircsim.store.createRecord(CoreCircsim.Cell, {isEnabled: NO}, id);        
        col.get('cells').pushObject(cell);          
      }
    });
    
   return procedure;   
  },
  
  updateCell: function(cell){
    var isEnabled = cell.get('isEnabled');
    if (!isEnabled) return;
    
    var val    = cell.get('value'),
        newVal = "";
    switch (val) {
      case null: 
        newVal = 0;
        break;
      case 0: 
        newVal = 1;
        break;
      case 1: 
        newVal = 2;
        break;
      case 2: 
        newVal = 0;
        break;
      default:        
        break;
    }
    cell.set('value', newVal);
  },
  
  updateHighlighting: function(cells, highlights) {
    if (highlights) {
      highlights.forEach(function(i) {
        cells.objectAt(i).set('isHighlighted', true);
      });
    }else{
      cells.forEach(function(cell) {
        cell.set('isHighlighted', false);
      });
    }
  },
  
  setCellsToCorrectValues: function(cells, correctVals, col, rowLength, idxs){
    
    var vals = correctVals.slice(col*rowLength, (col+1)*rowLength);  
    idxs.forEach(function(i) {
      cells.objectAt(i).set('value', vals[i]);
    });
    
  },
  
  setPVToCorrect: function(procedure, cells){
    var pvIdx = procedure.get('initialVariable');
    var pvDirection = procedure.get('initialVariableDirection');
    var pvText = procedure.get('rows')[pvIdx];
    cells.objectAt(pvIdx).set('value', pvDirection);
  }

});
