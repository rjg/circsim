/* >>>>>>>>>> BEGIN source/core.js */
/*globals Circsim*/ 

Circsim = SC.Application.create({

  NAMESPACE: 'Circsim',
  VERSION: '0.1.0',
  ERRORCOLOR: "#FFD6D6",
  CORRECTCOLOR: "#E8FFCA",
  NORMALCOLOR: "#FBFBFB",

  pvViewDisplay: ''

  
});

/* >>>>>>>>>> BEGIN source/controllers/cell.js */
/*globals Circsim */

Circsim.cellController = SC.ObjectController.create({
  
});

/* >>>>>>>>>> BEGIN source/controllers/cells.js */
/*globals Circsim */

Circsim.cellsController = SC.ArrayController.create({  
  
  contentBinding: "Circsim.columnController.selection",
  
  colsBinding: "Circsim.procedureController.columns",

  allCells: function() {
    var cols     = this.get("cols"),
        allCells = [];         

    cols.forEach(function(col) {
      var cells = col.get('cells');
      cells.forEach(function(cell) {
        allCells.pushObject(cell);
      });
    });
    return allCells;
  }.property("cols").cacheable()
});

/* >>>>>>>>>> BEGIN source/controllers/column.js */
/*globals Circsim */

Circsim.columnController = SC.Object.create({
  content: "",
  current: 0
});

/* >>>>>>>>>> BEGIN source/controllers/columns.js */
/*globals Circsim */

Circsim.columnsController = SC.ArrayController.create({  
  contentBinding: "Circsim.procedureController.columns"
});

/* >>>>>>>>>> BEGIN source/controllers/content.js */
/*globals Circsim*/

Circsim.contentController = SC.Object.create({
  contentDisplay: ''
});
/* >>>>>>>>>> BEGIN source/controllers/instructions.js */
/*globals Circsim */

Circsim.instructionsController = SC.Object.create({  
  content: ""
});

/* >>>>>>>>>> BEGIN source/controllers/message.js */
/*globals Circsim */

Circsim.messageController = SC.Object.create({  
  content: "",
  title: "",
  titleColor: "#FBFBFB",
  color: "#FBFBFB"
});

/* >>>>>>>>>> BEGIN source/controllers/messages.js */
/*globals Circsim */

Circsim.messagesController = SC.ArrayController.create({  
});

/* >>>>>>>>>> BEGIN source/controllers/physio_state.js */
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

/* >>>>>>>>>> BEGIN source/controllers/procedure.js */
/*globals Circsim */

Circsim.procedureController = SC.ObjectController.create({
  contentBinding: SC.Binding.single('Circsim.proceduresController.selection'),
  
  currentPV: function(){
    var rows = this.get('content').get('rows');
    var idx = this.get('content').get('initialVariable');
    
    return rows[idx];
  }.property('content')
});

/* >>>>>>>>>> BEGIN source/controllers/procedures.js */
/*globals Circsim */


Circsim.proceduresController = SC.ArrayController.create({  
  
});

/* >>>>>>>>>> BEGIN source/controllers/pv_selection.js */
/*globals Circsim*/

Circsim.pvSelectionController = SC.Object.create({
  content: ''
});
/* >>>>>>>>>> BEGIN source/controllers/relationship_evaluations_controller.js */
/*globals Circsim */

Circsim.relationshipEvaluationsController = SC.Object.create({

  content: [],
  current: 0

}) ;

/* >>>>>>>>>> BEGIN source/controllers/toolbar.js */
/*globals Circsim*/

Circsim.toolbarDisplayController = SC.Object.create({
  helpDisplay: ""
});
/* >>>>>>>>>> BEGIN source/lib/grid_patch.js */
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

/* >>>>>>>>>> BEGIN source/lib/target_action.js */
// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

