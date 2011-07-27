/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  
  text: SC.Record.attr(String),
  value: SC.Record.attr(String),
  isHighlighted: SC.Record.attr(Boolean),
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })

});
