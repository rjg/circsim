/*globals Circsim*/

Circsim.ToolbarView = SC.View.extend({
    
    render: function(context){    
      var helpDisplay = this.get('helpDisplay');
      var iconUrl = this.get('iconUrl');
      context.push(
        '  <div id="logo-image"></div>',
        '  <div id="circsim-title">',
        '    Circsim',
        '  </div>',
        '  <div id="help-button" style="'+helpDisplay+'">',
        '    <div class="img"><img src="'+iconUrl+'" width="16" height="16" alt="Help"></div>',
        '    <div class="left"></div>',
        '    <div class="middle"></div>',
        '    <div class="right"></div>',
        '    <label>Help</label> ',
        '  </div>'     
      );
    },
    
    click: function(evt){      
      var target = evt.target,
          id     = target.id;
      while(!id) {
        target = target.parentElement; 
        id     = target.id;
      }
      if (id == "help-button") {
        Circsim.statechart.sendEvent('openHelp');
      }
    }
});
