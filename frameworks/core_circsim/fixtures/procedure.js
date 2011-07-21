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
  answerKey: [[0, 1, 2, 0, 2, 1, 1], [], []],
  initialVariable: 5,
  initialVariableDirection: 1,
  errorKeys: [{
    col: 0,
    key: [],
    errorMessage: 0
  }],
  errorMessages: []

}

];
