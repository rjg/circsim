/*globals Circsim*/

Circsim.ProcedureMessagesView = SC.View.extend({
    
    render: function(context){    
      var message = this.get('message');
      context.push(
        '<p>',
        ''+message+'',
        '</p>'
      );
    }
});








