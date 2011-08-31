/*globals CoreCircsim*/

CoreCircsim.Column = SC.Record.extend({

  header: SC.Record.attr(String),

  cells: SC.Record.toMany('CoreCircsim.Cell', {
    isMaster: YES,
    inverse: 'column'
  }),

  procedure: SC.Record.toOne('CoreCircsim.Procedure', {
    isMaster: NO
  }),
  
  answerKeys: SC.Record.toMany('CoreCircsim.AnswerKey', {
    isMaster: YES,
    inverse: 'column'
  })
  

});
