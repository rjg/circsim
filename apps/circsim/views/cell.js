/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  
  contentDisplayProperties: "value isHighlighted isEnabled".w(),
  
  render: function(context, f) {
    var content         = this.get('content'),
        isHighlighted   = content.get('isHighlighted'),
        value           = content.get('value'),
        column          = content.get('column').get('header'),
        isEnabled       = content.get('isEnabled');
        
        var enabled  = isEnabled;
        var disabled = !isEnabled;
        var classes = { 'enabled': enabled, 'disabled': disabled };
        
        var highlighted = highlighted; 
        var unhighlighted = !highlighted; 
        var highlightClasses = {'highlighted': highlighted};
      
        switch (value) {
          case 0: 
            value = "<img src="+sc_static("no-change")+" />";
            break;
          case 1: 
            value = "<img src="+sc_static("down")+" />";
            break;
          case 2: 
            value = "<img src="+sc_static("up")+" />";
            break;
          default:
            value = "";
            break;
        }
      
        
    // Render the html
    context.setClass(classes);
    context.push('<span class="cell-value">'+value+'</span>');   
  }

});