/** @static
  
  This mixin implements the basic target-action handling for a view.
  
  @author Erich Ocean
  @since SproutCore 1.0
*/
SC.TargetAction = {
  
  /**
    The name of the action you want triggered when the button is pressed.  
    
    This property is used in conjunction with the target property to execute
    a method when a regular button is pressed.  These properties are not 
    relevant when the button is used in toggle mode.
    
    If you do not set a target, then pressing a button will cause the
    responder chain to search for a view that implements the action you name
    here.  If you set a target, then the button will try to call the method
    on the target itself.
    
    For legacy support, you can also set the action property to a function.  
    Doing so will cause the function itself to be called when the button is
    clicked.  It is generally better to use the target/action approach and 
    to implement your code in a controller of some type.
    
    @type String
  */
  action: null,
  
  /**
    The target object to invoke the action on when the button is pressed.
    
    If you set this target, the action will be called on the target object
    directly when the button is clicked.  If you leave this property set to
    null, then the button will search the responder chain for a view that 
    implements the action when the button is pressed instead.
    
    @type Object
  */
  target: null,
  
  /**
    Set to YES to send an action on mouseDown:, rather than mouseUp:.
    
    @type Boolean
  */
  actOnMouseDown: NO,
  
  /**
    fakes a click... evt is optional.  
    
    Temporarily highlights the button to show that it is being triggered.  
    Does nothing if the button is disabled. 
    
    @returns {bool} success/failure of the request
  */  
  triggerAction: function(evt) {  
    if (!this.get('isEnabled')) return false;
    this.set('isActive', YES);
    this.performAction(evt);
    this.didTriggerAction();
    this.invokeLater('set', 200, 'isActive', NO);
    return true;
  },
  
  /**
    Perform an action.
  */
  performAction: function(evt) {
    var action = this.get('action');
    var target = this.get('target') || null;
    if (action) {
      this.getPath('pane.rootResponder').sendAction(action, target, this, this.get('pane'));
    }
  },
  
  /**
    This method is called anytime the button's action is triggered.  You can 
    implement this method in your own subclass to perform any cleanup needed 
    after an action is performed.
  */
  didTriggerAction: function() {},
  
  /** @private 
    On mouse down, set active only if enabled.
  */    
  mouseDown: function(evt) {
    if (!this.get('isEnabled')) return YES ; // handled event, but do nothing
    
    this._actsOnMouseDown = !!this.get('actOnMouseDown') ; // cache
    
    if (this._actsOnMouseDown) {
      this.performAction(evt) ;
    } else {
      this.set('isActive', YES) ;
      this._isMouseDown = YES ;
    }
    
    return YES ;
  },
  
  /** @private
    Remove the active class on mouseOut if mouse is down.
  */  
  mouseExited: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO);
    return YES;
  },

  /** @private
    If mouse was down and we renter the button area, set the active state again.
  */  
  mouseEntered: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    this.set('isActive', this._isMouseDown);
    return YES;
  },
  
  /** @private
    ON mouse up, trigger the action only if we are enabled and the mouse was released inside of the view.
  */  
  mouseUp: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO); // track independently in case isEnabled has changed
    this._isMouseDown = false;
    var inside = this.$().within(evt.target) ;
    if (inside && this.get('isEnabled')) this.performAction(evt) ;
    return true ;
  }
  
};

