/*globals CoreCircsim*/

CoreCircsim.Column = SC.Record.extend({

  title: SC.Record.attr(String),

  cells: SC.Record.toMany('CoreCircsim.Cell', {
    isMaster: YES,
    inverse: 'column'
  }),

  grid: SC.Record.toOne('CoreCircsim.Grid', {
    isMaster: NO
  })

});
