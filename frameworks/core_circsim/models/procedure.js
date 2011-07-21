/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  isComplete: SC.Record.attr(Boolean),
  
  grid: SC.Record.toOne('CoreCircsim.Grid')

});