/* >>>>>>>>>> BEGIN source/resources/templates/footer.handlebars */
SC.TEMPLATES["footer"] = SC.Handlebars.compile("<div id=\"footer\">\n  <div id=\"copyright\">\n    © 2011 Rush University\n  </div>\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/procedure.handlebars */
SC.TEMPLATES["procedure"] = SC.Handlebars.compile("<body>\n\n  <div id=\"procedure\">\n    <h1 id=\"procedure-title\">{{title}}</h1>\n    <div id=\"procedure-instructions\">\n      {{instructions}}\n    </div>\n    <div id=\"procedure-interaction\">\n      <div id=\"grid\">\n        <div class=\"column\">\n          {{#view Circsim.contentViews.drView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.drCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n        <div class=\"column\">\n          {{#view Circsim.contentViews.rrView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.rrCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n        <div class=\"column\">\n          {{#view Circsim.contentViews.ssView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.ssCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n\n      </div>\n      <div id=\"procedure-messages\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies molestie bibendum. Ut tincidunt scelerisque ligula vel faucibus. Pellentesque vitae felis ac elit dictum rhoncus. Praesent lacus mauris, laoreet non interdum quis, vestibulum ac tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac ipsum enim, sed placerat metus. In eu sapien elit, ac imperdiet dui. Proin tempus dui et massa molestie venenatis luctus quam blandit. In urna nunc, consectetur blandit venenatis sit amet, dignissim varius turpis. Quisque ligula justo, dictum quis convallis ac, interdum eget lectus</p>\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies molestie bibendum. Ut tincidunt scelerisque ligula vel faucibus. Pellentesque vitae felis ac elit dictum rhoncus. Praesent lacus mauris, laoreet non interdum quis, vestibulum ac tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac ipsum enim, sed placerat metus. In eu sapien elit, ac imperdiet dui. Proin tempus dui et massa molestie venenatis luctus quam blandit. In urna nunc, consectetur blandit venenatis sit amet, dignissim varius turpis. Quisque ligula justo, dictum quis convallis ac, interdum eget lectus</p>        \n      </div>\n    </div>\n  </div>\n</body>");
/* >>>>>>>>>> BEGIN source/statecharts/statechart.js */
/*globals Circsim CoreCircsim*/

Circsim.statechart = SC.Statechart.create({
  // trace: YES,

  // initialState: "Title",
  initialState: "Running",

  "Title": SC.State.design({
    enterState: function(){
      Circsim.contentController.set("contentDisplay", "Circsim.contentViews.titleView");
      Circsim.set("sidebarView", "Circsim.sidebarViews.titleView");
      Circsim.toolbarDisplayController.set("helpDisplay", "display:none;");
    },
    
    startCircsim: function() {
      this.gotoState("Running");
    }
  }),

  "Running": SC.State.design({
    enterState: function(){
      Circsim.set('sidebarView', 'Circsim.sidebarViews.runningView');
      Circsim.toolbarDisplayController.set('helpDisplay', '');
    },
    
    initialSubstate: "Introduction",

    "Introduction": SC.State.design({
      enterState: function(){
        Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.introView');        
      }
    }),

    "Procedure": SC.State.design({
      enterState: function(){
  
        var procedure = Circsim.procedureController;
        
        // TODO: This is a huge hack to account for that bug when the collection view is clicked on but not a procedure.
        if (procedure.get('title')) {
          CoreCircsim.createGrid(procedure);          
        } else {
          console.log("No procedure selected. Catching this bug.");
          this.gotoState('Running');
        }
      },
      
      // initialSubstate: "ProcedureIntro",
      initialSubstate: "InitialVariableEvaluation",
      
      "ProcedureIntro": SC.State.design({
        enterState: function(){
          Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.procedureIntroView');          
        },
        
        beginProcedure: function(){
          this.gotoState("InitialVariableEvaluation");
        }
      }),
      
      "InitialVariableEvaluation": SC.State.design({
        initialSubstate: "IVStudentPrompt", 
        
        "IVStudentPrompt": SC.State.design({
          enterState: function(){
            Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.procedureView');
            Circsim.messageController.set("title", "Primary Variable");
            Circsim.messageController.set("content", "Please use the select menu to the left to select the primary variable that is changed in this procedure.");            
            Circsim.set('pvViewDisplay', "Circsim.PVView");
          },
          
          next: function() {  
            this.selectedPV();
          },
          
          selectedPV: function(){
            var procedure = Circsim.procedureController.get('content');
            var rows = procedure.get("rows");
            var pv = Circsim.pvSelectionController.get("content");
            var idx = rows.indexOf(pv);
            
            var answerIsCorrect = CoreCircsim.evaluateInitialVariableSelection(procedure, idx);
            
            if (answerIsCorrect) {
              this.clickCorrectIVa();              
            } else {
              this.clickIncorrectIVa();
            }
          },

          clickCorrectIVa: function(){
            this.gotoState("IVSelectDirection");
          },

          clickIncorrectIVa: function(){
            this.gotoState("IVSecondChance");
          }                      
        }),
                
        "IVSecondChance": SC.State.design({
          enterState: function() {
            Circsim.messageController.set('content', 'Sorry, that\'s wrong. Try again.');
            Circsim.messageController.set('color', Circsim.ERRORCOLOR);            
          },
          
          exitState: function() {
            Circsim.messageController.set('content', '');
            Circsim.messageController.set('color', Circsim.NORMALCOLOR);            
          },

          next: function() {  
            this.selectedPV();
          },
          
          selectedPV: function(){
            var procedure = Circsim.procedureController.get('content');
            var rows = procedure.get("rows");
            var pv = Circsim.pvSelectionController.get("content");
            var idx = rows.indexOf(pv);
            
            var answerIsCorrect = CoreCircsim.evaluateInitialVariableSelection(procedure, idx);
            
            if (answerIsCorrect) {
              this.clickCorrectIVb();              
            } else {
              this.clickIncorrectIVb();
            }
          },
          
          clickCorrectIVb: function(){
            this.gotoState("IVSelectDirection");
          },
          
          clickIncorrectIVb: function(){
            this.gotoState("IVIncorrectSummary");
          }
        }),
          
        "IVSelectDirection": SC.State.design({
          enterState: function(){
            Circsim.messageController.set('content', 'Ok! Now, select the direction in the table.');            
            var pvIdx = Circsim.procedureController.get('initialVariable');
            var pvCell = Circsim.cellsController.get('allCells').objectAt(pvIdx);
            pvCell.set('isEnabled', YES);
            Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
          },

          clickedOnCell: function(s) {
            var cell = s.selection.firstObject();
            CoreCircsim.updateCell(cell);        
          },
          
          next: function(){
            var procedure = Circsim.procedureController.get("content");
            var IVIdx = procedure.get('initialVariable');
            var cell = procedure.get('columns').firstObject().get('cells').objectAt(IVIdx);
            var direction = cell.get('value');            

            var answerIsCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, direction);
            if (answerIsCorrect) {
              this.directionCorrect();
            }else{
              this.directionIncorrect();
            }
            
          },
          
          directionCorrect: function(){
            this.gotoState("IVCorrectSummary");
          },
          
          directionIncorrect: function(){
            this.gotoState("IVDirectionSecondChance");
          }
        }),
        
        "IVDirectionSecondChance": SC.State.design({
          enterState: function(){
            Circsim.messageController.set("content", "Yikes. That's the wrong direction. Try again dude");
            Circsim.messageController.set("color", Circsim.ERRORCOLOR);
            Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
          },
          
          exitState: function(){
            Circsim.messageController.set("content", "");
            Circsim.messageController.set("color", Circsim.NORMALCOLOR);            
          },

          clickedOnCell: function(s) {
            var cell = s.selection.firstObject();
            CoreCircsim.updateCell(cell);        
          },
          
          next: function(){
            var procedure = Circsim.procedureController.get("content");
            var IVIdx = procedure.get('initialVariable');
            var cell = procedure.get('columns').firstObject().get('cells').objectAt(IVIdx);
            var direction = cell.get('value');            
            
            var answerIsCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, direction);
            
            if (answerIsCorrect) {
              this.directionCorrect();
            }else{
              this.directionIncorrect();
            }
            
            
          },
          
          directionCorrect: function(){
            this.gotoState("IVCorrectSummary");
          },
          
          directionIncorrect: function(){
            this.gotoState("IVIncorrectSummary");
          }
        }),
                
        "IVCorrectSummary": SC.State.design({
          enterState: function(){
            Circsim.messageController.set("content", "You're Amazing Dude!  Here's the summary.");
            Circsim.messageController.set("color", Circsim.CORRECTCOLOR);
            Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
            var procedure = Circsim.procedureController.get('content');
            var cells = Circsim.cellsController.get('allCells');
            CoreCircsim.setPVToCorrect(procedure, cells);
            
          },
          
          exitState: function(){
            Circsim.messageController.set("content", "");
            Circsim.messageController.set("color", Circsim.NORMALCOLOR);
          },

          next: function() {
            this.completeRestOfColumn();
          },
          
          completeRestOfColumn: function(){
            this.gotoState("ColumnInput");
          }
        }),
        
        "IVIncorrectSummary": SC.State.design({
          enterState: function(){
            Circsim.messageController.set("content", "Incorrect Dude.  Here's the summary.");
            Circsim.messageController.set("color", Circsim.ERRORCOLOR);
            Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
            
            var procedure = Circsim.procedureController.get('content');
            var cells = Circsim.cellsController.get('allCells');
            CoreCircsim.setPVToCorrect(procedure, cells);
                        
            
          },

          exitState: function(){
            Circsim.messageController.set("content", "");
            Circsim.messageController.set("color", Circsim.NORMALCOLOR);
          },
          
          next: function() {
            this.completeRestOfColumn();
          },
          
          completeRestOfColumn: function(){
            this.gotoState("ColumnInput");
          }          
        })
      }),
      
      "ColumnInput": SC.State.design({
        
        enterState: function(){
          this.setCurrentColumn();
          var header = Circsim.columnController.get('content').get('header');
          Circsim.messageController.set('title', '');
          Circsim.messageController.set('content', 'At this time, please fill out the '+header+' column.');
          
          // Enable only correct cells.
          var activeCells = Circsim.columnController.get('content').get('cells');
          Circsim.cellsController.get('allCells').forEach(function(c) {
            if (activeCells.contains(c)) {
              c.set('isEnabled', true);
            }else{
              c.set('isEnabled', false);
            }
          });
        },
        
        exitState: function(){
          Circsim.cellsController.get('allCells').forEach(function(c) {
            c.set('isEnabled', false);
          });
          
          Circsim.messageController.set('content', '');
          
        },
        
        setCurrentColumn: function(){
          var current = Circsim.columnController.get('current');
          Circsim.columnController.set('content', Circsim.columnsController.objectAt(current));          
        },
        
        clickedOnCell: function(s) {
          var cell = s.selection.firstObject();
          CoreCircsim.updateCell(cell);        
        },

        next: function() {
          var cells = Circsim.columnController.get('content').get('cells'); 
          var ary = [];
          
          cells.forEach(function(c) {
            ary.push(c.get('value'));
          });
          
          if (ary.contains(null) || ary.length > 7) {            
            // TODO: This is a bug.. Why is it doing this?  Fix this.            
            ary = ary.slice(0,7);
            if (ary.contains(null)) {
              Circsim.messageController.set('content',"You haven't filled in a value for all the cells yet.  Please do that before continuing.");
            } else {
              this.beginEvaluations();
            }
          } else {
            this.beginEvaluations();
          }
          
          
        },
        
        beginEvaluations: function(){
          this.gotoState("ColumnEvaluation");
        }
      }),
      
      "ColumnEvaluation": SC.State.design({
        initialSubstate: "RelationshipEvaluation",
        
        "RelationshipEvaluation": SC.State.design({
          initialSubstate: "REIntroduction",
          
          enterState: function() {
            var relationshipEvaluations = Circsim.procedureController.get('content').get('relationshipEvaluations');
            Circsim.relationshipEvaluationsController.set('content', relationshipEvaluations);
            Circsim.relationshipEvaluationsController.set('current', 0);            
            Circsim.messageController.set('title', "Relationship Evaluations");
          },
          
          exitState: function() {
            Circsim.messageController.set('title', "");
          },
          
          "REIntroduction": SC.State.design({
            enterState: function(){
              var idx = Circsim.relationshipEvaluationsController.get('current'),
                  re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
              Circsim.messageController.set("content", re.intro);
              Circsim.messageController.set("color", Circsim.NORMALCOLOR);
            },
            
            next: function() {
              this.evaluateRE();
            },
            
            evaluateRE: function() {
              var column = Circsim.columnController.get('content'),
                  cells  = column.get('cells'),
                  ary    = [],
                  re     = Circsim.relationshipEvaluationsController.get('content');
              
              if (re) {
                var idx = Circsim.relationshipEvaluationsController.get('current');
                re=re.objectAt(idx);  

                cells.forEach(function(c) {
                  ary.push(c.get('value'));
                });

                var errorMessage = CoreCircsim.evaluateRelationships(re, ary);

                if (errorMessage) {
                  Circsim.messageController.set('content',errorMessage);
                  this.gotoState("REErrorCorrection");
                } else {                
                  this.gotoState("RECorrectSummary");
                }                                            
              } else {
                this.gotoState("ProcedureSpecificEvaluation");
              }
              
            }
            
          }),
          
          "REErrorCorrection": SC.State.design({
            enterState: function() {
              var idx = Circsim.relationshipEvaluationsController.get('current');
              var re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);  
              Circsim.messageController.set('content', re.errorMessage);    
              Circsim.messageController.set('color', Circsim.ERRORCOLOR);

              // Enable only correct cells.
              var activeCells = re.equation;
              Circsim.columnController.get('content').get('cells').forEach(function(c) {
                c.set('isEnabled', false);
              });              
              activeCells.forEach(function(i) {
                var cell = Circsim.columnController.get('content').get('cells').objectAt(i);
                cell.set('isEnabled', true);
              });
            },
            
            exitState: function(){
              Circsim.messageController.set('content', '');
              Circsim.messageController.set('color', Circsim.NORMALCOLOR);
              Circsim.cellsController.get('allCells').forEach(function(c) {
                c.set('isEnabled', false);
              });
            },
            
            clickedOnCell: function(s) {
              var cell = s.selection.firstObject();
              CoreCircsim.updateCell(cell);        
            },            
            
            next: function(){
              this.submitRECorrections();
            },
            
            submitRECorrections: function(){
              var column    = Circsim.columnController.get('content'),
                  cells     = column.get('cells'),
                  ary       = [],
                  idx       = Circsim.relationshipEvaluationsController.get('current'),
                  re        = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);

              cells.forEach(function(c) {
                ary.push(c.get('value'));
              });

              var errorMessage = CoreCircsim.evaluateRelationships(re, ary);

              if (errorMessage) {
                this.gotoState("REIncorrectSummary");
              } else {                
                this.gotoState("RECorrectSummary");
              }                                            
            }
          }),
          
          "RECorrectSummary": SC.State.design({
            enterState: function(){
              var idx = Circsim.relationshipEvaluationsController.get('current'),
                  re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
              
              Circsim.messageController.set('content', re.summaryCorrectMessage);
              Circsim.messageController.set('color', Circsim.CORRECTCOLOR);
            },
            
            exitState: function(){
              Circsim.messageController.set('content', "");
              Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
            },
            
            next: function(){
              var idx                          = Circsim.relationshipEvaluationsController.get('current'),
                  totalRelationshipEvaluations = Circsim.relationshipEvaluationsController.get('content').length;
              
              if (idx+1 == totalRelationshipEvaluations) {
                this.gotoState("ProcedureSpecificEvaluation");
              } else {
                Circsim.relationshipEvaluationsController.set('current', idx+1);
                this.gotoState("REIntroduction");
              }
            }
          }),
          
          "REIncorrectSummary": SC.State.design({
            enterState: function(){
              var idx = Circsim.relationshipEvaluationsController.get('current'),
                  re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
              
              Circsim.messageController.set('content', re.summaryIncorrectMessage);
              Circsim.messageController.set('color', Circsim.ERRORCOLOR);
            },
            
            exitState: function(){
              Circsim.messageController.set('content', '');
              Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
            },
            
            next: function(){
              var idx                          = Circsim.relationshipEvaluationsController.get('current'),
                  totalRelationshipEvaluations = Circsim.relationshipEvaluationsController.get('content').length;
              
              if (idx+1 == totalRelationshipEvaluations) {
                this.gotoState("ProcedureSpecificEvaluation");
              } else {
                Circsim.relationshipEvaluationsController.set('current', idx+1);
                this.gotoState("REIntroduction");
              }
            }
          })          
        }),
        
        "ProcedureSpecificEvaluation": SC.State.design({
                    
          initialSubstate: "ProcedureSpecificIntro",
          
          "ProcedureSpecificIntro": SC.State.design({
            enterState: function() {
              Circsim.messageController.set('title', "Procedure Specific Evaluations");
              Circsim.messageController.set('content', "We will now evaluate you for procedure specific errors.");
              
            },
            
            next: function() {
              this.gotoState("PerformProcedureSpecificEvaluations");
            }
          }),
          
          "PerformProcedureSpecificEvaluations": SC.State.design({
            enterState: function(){
              var column    = Circsim.columnController.get('content'),
                  cells     = column.get('cells'),
                  ary       = [],
                  procedure = Circsim.procedureController.get('content'),
                  colNumber = Circsim.columnController.get('current');
              
              cells.forEach(function(c) {
                ary.push(c.get('value'));
              });
                            
              var answerKeys = CoreCircsim.evaluateProcedureSpecificErrors(procedure, colNumber ,ary);              
              
              if (answerKeys.length === 0) {
                Circsim.messageController.set('content', "Your answers don't match any of the answer keys.  This is probably an error.  Please notify Dr. Michael or Dr. Shannon and record the answers you submitted so we can fix this bug.");
                this.gotoState("DisplayProcedureSpecificComment");
              } else {
                Circsim.messagesController.set('content', answerKeys);
                this.gotoState("DisplayProcedureSpecificComment");
              }
            }            
          }),
          
          "DisplayProcedureSpecificComment": SC.State.design({
            enterState: function() {
              
              var answerKey = Circsim.messagesController.get('content'),
                  comment, 
                  category,
                  highlights,
                  isCorrect,
                  cells;
              
              // Do all display stuff in here.
              if (SC.compare(answerKey, []) !== 0 && SC.compare(answerKey, null) !== 0) {
                answerKey = answerKey.shiftObject();
                
                // Setup view here.
                comment    = answerKey.get('comment');
                category   = answerKey.get('category');
                highlights = answerKey.get('highlights');
                isCorrect  = answerKey.get('isCorrect');
                cells      = Circsim.columnController.get('content').get('cells');
                            
                CoreCircsim.updateHighlighting(cells, highlights);
                Circsim.messageController.set('content', comment);
                Circsim.messageController.set('title', category);
                
                // Set coloring
                if (isCorrect) {
                  Circsim.messageController.set('color', Circsim.CORRECTCOLOR);
                }else{
                  Circsim.messageController.set('color', Circsim.ERRORCOLOR);
                  
                  var idxs        = answerKey.get('cells');
                  var correctVals = Circsim.procedureController.get('key');
                  var col         = Circsim.columnController.get('current');
                  var rowLength   = Circsim.procedureController.get('rows').length;
                  
                  CoreCircsim.setCellsToCorrectValues(cells, correctVals, col, rowLength, idxs);
                }  
              }              
            },
            
            exitState: function(){
              var cells = Circsim.columnController.get('content').get('cells');
              // Remove highlighting
              CoreCircsim.updateHighlighting(cells, null);
              // Disable all cells
              cells.forEach(function(cell) {cell.set("isEnabled", NO);});
              
              // Reset Messages
              Circsim.messageController.set('title', '');
              Circsim.messageController.set('content', '');
              Circsim.messageController.set('color', Circsim.NORMALCOLOR);                                          
            },
            
            next: function(){
              var commentsRemaining = Circsim.messagesController.get('content'); 
              if (commentsRemaining && commentsRemaining.length > 0) {
                this.gotoState("DisplayProcedureSpecificComment");
              } else {
                this.gotoState("CheckForRemainingColumns");
              }
            }           
          })
        })
      }),
      
      "CheckForRemainingColumns": SC.State.design({
        
        enterState: function() {
          var totalColumns  = Circsim.procedureController.get('columns').length(),
              currentColumn = Circsim.columnController.get("current")+1;
              console.log("current: "+currentColumn+"; Total: "+totalColumns);
          if (currentColumn < totalColumns) {
            this.remainingColumns();
          }else{
            this.procedureComplete();            
          }          
        },
        
        remainingColumns: function(){
          var current = Circsim.columnController.get('current');
          Circsim.columnController.set('current', current+1);
          this.gotoState("ColumnInput");
        },
        
        procedureComplete: function(){
          this.gotoState("ProcedureComplete");
        }
      })
    }),

    "ProcedureComplete": SC.State.design({
      enterState: function(){
        Circsim.procedureController.get('content').set('isComplete', true);
        var title = Circsim.procedureController.get('content').get('title');
        Circsim.messageController.set('content', "You have completed the "+title+" procedure!  Click on another procedure from the list to the left to continue Circsim.");
      },
      
      exitState: function(){
        // Reset stuff...
        Circsim.cellsController.get('allCells').forEach(function(c) {c.set('value', null);});
        Circsim.columnController.set('current', 0);
        Circsim.columnController.set('content', "");
        Circsim.relationshipEvaluationsController.set('current', 0);
      },
      
      next: function() {        
        this.gotoState("Running");
      }
    }),

    selectProcedure: function() {
      this.gotoState("Procedure");
    },

    openHelp: function() {
      this.gotoState("Help");
    }
  }),
  
  "Help": SC.State.design({
    enterState: function() {
      Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.helpView');
      Circsim.toolbarDisplayController.set('helpDisplay', 'display:none;');
    },

    closeHelp: function() {
      this.gotoHistoryState("Running");
    }
  })
  

});

