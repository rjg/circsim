/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{
  // GUID Must be a unique string for each procedure!
  guid: '1',
  title: "Decrease Ra",
  isComplete: false,
  cols: ["DR", "RR", "SS"],
  rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
  initialVariable: 5,
  initialVariableDirection: 1,
  answerKeys: [1,2],
  relationshipKeys: [{
    equation: [4, 2, 3],
    errors: [[2, 1, 1], [2, 1, 0], [2, 0, 0], [2, 0, 1], [1, 2, 2], [1, 2, 0], [1, 0, 0], [1, 0, 2], [0, 2, 2], [0, 2, 0], [0, 1, 1], [0, 1, 0], [0, 0, 2], [0, 0, 1]],
    errorMessage: "Err message 1"
  },
  {
    equation: [6, 4, 5],
    errors: [[2, 1, 1], [2, 1, 0], [2, 0, 0], [2, 0, 1], [1, 2, 2], [1, 2, 0], [1, 0, 0], [1, 0, 2], [0, 2, 2], [0, 2, 0], [0, 1, 1], [0, 1, 0], [0, 0, 2], [0, 0, 1]],
    errorMessage: "Err message 2"
  }]
}];
