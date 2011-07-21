/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  isComplete: SC.Record.attr(Boolean, {
    defaultValue: false
  }),

  grid: SC.Record.toOne('CoreCircsim.Grid')

});
