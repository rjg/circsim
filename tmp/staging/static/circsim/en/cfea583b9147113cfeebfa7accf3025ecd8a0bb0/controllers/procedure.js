/*globals Circsim */

Circsim.procedureController = SC.ObjectController.create({
  contentBinding: SC.Binding.single('Circsim.proceduresController.selection'),
  
  currentPV: function(){
    var rows = this.get('content').get('rows');
    var idx = this.get('content').get('initialVariable');
    
    return rows[idx];
  }.property('content')
});
