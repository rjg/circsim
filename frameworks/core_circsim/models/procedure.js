/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  cols: SC.Record.attr(Array),
  rows: SC.Record.attr(Array),
  answerKey: SC.Record.attr(Array),
  errorKeys: SC.Record.attr(Array),
  errorMessages: SC.Record.attr(Array),
  initialVariable: SC.Record.attr(Number),
  initialVariableDirection: SC.Record.attr(Number),
  remainingColumns: SC.Record.attr(Number, {
    defaultValue: 0
  }),
  isComplete: SC.Record.attr(Boolean, {
    defaultValue: false
  }),

  grid: SC.Record.toOne('CoreCircsim.Grid')

});
