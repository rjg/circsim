
/*globals Circsim */

Circsim.progressController = SC.ObjectController.create({
  content: 25,

  progressVal: function(){
    var v = this.get('content')+1;
    if (v>=98){
      this.set('content', 0);
      return;
    } else {
      this.set('content', v)
    }
   
    this.invokeLater(Circsim.progressController.progressVal, 10);
  }
});
