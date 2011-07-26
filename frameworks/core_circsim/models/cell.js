/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({
  
  value: SC.Record.attr(String),
  
  column: SC.Record.toOne('CoreCircsim.Column', {
    isMaster: NO
  })

});
