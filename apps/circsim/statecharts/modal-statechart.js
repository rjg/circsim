/*globals Circsim CoreCircsim*/

Circsim.mixin({
  modalStates: SC.State.design({ initialSubstate: 'NoModal',
    'NoModal': SC.State.design({
      enterState: function(attribute) {
      },

      toggleSchematic: function() {
        this.gotoState('Schematic');
      }, 

      toggleHelp: function() {
        this.gotoState('Help');
      }
    }), 

    'Schematic': SC.State.design({
      enterState: function() {
        var modal = Circsim.modalsPage.get('schematicView');  
        this._modal = modal;
        modal.append();
      }, 

      toggleSchematic: function() {
        this.gotoState('NoModal');
      }, 

      toggleHelp: function() {
        this.gotoState('Help');
      }, 

      exitState: function() {
        var modal = this._modal;
        modal.remove();
      }
    }), 

    'Help': SC.State.design({
      enterState: function() {
        var modal = Circsim.modalsPage.get('helpView');  
        this._modal = modal;
        modal.append();
      }, 

      toggleSchematic: function() {
        this.gotoState('Schematic');
      }, 

      toggleHelp: function() {
        this.gotoState('NoModal');
      }, 
      
      exitState: function() {
        var modal = this._modal;
        modal.remove();
      }
    })
  })
});
