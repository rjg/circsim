/*globals Circsim*/

Circsim.ToolbarView = SC.View.extend({
    
    render: function(context){          
      var iconUrl = this.get('iconUrl');
      context.push(
        '  <div id="logo-image"></div>',
        '  <div id="circsim-title">',
        '    Circsim',
        '  </div>',
        '  <a href="#" data-controls-modal="help-modal" class="btn" id="help-button"><img src="'+iconUrl+'">Help</a>',
        '<div id="help-modal" class="modal hide fade" style="display: block; ">',
        '  <div class="modal-header">',
        '    <a href="#" class="close">×</a>',
        '    <h3>Circsim Help</h3>',
        '  </div>',
        '  <div class="modal-body">',
        '    <p>Each of the "experiments" in this exercise illustrates some important principle which will help you to understand the circulatory system as a closed system with interacting parts.</p>',
        '    <p>To proceed through the program watch for the instructions on the right of the screen.</p>',
        '    <p></p>',
        '  </div>',
        '  <div class="modal-footer">',
        '  </div>',
        '</div>'
      );
    }
});
