/*globals Circsim*/

Circsim.CellView = SC.View.extend({
    
    render: function(context){    
      var cell = this.get('content'),      
          col  = cell.get('column');
      context.push('<span class="test">');
      context.push('<span style="position: absolute; left: 50%; top: 50%;">');
      context.push(col.get('header'));
      context.push('</span>');
      context.push('</span>');
      

    }
});
