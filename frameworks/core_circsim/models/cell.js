/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  value: SC.Record.attr(Number, {defaultValue: null}),
  isHighlighted: SC.Record.attr(Boolean),
  isEnabled: SC.Record.attr(Boolean),
  correctAnswer: SC.Record.attr(Number),
  displayCorrectAnswer: SC.Record.attr(Boolean),
  highlightRECorrect: SC.Record.attr(Boolean, {defaultValue: false}), 
  highlightREIncorrect: SC.Record.attr(Boolean, {defaultValue: false}), 
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })
});
