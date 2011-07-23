/*globals CoreCircsim*/
sc_require('core_evaluations');

// ..........................................................
// Tests for Evaluations
// 
var procedure;

module("Core Evaluations", {
  setup: function() {
    procedure = CoreCircsim.store.createRecord(CoreCircsim.Procedure, {
      cols: ["DR", "RR", "SS"],
      rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"]
    }, 1);
  },

  teardown: function() {
    CoreCircsim.store.destroyRecord(CoreCircsim.Procedure, 1);
  }
});

test('CoreCircsim.evaluateInitialVariableSelection()', function() {

  procedure.set('initialVariable', 5);

  var wrong = CoreCircsim.evaluateInitialVariableSelection(procedure, 4);
  var right = CoreCircsim.evaluateInitialVariableSelection(procedure, 5);

  ok(right, "Returns true when initial variable is correct");
  ok(!wrong, "Returns false when initial variable is incorrect");

});

test('CoreCircsim.evaluateInitialVariableDirection()', function() {

  procedure.set('initialVariableDirection', 0);

  var wrong = CoreCircsim.evaluateInitialVariableDirection(procedure, 1);
  var right = CoreCircsim.evaluateInitialVariableDirection(procedure, 0);

  ok(right, "Returns true when initial variable direction is correct");
  ok(!wrong, "Returns false when initial variable direction is incorrect");
});

test('Initial Variable Evaluations when NO initial variable exists', function() {

  procedure.set('initialVariable', -1);
  procedure.set('initialVariableDirection', -1);

  var correct = CoreCircsim.evaluateInitialVariableSelection(procedure, 4);
  var alsoCorrect = CoreCircsim.evaluateInitialVariableSelection(procedure, 5);
  var directionCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, 1);
  var directionAlsoCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, 0);

  ok(correct, "Handles situation where no initial variable changes...");
  ok(alsoCorrect, "Handles situation where no initial variable changes... Returns true no matter what");
  ok(directionCorrect, "Handles situation where no initial variable direction changes...");
  ok(directionAlsoCorrect, "Handles situation where no initial variable direction changes... Returns true no matter what");

});

test('CoreCircsim.evaluateRelationships()', function() {
  // Setup procedure
  procedure.set('relationshipKeys', [{
    equation: [4, 2, 3],
    errors: [[2, 1, 1], [2, 1, 0], [2, 0, 0]],
    errorMessage: "Err message 1"
  },
  {
    equation: [6, 4, 5],
    errors: [[2, 1, 1], [2, 1, 0], [0, 1, 0], [0, 2, 0]],
    errorMessage: "Err message 2"
  }]);

  var relationshipKeys = procedure.get('relationshipKeys');

  // Create fictitious student input
  var correctStudentInput = [0, 0, 1, 1, 1, 0, 1];
  var incorrectStudentInput1 = [0, 0, 1, 1, 2, 0, 2]; // Triggers first error message
  var incorrectStudentInput2 = [0, 0, 1, 1, 1, 0, 0]; // Triggers second error message
  var incorrectStudentInput3 = [0, 0, 1, 1, 2, 0, 0]; // Triggers both error messages
  var correct = CoreCircsim.evaluateRelationships(procedure, correctStudentInput);
  var incorrect1 = CoreCircsim.evaluateRelationships(procedure, incorrectStudentInput1);
  var incorrect2 = CoreCircsim.evaluateRelationships(procedure, incorrectStudentInput2);
  var incorrect3 = CoreCircsim.evaluateRelationships(procedure, incorrectStudentInput3);

  ok(correct, 'returns true when all relationships evaluate correctly');
  equals(incorrect1[0], 'Err message 1', 'returns correct error messages when all relationships DO NOT evaluate correctly');
  equals(incorrect2[0], 'Err message 2', 'returns correct error messages when all relationships DO NOT evaluate correctly');
  equals(incorrect3[0], 'Err message 1', 'returns correct error messages when all relationships DO NOT evaluate correctly');
  equals(incorrect3[1], 'Err message 2', 'returns correct error messages when all relationships DO NOT evaluate correctly');
});

test('CoreCircsim.evaluateProcedureSpecificErrors()', function() {
    
    procedure.set('answerKey', [[0, 1, 2, 0, 2, 1, 1], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]]);
    
    procedure.set("errorKeys", [{
      col: 0,
      key: [3, null, null, 0, null, null, null],
      message: 0
    }, {
      col: 0,
      key: [0, null, null, 3, null, null, null],
      message: 1      
    }]);

    procedure.set('errorMessages', ["Error message 0", "Error message 1", "Error message 2"]);
  
    var correct = CoreCircsim.evaluateProcedureSpecificErrors(procedure, 0, [0, 1, 2, 0, 2, 1, 1]);
    

    equals(correct, true, 'returns true if student input is correct.'); 
  
});