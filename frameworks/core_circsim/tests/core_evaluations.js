/*globals CoreCircsim*/
sc_require('core_evaluations');

// ..........................................................
// Tests for Evaluations
// 
var procedure;

module("Initial Variable and Relationship Evaluations", {
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
  procedure.set('relationshipEvaluations', [{
    equation: [4, 2, 3],
    errorMessage: "Err message 1"
  },
  {
    equation: [6, 4, 5],
    errorMessage: "Err message 2"
  }]);

  var relationshipKeys = procedure.get('relationshipEvaluations');

  // Create fictitious student input
  var correctStudentInput    = [0, 0, 1, 1, 1, 0, 1];
  var incorrectStudentInput1 = [0, 0, 1, 1, 2, 0, 2]; // Triggers first error message
  var incorrectStudentInput2 = [0, 0, 1, 1, 1, 0, 0]; // Triggers second error message
  var nullValues             = [null,null,null,null,null,null,null];
  var correct                = CoreCircsim.evaluateRelationships(procedure.get('relationshipEvaluations')[0], correctStudentInput);
  var incorrect1             = CoreCircsim.evaluateRelationships(procedure.get('relationshipEvaluations')[0], incorrectStudentInput1);
  var incorrect2             = CoreCircsim.evaluateRelationships(procedure.get('relationshipEvaluations')[1], incorrectStudentInput2);
  var nullVals               = CoreCircsim.evaluateRelationships(procedure.get('relationshipEvaluations')[0], nullValues);

  ok(!correct, 'returns false when all relationships evaluate correctly');
  ok(!correct, 'returns false when null values are given.');
  equals(incorrect1, 'Err message 1', 'returns correct error messages when all relationships DO NOT evaluate correctly');
  equals(incorrect2, 'Err message 2', 'returns correct error messages when all relationships DO NOT evaluate correctly');
});

module("Procedure Specific Evaluations", {
  setup: function() {
    procedure = CoreCircsim.store.createRecord(CoreCircsim.Procedure, {
      cols: ["DR", "RR", "SS"],
      rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"]
    }, 1);
        
    // TODO: refactor this... has to be a better way...
    var answerKeys = [{
      highlights: [0,1],
      category: "Category 1",
      isCorrect: YES,
      comment: "Correct Message",
      cells: [0,1],
      cellValues: [0,0],
      column: 0,
      id: 1
    },  {
      highlights: [0,1],
      category: "Category 1",
      isCorrect: NO,
      comment: "Explanation of incorrect answer.",
      cells: [0],
      cellValues: [3],
      column: 0,
      id: 2
    },  {
      highlights: [0,1],
      category: "Category 1",
      isCorrect: NO,
      comment: "Another explanation of incorrect answer.",
      cells: [1],
      cellValues: [1],
      column: 0,
      id: 3
    },  {
      highlights: [0,1],
      category: "Category 1",
      isCorrect: NO,
      comment: "Another explanation of incorrect answer.",
      cells: [1],
      cellValues: [2],
      column: 0,
      id: 4
    }];
        
    answerKeys.forEach(function(k) {
      var key = CoreCircsim.store.createRecord(CoreCircsim.AnswerKey, {
        highlights: k["highlights"],
        category: k["category"],
        isCorrect: k["isCorrect"],
        comment: k["comment"],
        cells: k["cells"],
        cellValues: k["cellValues"],
        column: k["column"]
      }, k["id"]);      
      procedure.get('answerKeys').pushObject(key);
    });
  },

  teardown: function() {
    CoreCircsim.store.destroyRecord(CoreCircsim.Procedure, 1);
    [1, 2, 3, 4].forEach(function(i) {
      CoreCircsim.store.destroyRecord(CoreCircsim.AnswerKey, i);
    });
  }
});

test('CoreCircsim.evaluateProcedureSpecificErrors()', function() {
  var column = procedure.get('columns').firstObject();
  var aone = procedure.get('answerKeys').firstObject();
  var atwo = procedure.get('answerKeys').objectAt(1);
  var athree = procedure.get('answerKeys').objectAt(2);
  var afour = procedure.get('answerKeys').objectAt(3);
  
  [
    [[0,0, 0,0,0,0,0], [aone]],
    [[1,0, 0,0,0,0,0], [atwo]],
    [[0,1, 0,0,0,0,0], [athree]],
    [[0,2, 0,0,0,0,0], [afour]],
    [[1,1, 0,0,0,0,0], [atwo, athree]]
  ].forEach(function(n) {    
    var a = CoreCircsim.evaluateProcedureSpecificErrors(procedure, 0, n[0]);
    ok(SC.compare(a, n[1]) === 0, "Displays the correct message when there is a match: [" + n[0]+"]");
  });
  
  var noMatches = CoreCircsim.evaluateProcedureSpecificErrors(procedure, 0, [0, null, null, null, null, null, null]);
  var wrongNumberOfAnswers = CoreCircsim.evaluateProcedureSpecificErrors(procedure, 0, [null]);
  var noAnswerKeys = CoreCircsim.evaluateProcedureSpecificErrors(procedure, 1, [0,0,0,0,0,0,0]);
    
  debugger;

  ok(SC.compare(noMatches,[]) === 0, "returns empty array if there are no matches (TODO: handle this situation)");
  ok(SC.compare(wrongNumberOfAnswers,[]) === 0, "returns empty array if studentInput has wrong number of answers (TODO: handle this situation)");
  ok(SC.compare(noAnswerKeys,[]) === 0, "returns empty array if there are no keys for that column. (TODO: handle this situation)");
});

