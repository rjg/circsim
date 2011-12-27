/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  value: SC.Record.attr(Number, {defaultValue: null}),
  isHighlighted: SC.Record.attr(Boolean),
  isEnabled: SC.Record.attr(Boolean),
  correctAnswer: SC.Record.attr(Number),
  displayCorrectAnswer: SC.Record.attr(Boolean),
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })
});
