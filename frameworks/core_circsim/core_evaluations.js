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

  evaluateRelationships: function(procedure, studentInput) {
    var keys, equationVars, errorKeys, message, num, comparisonValue, studentValues = [],
    evaluations = [],
    checkSheet = [];

    keys = procedure.get('relationshipKeys');

    keys.forEach(function(key) {
      equationVars = key.equation;
      errorKeys = key.errors;
      message = key.errorMessage;

      // Get student values at equation indices
      studentValues = [];
      equationVars.forEach(function(eq) {
        num = studentInput.objectAt(eq);
        studentValues.push(num);
      });

      // Compare student values to all error conditions
      errorKeys.forEach(function(er) {
        comparisonValue = SC.compare(studentValues, er);
        if (comparisonValue === 0) {
          evaluations.push(message);
        }
      });

    });

    return evaluations;

  },

  evaluateProcedureSpecificErrors: function(procedure, col, studentInput) {
    
    var key = procedure.get('answerKey')[col];
    var errorMessages = [];
    
    if (SC.compare(studentInput, key) === 0) return true; 
    
    return false;
  }
});
