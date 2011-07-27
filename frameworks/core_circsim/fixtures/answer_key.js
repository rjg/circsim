/*globals CoreCircsim */

sc_require('models/answer_key');

CoreCircsim.AnswerKey.FIXTURES = [{   
  guid: 1,
  column: 0,
  highlights: [0,3],
  cells: [0,3],
  cellValues: [0,0],  
  isCorrect: YES,
  category: "Neural Variables",
  comment: "Right!  IS and HR are both controlled by the nervous system (they’re neural variables).  By definition, the DR interval occurs BEFORE any changes in neural firing occurs.  So, there are no changes to these two variables."
},
{
  guid: 2,
  column: 0,
  highlights: [0,3],
  cells: [0,3],
  cellValues: [3,0],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No, IS and HR are physiologically determined by neural inputs.  Since DR is the interval before there are any changing in the neural signals, there can be no change in IS."
}];
