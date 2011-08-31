/* >>>>>>>>>> BEGIN source/core.js */
/*globals CoreCircsim*/

CoreCircsim = SC.Object.create({

  store: SC.Store.create().from(SC.Record.fixtures)

});

/* >>>>>>>>>> BEGIN source/core_api.js */
/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {
  


});

/* >>>>>>>>>> BEGIN source/core_evaluations.js */
/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  evaluateInitialVariableSelection: function(procedure, studentSelection) {
    var correctAnswer = procedure.get('initialVariable');
    if (correctAnswer === -1) return true;
    return studentSelection == correctAnswer ? true: false;
  },

  evaluateInitialVariableDirection: function(procedure, studentSelection) {
    var correctAnswer = procedure.get('initialVariableDirection');
    if (correctAnswer === -1) return true;
    return studentSelection == correctAnswer ? true: false;
  },

  evaluateRelationships: function(relationshipEvaluation, studentInput) {
    var keys, equationVars, errorKeys, message, num, comparisonValue, studentValues = [],
        evaluations = [];

      equationVars = relationshipEvaluation.equation;
      errorKeys = [[2,1,1], [2,1,0], [2,0,0], [2,0,1], [1,2,2], [1,2,0], [1,0,0], [1,0,2], [0,2,2], [0,2,0], [0,1,1], [0,1,0], [0,0,2], [0,0,1]];
      message = relationshipEvaluation.errorMessage;

      // Get student values at equation indices
      studentValues = [];
      equationVars.forEach(function(eq) {
        num = studentInput.objectAt(eq);
        studentValues.push(num);
      });
      
      errorKeys.forEach(function(k){
        if (SC.compare(k, studentValues)===0) {
          evaluations.push(message);
        }
      });
      
      return SC.compare(evaluations, []) === 0 ? false : message;
  
  },

  // This method returns an array populated by CoreCircsim.AnswerKey objects.
  evaluateProcedureSpecificErrors: function(procedure, columnNumber, studentInput) {
    var keyMatches = [];    
    var answerKeys = procedure.get('answerKeys').filterProperty('column', columnNumber);
    
    function getStudentInput(indices, studentInput) {
      var arr = [];
      indices.forEach(function(i) {
        arr.push(studentInput[i]);
      });
      return arr;
    }

    answerKeys.forEach(function(answerKey) {
      keyMatches.push(answerKey);
      var key = answerKey.get('cellValues');
      var indices = answerKey.get('cells');
      var student = getStudentInput(indices, studentInput);

      if (CoreCircsim.compareStudentInputWithKey(key, student) === false) keyMatches.removeObject(answerKey);
    });

    return keyMatches;
  },

  // This returns true or false based on whether it's a match
  compareStudentInputWithKey: function(key, student) {
    var returnVal = true;
    for (var i = 0; i < key.length; i++) {
      var k = key[i];
      var s = student[i];
      if (k == 3) {
        if (SC.compare(0, s) === 0) {
          returnVal = false;
          break;
        }
      } else if (k == 4) {
        if (SC.compare(1, s) === 0) {
          returnVal = false;
          break;
        }
      } else if (k == 5) {
        if (SC.compare(2, s) === 0) {
          returnVal = false;
          break;
        }
      } else {
        if (SC.compare(k, s) !== 0) {
          returnVal = false;
          break;
        }
      }
    }
    return returnVal;
  }

});

/* >>>>>>>>>> BEGIN source/core_grid.js */
/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  createGrid: function(procedure){
    var ids,    
        columns = procedure.get('columns');

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
    console.log(vals);
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

/* >>>>>>>>>> BEGIN source/models/answer_key.js */
/*globals CoreCircsim*/

CoreCircsim.AnswerKey = SC.Record.extend({
  
  highlights: SC.Record.attr(Array),
  category: SC.Record.attr(String),
  isCorrect: SC.Record.attr(Boolean),
  comment: SC.Record.attr(String),
  cells: SC.Record.attr(Array),
  cellValues: SC.Record.attr(Array),
  column: SC.Record.attr(Number),

  procedure: SC.Record.toOne('CoreCircsim.Procedure', {
    isMaster: NO
  })

});

/* >>>>>>>>>> BEGIN source/models/cell.js */
/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  
  value: SC.Record.attr(Number, {defaultValue: null}),
  isHighlighted: SC.Record.attr(Boolean),
  isEnabled: SC.Record.attr(Boolean),
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })

});

/* >>>>>>>>>> BEGIN source/models/column.js */
/*globals CoreCircsim*/

CoreCircsim.Column = SC.Record.extend({

  header: SC.Record.attr(String),

  cells: SC.Record.toMany('CoreCircsim.Cell', {
    isMaster: YES,
    inverse: 'column'
  }),

  procedure: SC.Record.toOne('CoreCircsim.Procedure', {
    isMaster: NO
  }),
  
  answerKeys: SC.Record.toMany('CoreCircsim.AnswerKey', {
    isMaster: YES,
    inverse: 'column'
  })
  

});

/* >>>>>>>>>> BEGIN source/models/procedure.js */
/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  introduction: SC.Record.attr(String),
  currentColumn: SC.Record.attr(Number),
  cols: SC.Record.attr(Array),
  rows: SC.Record.attr(Array),
  initialVariable: SC.Record.attr(Number),
  initialVariableDirection: SC.Record.attr(Number),
  
  key: [0,1,2,0,2,1,1,2,1,1,2,2,2,2,2,1,1,2,2,1,1],
    
  remainingColumns: SC.Record.attr(Number, {
    defaultValue: 0
  }),
  isComplete: SC.Record.attr(Boolean, {
    defaultValue: false
  }),

  columns: SC.Record.toMany('CoreCircsim.Column', {
    isMaster: YES,
    inverse: 'procedure'
  }),
  
  answerKeys: SC.Record.toMany('CoreCircsim.AnswerKey', {
    isMaster: YES,
    inverse: 'procedure'
  })
  
  
  
    
});

