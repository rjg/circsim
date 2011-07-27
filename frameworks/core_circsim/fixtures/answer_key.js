/*globals CoreCircsim */

sc_require('models/answer_key');

CoreCircsim.AnswerKey.FIXTURES = [{   
  guid: 1, 
  procedure: 1, // Which procedure this answer key belongs to.
  column: 0, // Which column number these are relevant to.  In this case, DR, the first column.
  highlights: [0,3], // These are the cells we want to highlight when presenting the summaries...
  cells: [0,3], // This array represents the rows that we want to compare.  The numbers are indices of the rows, so in this case, the first and fourth row... (IS & HR)
  cellValues: [0,0], // This array represents the values that we want in those rows... 
  isCorrect: YES, // Is this is correct or incorrect answer? (For display purposes)
  category: "Neural Variables", 
  comment: "Right!  IS and HR are both controlled by the nervous system (they’re neural variables).  By definition, the DR interval occurs BEFORE any changes in neural firing occurs.  So, there are no changes to these two variables."
},
{  
  guid: 2,
  procedure: 1,
  column: 0,
  highlights: [0,3],
  cells: [0,3],
  cellValues: [3,0],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No, IS and HR are physiologically determined by neural inputs.  Since DR is the interval before there are any changing in the neural signals, there can be no change in IS."
}];
