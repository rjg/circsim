/*globals CoreCircsim*/

CoreCircsim.Procedure = SC.Record.extend({

  title: SC.Record.attr(String),
  introduction: SC.Record.attr(String),
  currentColumn: SC.Record.attr(Number),
  cols: SC.Record.attr(Array),
  rows: SC.Record.attr(Array),
  initialVariable: SC.Record.attr(Number),
  initialVariableDirection: SC.Record.attr(Number),
  
  key: SC.Record.attr(Array),
    
  remainingColumns: SC.Record.attr(Number, {
    defaultValue: 0
  }),
  isComplete: SC.Record.attr(Boolean, {
    defaultValue: false
  }),

  columns: SC.Record.toMany('CoreCircsim.Column', {
    isMaster: YES,
    inverse: 'procedure'
  }),
  
  answerKeys: SC.Record.toMany('CoreCircsim.AnswerKey', {
    isMaster: YES,
    inverse: 'procedure'
  })
  
  
  
    
});
