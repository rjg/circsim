/*globals Circsim*/

Circsim.ToolbarView = SC.View.extend({
    
    render: function(context){          
      var iconUrl = this.get('iconUrl');
      context.push(
        '  <div id="logo-image"></div>',
        '  <div id="circsim-title">',
        '    Circsim',
        '  </div>'
      );
    }
});
