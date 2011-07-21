/*globals CoreCircsim*/

CoreCircsim.Grid = SC.Record.extend({

  column: SC.Record.toMany('CoreCircsim.Column', {
    isMaster: YES,
    inverse: 'grid'
  }),

  procedure: SC.Record.toOne('CoreCircsim.Procedure')

});