/* >>>>>>>>>> BEGIN source/views/cell.js */
/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  
  contentDisplayProperties: "value isHighlighted isEnabled".w(),
  
  render: function(context, f) {
    var content          = this.get('content'),
        value            = content.get('value'),
        column           = content.get('column').get('header'),
        isEnabled        = content.get('isEnabled'),
        isHighlighted    = content.get('isHighlighted');
        
        
        // Sets background color of cell.
        var enabled     = isEnabled;
        var disabled    = !isEnabled && !isHighlighted;
        var highlighted = !isEnabled && isHighlighted;
        var classes  = { 'enabled': enabled, 'disabled': disabled, 'highlighted': highlighted};
        
        // Sets value of cell.
        switch (value) {
          case 0: 
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/no-change.png'+" />";
            break;
          case 1: 
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/down.png'+" />";
            break;
          case 2: 
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/up.png'+" />";
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

/* >>>>>>>>>> BEGIN source/views/content.js */
/*globals Circsim*/

Circsim.contentViews = SC.Page.design({});
/* >>>>>>>>>> BEGIN source/views/content/help.js */
/*globals Circsim*/

Circsim.contentViews.helpView = SC.View.design({
  childViews: "helpContentView closeHelpButton".w(),
  
  closeHelpButton: SC.ButtonView.design({
    layout: {top: 10, left: 10, height: 30, width: 100},
    title: "Close Help",
    target: "Circsim.statechart",
    action: "closeHelp"
  }),
  
  helpContentView: SC.LabelView.design({
    layout: {top: 55, bottom: 0, right: 0, left: 0},
    value: "Help Screen goes here."
  })
});



/* >>>>>>>>>> BEGIN source/views/content/intro.js */
/*globals Circsim*/

Circsim.contentViews.introView = SC.View.design({
  childViews: 'text'.w(),
  
  text: SC.LabelView.design({
    layout: {top: 0, bottom: 0, right: 0, left: 0},
    value: "Circsim introduction goes here."
  })
});

/* >>>>>>>>>> BEGIN source/views/content/procedure_intro.js */
/*globals Circsim*/

Circsim.contentViews.procedureIntroView = SC.View.design({
  childViews: "startProcedureButton procedureIntroText".w(),
  
  procedureIntroText: SC.LabelView.design({
    layout: {right: 0, left: 0, top: 60},
    valueBinding: "Circsim.procedureController.introduction"    
  }),
  
  startProcedureButton: SC.ButtonView.design({
    layout: {top: 10, left: 10, height: 100, width: 150},
    title: "Begin Procedure",
    target: "Circsim.statechart",
    action: "beginProcedure"
  })
  
});
/* >>>>>>>>>> BEGIN source/views/content/title.js */
/*globals Circsim*/

Circsim.contentViews.titleView = SC.View.design({
  childViews: "circsimLogoView startButton".w(),
  
  circsimLogoView: SC.LabelView.design({
    layout: {height: 20, width: 250, centerX: 0, centerY: 0},
    value: "Circsim Title Page.  This will be updated Later."
  }),
  
  startButton: SC.ButtonView.design({
    layout: {height: 100, width: 150, bottom: 10, centerX: 0},
    title: "Start Circsim",
    target: "Circsim.statechart",
    action: "startCircsim"
  })
  
});

/* >>>>>>>>>> BEGIN source/views/grid_header.js */
/*globals Circsim*/

Circsim.GridHeaderView = SC.View.extend({
    
    render: function(context){    
      var headers = Circsim.procedureController.get("content").get("cols");
        context.push('<div id="grid-headers">');
        headers.forEach(function(h) {
          context.push('<div>'+h+'</div>');
        });          
        context.push('</div>');
        

    }
});

/* >>>>>>>>>> BEGIN source/views/procedure_messages.js */
/*globals Circsim*/

Circsim.ProcedureMessagesView = SC.View.extend({
    
    render: function(context){    
      var message = this.get('message');
      context.push(
        '<p>',
        ''+message+'',
        '</p>'
      );
    }
});









/* >>>>>>>>>> BEGIN source/views/pv.js */
/*globals Circsim*/

Circsim.PVView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvSelection".w(),
    
    pvLabel: SC.LabelView.design({
      layout: {top: 15, width: 150, height: 20, left: 20},
      value: "Primary Variable:"
    }),
    
    pvSelection: SC.SelectFieldView.design({          
      layout: {top: 15, width: 250, height: 20, right: 50},
      valueBinding: "Circsim.pvSelectionController.content",
      objectsBinding: "Circsim.procedureController.rows",
      disableSort: true,
      emptyName: "Select the Primary Variable",
      layerId: 'pv-select'
      
    })
});

