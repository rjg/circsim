/*globals CoreCircsim*/

CoreCircsim.AnswerKey = SC.Record.extend({
  
  highlights: SC.Record.attr(Array),
  category: SC.Record.attr(String),
  isCorrect: SC.Record.attr(Boolean),
  comment: SC.Record.attr(String),
  cells: SC.Record.attr(Array),
  cellValues: SC.Record.attr(Array),
  column: SC.Record.attr(Number),

  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })

});