test('CoreCircsim.compareStudentInputWithKey(key, isCorrect, student)', function() {
  //////
  // isCorrect == true.  This means an AND evaluation is applied
  //
  var noNotKeysMatch    = CoreCircsim.compareStudentInputWithKey([0,0,0], true, [0,0,0]);
  var noNotKeysNonMatch = CoreCircsim.compareStudentInputWithKey([0,0,0], true, [1,0,0]);
  ok(noNotKeysMatch, "0 'Not' keys, Match");
  ok(!noNotKeysNonMatch, "0 'Not' keys, Nonmatch");
 
  // You can use 'not' conditions in correct answer keys
  var oneNotKeyMatch    = CoreCircsim.compareStudentInputWithKey([0,3,0], true, [0,1,0]);
  var oneNotKeyMatch2   = CoreCircsim.compareStudentInputWithKey([0,3,0], true, [0,2,0]);
  var oneNotKeyNonMatch = CoreCircsim.compareStudentInputWithKey([0,3,0], true, [0,0,0]);
  ok(oneNotKeyMatch, "1 'Not' keys, Match");
  ok(oneNotKeyMatch2, "1 'Not' keys, Match 2");
  ok(!oneNotKeyNonMatch, "1 'Not' keys, Nonmatch");
  
  // Two 'not' keys
  [
    [[0,3,4],[0,1,0]],
    [[0,3,4],[0,1,2]],
    [[0,3,4],[0,2,0]],
    [[0,3,4],[0,2,2]]
  ].forEach(function(n) {
    ok(CoreCircsim.compareStudentInputWithKey(n[0], true, n[1]), "2 'Not' keys, Matches");
  });

  [
    [[0,3,4],[0,0,0]],
    [[0,3,4],[0,0,2]],
    [[0,3,4],[0,1,1]],
    [[0,3,4],[0,2,1]],            
    [[0,3,4],[1,0,0]],
    [[0,3,4],[2,0,0]]    
  ].forEach(function(n) {
    ok(!CoreCircsim.compareStudentInputWithKey(n[0], true, n[1]), "2 'Not' keys, NonMatches");
  });
});

test('CoreCircsim.compareStudentInputWithKey(key, !isCorrect, student)', function() {
  //////
  // isCorrect == false.  This means an OR evaluation is applied
  //
  // simple matches
  [0,1,2].forEach(function(n) {
    ok(CoreCircsim.compareStudentInputWithKey([n], false, [n]), "simple match: "+n);
  });
  
  // simple non-matches
  [0,1,2].forEach(function(n) {
    ok(!CoreCircsim.compareStudentInputWithKey([n], false, [n+1]), "simple non-match: "+n);
  });

  // simple 'Not' keys
  // 3 = not 0 
  // 4 = not 1
  // 5 = not 2
  ok(CoreCircsim.compareStudentInputWithKey([3], false, [8]), "Not keys 1")
  ok(CoreCircsim.compareStudentInputWithKey([4], false, [8]), "Not keys 2")
  ok(CoreCircsim.compareStudentInputWithKey([5], false, [8]), "Not keys 3")

  ok(!CoreCircsim.compareStudentInputWithKey([3], false, [0]), "Not keys 4")
  ok(!CoreCircsim.compareStudentInputWithKey([4], false, [1]), "Not keys 5")
  ok(!CoreCircsim.compareStudentInputWithKey([5], false, [2]), "Not keys 6")

  // Testing the OR function
  ok(CoreCircsim.compareStudentInputWithKey([0,0],false,[1,0]), "Testing the OR function1")
  ok(CoreCircsim.compareStudentInputWithKey([0,0],false,[0,0]), "Testing the OR function2")
  ok(CoreCircsim.compareStudentInputWithKey([0,0],false,[0,1]), "Testing the OR function3")
  ok(!CoreCircsim.compareStudentInputWithKey([0,0],false,[1,1]), "Testing the OR function non-match")

  // Testing the OR function with 'not' values
  ok(CoreCircsim.compareStudentInputWithKey([3,3],false,[1,0]), "Testing the OR function5")
  ok(CoreCircsim.compareStudentInputWithKey([3,3],false,[1,1]), "Testing the OR function6")
  ok(CoreCircsim.compareStudentInputWithKey([3,3],false,[0,1]), "Testing the OR function7")
  ok(!CoreCircsim.compareStudentInputWithKey([3,3],false,[0,0]), "Testing the OR function non-match")
});
