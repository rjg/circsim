/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  
  value: SC.Record.attr(String),
  isHighlighted: SC.Record.attr(Boolean),
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })

});