Circsim.PVSummaryView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-summary-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvAnswer".w(),
    
  pvLabel: SC.LabelView.design({
    layout: {top: 15, width: 150, height: 20, left: 20},
    value: "Primary Variable:"
  }),
  
  pvAnswer: SC.LabelView.design({          
    layout: {top: 15, width: 250, height: 20, left: 120},
    valueBinding: "Circsim.procedureController.currentPV",
    fontWeight: SC.BOLD_WEIGHT
    
  })
});

/* >>>>>>>>>> BEGIN source/views/row_view.js */
/*globals Circsim */

Circsim.RowView = SC.View.extend({

  render: function(context){    
    var rows = Circsim.procedureController.get("content").get("rows");
      context.push('<ul id="grid-rows">');
      rows.forEach(function(h) {
        context.push('<li>'+h+'</li>');
      });          
      context.push('</ul>');
  }

});

/* >>>>>>>>>> BEGIN source/views/select_view.js */
/*globals Circsim */
Circsim.SelectView = SC.View.extend({

  tagName: "select",
  value: null,

  render: function(context){
    var items = Circsim.procedureController.get('rows');
    items.forEach(function(item) {
      context.push('<option value="'+item+'">'+item+'</option>');
    });
  }
});

/* >>>>>>>>>> BEGIN source/views/procedure.js */
/*globals Circsim*/

