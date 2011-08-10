/*globals Circsim */

Circsim.drController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(0);
  }.property()

});

Circsim.rrController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(1);
  }.property()

});

Circsim.ssController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(2);
  }.property()

});
