/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  evaluateInitialVariableSelection: function(procedure, studentSelection) {
    var correctAnswer = procedure.get('initialVariable');
    if (studentSelection == correctAnswer) {
      return true;
    } else {
      return false;
    }
  }

});