sc_require("views/procedure_messages");
sc_require("views/pv");
sc_require("views/row_view");
sc_require("views/select_view");
sc_require("lib/grid_patch");

Circsim.contentViews.procedureView = SC.View.design({
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 0, bottom: 0, minWidth: 800},
  childViews: "procedureTitle procedureToolbar procedureContent".w(),
  procedureTitle: SC.LabelView.design({
    layout: {top: 0, right: 10, left: 10, height: 20, centerY: 0},
    tagName: "h1",
    layerId: "procedure-title",
    valueBinding: "Circsim.procedureController.title"
  }),
  
  procedureToolbar: SC.View.design({
    layout: {top: 40, right: 10, left: 10, height: 40},
    tagName: "div",
    layerId: "procedure-toolbar",
    backgroundColor: "#777",
    childViews: "nextButton".w(),
    nextButton: SC.ButtonView.design({
      useStaticLayou: YES,
      tagName: "div",
      layerId: "next-button",
      title: "Next",
      target: "Circsim.statechart",
      action: "next",
      render: function(context) {
        var title = this.get('title');
        context.push(title);
      }      
    })
  }),
  
  procedureContent: SC.View.design({
    layout: {top: 80, right: 10, left: 10, bottom: 0},
    tagName: "div",
    layerId: "procedure-content",
    childViews: "pvView predictionTableView messagesView".w(),
    pvView: SC.ContainerView.design({
      nowShowingBinding: "Circsim.pvViewDisplay"
    }),
    
    predictionTableView: SC.View.design({
      layout: {top: 50, left: 0, bottom: 0, width: 470},
      tagName: "div",
      layerId: "prediction-table-view",
      backgroundColor: "white",
      childViews: "gridView headerView rowTitleView".w(),
      
      headerView: Circsim.GridHeaderView.design({
        layout: {right: 0, left: 0, top: 0, height: 50 }
      }),
      
      rowTitleView: Circsim.RowView.design({
        layout: {left: 0, width: 90, top: 50, bottom: 0}
      }),
      
      gridView: SC.GridView.design({
        layout: {right: 4, top: 50, left: 68},
        insertionOrientation: SC.VERTICAL_ORIENTATION,
        columnWidth:120,
        rowHeight: 50,
        contentBinding: "Circsim.cellsController.allCells",           
        target: "Circsim.statechart",
        action: "clickedOnCell",
        actOnSelect: YES,
        exampleView: Circsim.CellView.design({          
          classNames: "cell"
        })
      })
    }),
    
    messagesView: SC.View.design({
      layout: {top: 0, left: 480, bottom: 0, right: 0},
      childViews: "messageTitle messageBody".w(),
      tagName: "div",
      layerId: "messages-view",
      backgroundColor: "#FBFBFB",
    
      messageTitle: SC.LabelView.design({        
        layout: {top: 10, left: 20, height: 20, right: 20},
        valueBinding: "Circsim.messageController.title",
        layerId: 'messages-title',
        backgroundColorBinding: 'Circsim.messageController.titleColor'
      }),
      
      messageBody: SC.LabelView.design({
        layout: {top: 40, left: 20, bottom: 0, right: 20},
        valueBinding: "Circsim.messageController.content",
        layerId: 'messages-body',
        backgroundColorBinding: 'Circsim.messageController.color'
        
      })
    })
  })
  
    
});

