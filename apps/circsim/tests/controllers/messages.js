/*globals Circsim*/
sc_require('controllers/messages');
sc_require('controllers/message');

var msgsController,msgController;
module("Messages Controller", {
  setup: function() {
    msgsController = Circsim.messagesController;
    msgController = Circsim.messageController;
  },

  teardown: function() {
    msgsController = null;
    msgController = null;
  }

});

// test('Circsim.messagesController.firstMessage()', function() {
// 
//   SC.run(function(){msgsController.set('content', [SC.Object.create({name: 'foo'}), SC.Object.create({name: 'bar'})]);});
//   
//   var c = msgController.get('content');
//   
//   debugger;
//     
//   equals(c.get('name'), 'foo', "sets up binding correctly");
//   
// });
