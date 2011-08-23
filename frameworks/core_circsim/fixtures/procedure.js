/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{
  // GUID Must be a unique string for each procedure!
  guid: '1',
  title: "Decrease Ra",
  introduction: "This is the introduction to the procedure.",
  instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur purus eget ipsum fermentum in mattis arcu hendrerit. Etiam ac nulla scelerisque eros facilisis tempus sit amet in erat. Nam sed nunc at ligula faucibus vehicula. Nunc nec elementum risus. Aenean venenatis congue faucibus. Ut et massa arcu. Curabitur turpis justo, aliquet et tristique a, tristique eu libero. Morbi euismod felis ut eros vestibulum in posuere dui auctor. Donec sapien enim, commodo non ornare nec, tempus quis lorem. Cras eget fermentum tortor. Donec sed quam nunc. Quisque dui tellus, sollicitudin vulputate bibendum vulputate, ornare ac massa. Praesent sit amet augue sit amet odio hendrerit auctor et sit amet metus. Cras eget ipsum id ante posuere rutrum. Nulla elementum nibh in ipsum pellentesque eget interdum tellus mollis. Mauris id ante at ante tempor aliquet. Vestibulum ut est velit, id ultricies odio. Integer auctor tristique pharetra.",
  isComplete: false,
  cols: ["DR", "RR", "SS"],
  rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
  initialVariable: 5,
  initialVariableDirection: 1,
  answerKeys: [1,2],
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