/* >>>>>>>>>> BEGIN source/views/sidebar.js */
/*globals Circsim*/

Circsim.sidebarViews = SC.Page.design({});
/* >>>>>>>>>> BEGIN source/views/sidebar/running.js */
/*globals Circsim*/

Circsim.sidebarViews.runningView = SC.View.design({
  layout: {width: 250},
  childViews: 'procedureLabelView procedureListView'.w(),        
  procedureLabelView: SC.LabelView.design({
    layout: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 0,
      height: 16
    },
    fontWeight: SC.BOLD_WEIGHT,
    value: 'Procedures:'
  }),
  
  procedureListView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: {
      top: 32,
      bottom: 0,
      left: 0,
      right: 0
    },
    backgroundColor: '#FBFBFB',
    //Here is the original list view, which is bound to the tasksController
    contentView: SC.ListView.design({
      contentBinding: 'Circsim.proceduresController.arrangedObjects',
      selectionBinding: 'Circsim.proceduresController.selection',
      contentValueKey: 'title',
      rowHeight: 42,
      canDeleteContent: NO,
      actOnSelect: YES, 
      target: "Circsim.statechart",
      action: "selectProcedure"
    })
  })  

});
/* >>>>>>>>>> BEGIN source/views/sidebar/title.js */
/*globals Circsim*/

