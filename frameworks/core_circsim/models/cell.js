/*globals CoreCircsim*/

CoreCircsim.Cell = SC.Record.extend({

  column: SC.Record.toOne('CoreCirsim.Column', {
    isMaster: NO
  })

});
