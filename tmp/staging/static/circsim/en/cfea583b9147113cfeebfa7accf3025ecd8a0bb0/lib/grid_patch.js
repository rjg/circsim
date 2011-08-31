SC.GridView.prototype.mixin({

  contentIndexesInRect: function(rect) {
    var rowHeight = this.get('rowHeight') || 48 ,
        content = this.get('content'),
        count = (content) ? content.get('length') : 0,
        frameWidth = this.get('clippingFrame').width,
        itemsPerRow = this.get('itemsPerRow'),
        rows = Math.ceil(count / itemsPerRow ),
        columnWidth = Math.floor(frameWidth/itemsPerRow);
    if(this.get('insertionOrientation') === SC.HORIZONTAL_ORIENTATION){
      var min = Math.floor(SC.minY(rect) / rowHeight) * itemsPerRow,
          max = Math.ceil(SC.maxY(rect) / rowHeight) * itemsPerRow;
      return SC.IndexSet.create(min, max-min);
    }else{
      var max = 0,
          min = count;
      for(var colIndex=0;colIndex<itemsPerRow;++colIndex){
        var colMinX = colIndex*columnWidth,
            colMaxX = colMinX + columnWidth;
        if( colMaxX > SC.minX(rect) || colMinX < SC.maxX(rect) ){
          min = Math.min(min,Math.floor(SC.minY(rect) / rowHeight) + (colIndex * rows));
          max = Math.max(max,Math.min(Math.ceil(SC.maxY(rect) / rowHeight) + (colIndex * rows), (colIndex * rows) + rows));
        }
      }
      return SC.IndexSet.create(min,max-min);
    }
  },
 
  layoutForContentIndex: function(contentIndex) {
    var rowHeight = this.get('rowHeight') || 48,
        content = this.get('content'),
        count = (content) ? content.get('length') : 0,
        frameWidth = this.get('clippingFrame').width,
        itemsPerRow = this.get('itemsPerRow'),
        rows = Math.ceil(count / itemsPerRow ),
        columnWidth = Math.floor(frameWidth/itemsPerRow),
        isHorizontal = this.get('insertionOrientation') === SC.HORIZONTAL_ORIENTATION,
        row = isHorizontal ? Math.floor(contentIndex / itemsPerRow) : contentIndex%rows,
        col = isHorizontal ? contentIndex - (itemsPerRow*row) : Math.floor(contentIndex/rows);
    return { 
      left: col * columnWidth,
      top: row * rowHeight,
      height: rowHeight,
      width: columnWidth
    };
  }
});
