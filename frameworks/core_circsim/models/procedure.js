/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  cols: SC.Record.attr(Array),
  rows: SC.Record.attr(Array),
  initialVariable: SC.Record.attr(Number),
  initialVariableDirection: SC.Record.attr(Number),  
  remainingColumns: SC.Record.attr(Number, {
    defaultValue: 0
  }),
  isComplete: SC.Record.attr(Boolean, {
    defaultValue: false
  }),

  columns: SC.Record.toMany('CoreCircsim.Column', {
    isMaster: YES,
    inverse: 'procedure'
  })
    
});