Circsim.sidebarViews.titleView = SC.View.design({
  layout: {width: 250},
  backgroundColor: "#ebebeb"
});
/* >>>>>>>>>> BEGIN source/views/toolbar.js */
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

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
/*globals Circsim */

sc_require("views/toolbar");
sc_require("views/procedure");

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'toolbar middleView bottomView'.w(),
    
    toolbar: Circsim.ToolbarView.design({
      iconUrl: '/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/help.png',
      helpDisplayBinding: "Circsim.toolbarDisplayController.helpDisplay",
      displayProperties: ["helpDisplay"],
      tagName: "div",
      layerId: "top-toolbar",
      useStaticLayout: YES
    }),
    
    middleView: SC.SplitView.design({
      layout: {
        left: 0,
        top: 36,
        right: 0,
        bottom: 32
      },
      canCollapseViews: NO,
      defaultThickness: 250,
      topLeftMaxThickness: 250,
      dividerThickness: 0,
      layoutDirection: SC.LAYOUT_HORIZONTAL,
          
      topLeftView: SC.ContainerView.extend({
        layout:{width: 250},
        nowShowingBinding: 'Circsim.sidebarView',
        layerId: "procedure-selection"
      }),

      dividerView: SC.View,

      bottomRightView: SC.ContainerView.design({
        layerId: "content",
        nowShowingBinding: 'Circsim.contentController.contentDisplay'        
      })
    }),

    bottomView: SC.TemplateView.design({
      templateName: "footer"
    })
  })

});

/* >>>>>>>>>> BEGIN source/main.js */
/*globals Circsim CoreCircsim*/

Circsim.main = function main() {

  // Instantiate views
  Circsim.getPath('mainPage.mainPane').append();

  // Set content of proceduresController
  Circsim.proceduresController.set('content', CoreCircsim.store.find(CoreCircsim.Procedure));

  // Initialize Statechart
  Circsim.statechart.initStatechart();  
  
};

function main() {
  Circsim.main();
}

