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

