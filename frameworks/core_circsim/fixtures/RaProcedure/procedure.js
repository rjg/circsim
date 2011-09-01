/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{  
  guid: 'Ra', // GUID Must be a unique string for each procedure!
  title: "Decrease Ra",
  introduction: "In this experiment we will decrease arterial resistance, Ra, by 50%. This might be accomplished pharmacologically with a drug that causes arteriolar dilatation.",
  instructions: "Instructions go here.",
  isComplete: false,
  cols: ["DR", "RR", "SS"],
  rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
  key: [0,1,2,0,2,1,1,2,1,1,2,2,2,2,2,1,1,2,2,1,1],
  initialVariable: 5,
  initialVariableDirection: 1,
  answerKeys: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,21,32,33,34,35,36,37],
  relationshipEvaluations: [{
    equation: [4, 2, 3],
    intro: "You will now be evaluated for CO=SVxHR",
    errorMessage: "Your CO=SVxHR is wrong. Please fix it.",
    summaryCorrectMessage: "CO=SVxHR correct",
    summaryIncorrectMessage: "CO=SVxHR incorrect"
  },
  {
    equation: [6, 4, 5],
    intro: "You will now be evaluated for MAP",
    errorMessage: "Your MAP is wrong 2. please fix it.",
    summaryCorrectMessage: "MAP correct",
    summaryIncorrectMessage: "MAP incorrect"
  }]
}];

