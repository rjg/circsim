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

  // This method returns an array populated by CoreCircsim.AnswerKey objects.
  evaluateProcedureSpecificErrors: function(procedure, columnNumber, studentInput) {
    var keyMatches = [];
    var answerKeys = procedure.get('answerKeys').filterProperty("column", columnNumber);

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
