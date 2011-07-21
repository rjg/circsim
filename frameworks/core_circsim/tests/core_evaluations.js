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


