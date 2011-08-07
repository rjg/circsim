/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{
  // GUID Must be a unique string for each procedure!
  guid: '1',
  title: "Decrease Ra",
  introduction: "This is the introduction to the procedure.",
  isComplete: false,
  cols: ["DR", "RR", "SS"],
  rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
  initialVariable: 5,
  initialVariableDirection: 1,
  answerKeys: [1,2],
  relationshipEvaluationIntro: "You will now be evaluated for your relationship accuracy.",  
  relationshipEvaluations: [{
    equation: [4, 2, 3],
    errorMessage: "Err message 1",
    isComplete: false
  },
  {
    equation: [6, 4, 5],
    errorMessage: "Err message 2",
    isComplete: false
  }]
}];

