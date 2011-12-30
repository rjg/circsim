/*globals Circsim CoreCircsim*/

Circsim.mixin({
  mainStates: SC.State.design({
    initialSubstate: "Title",

    "Title": SC.State.design({
      enterState: function(){
        Circsim.contentController.set("contentDisplay", "Circsim.contentViews.titleView");
        Circsim.set("sidebarView", "Circsim.sidebarViews.titleView");      
      },
      
      startCircsim: function() {
        this.gotoState("Running");
      }
    }),

    "Running": SC.State.design({
      enterState: function(){
        Circsim.set('sidebarView', 'Circsim.sidebarViews.runningView');
        
        // Make the display none, so when you click on a procedure, it will detect that the modal help screen isn't visible.
        $("#help-modal").css("display", "none");
        $("#display-modal").css("display", "none");
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
            // Reset stuff...
            Circsim.cellsController.get('allCells').forEach(function(c) {c.set('value', null);});
            Circsim.cellsController.get('allCells').forEach(function(c) {c.set('correctAnswer', null);});
            Circsim.columnController.set('current', 0);
            Circsim.columnController.set('content', "");
            Circsim.relationshipEvaluationsController.set('current', 0);
            // End reset...

            CoreCircsim.createGrid(procedure);          
            
          } else {
            console.log("No procedure selected. Catching this bug.");
            this.gotoState('Running');
          }
        },
        
        initialSubstate: "ProcedureIntro",  
        
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
              Circsim.messageController.set("content", "Please use the menu to the left to select the primary variable that is changed in this procedure. When you have made your decision, click the button above to submit your choice.");            
              Circsim.set('pvViewDisplay', "Circsim.PVView");
              Circsim.nextPromptController.set('content', 'Submit Primary Variable');
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
              Circsim.messageController.set('content', 'Sorry, that is the incorrect answer. Please select another primary variable.  When you have made your final selection, click Submit Primary Variable.');
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
              Circsim.messageController.set('content', 'Great! Now, click on the cell in the table to select the direction that this variable changes.');            
              var pvIdx = Circsim.procedureController.get('initialVariable');
              var pvCell = Circsim.cellsController.get('allCells').objectAt(pvIdx);
              pvCell.set('isEnabled', YES);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              
              
              Circsim.nextPromptController.set('content', 'Submit Primary Variable');
            
              
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
              Circsim.messageController.set("content", "Sorry, that's the wrong direction. Please try again. When you have made your selection, click the 'Next' button above");
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
              Circsim.messageController.set("content", "Great!  You have identified the primary variable and the direction that it changes.  Please click Next to go on.");
              Circsim.messageController.set("color", Circsim.CORRECTCOLOR);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              var procedure = Circsim.procedureController.get('content');
              var cells = Circsim.cellsController.get('allCells');
              CoreCircsim.setPVToCorrect(procedure, cells);
              
              
              Circsim.nextPromptController.set('content', 'Next');  
              
              
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
              Circsim.messageController.set("content", "Sorry, that is incorrect.  The correct answer is now displayed to the left.  Please click Next to move on.");
              Circsim.messageController.set("color", Circsim.ERRORCOLOR);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              
              var procedure = Circsim.procedureController.get('content');
              var cells = Circsim.cellsController.get('allCells');
              CoreCircsim.setPVToCorrect(procedure, cells);
                          
              Circsim.nextPromptController.set('content', 'Next');
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
            Circsim.messageController.set('content', 'At this time, please fill out the '+header+' column.  When you are finished please click the Evaluate Column button.');
            
            Circsim.nextPromptController.set('content', 'Evaluate Column');
            
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
                Circsim.messageController.set('content',"You haven't filled in a value for all the cells yet.  Please do that before continuing.  When you have selected a value for each cell, click Evaluate Column.");
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
                
                Circsim.nextPromptController.set('content', 'Next');
                            
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
                
                Circsim.nextPromptController.set('content', 'Next');

                // Do RE Highlighting
                var cells = Circsim.columnController.get('content').get('cells');
                var relationshipIndices = re['equation'];
                CoreCircsim.highlightCorrectRelationships(cells, relationshipIndices);
              },
              
              exitState: function(){
                Circsim.messageController.set('content', "");
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
                var cells = Circsim.columnController.get('content').get('cells');
                CoreCircsim.removeREHighlights(cells);
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
                
                Circsim.nextPromptController.set('content', 'Next');

                // RE Highlighting Stuff
                var cells = Circsim.columnController.get('content').get('cells');
                var relationshipIndices = re['equation'];
                CoreCircsim.highlightIncorrectRelationships(cells, relationshipIndices);

              },
              
              exitState: function(){
                Circsim.messageController.set('content', '');
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
                var cells = Circsim.columnController.get('content').get('cells');
                CoreCircsim.removeREHighlights(cells);
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
                Circsim.messageController.set('content', "Your predictions will now be evaluated for errors specific to this procedure.  When you are ready, please click Evalute My Answers.");
                Circsim.nextPromptController.set('content', 'Evalute My Answers.');
              },
              
              next: function() {
                // this.gotoState("PerformProcedureSpecificEvaluations");
                this.gotoState('Progress')
              }
            }), 

            'Progress': SC.State.design({
              enterState: function() {
                var modal = Circsim.modalsPage.get('progressView');  
                this._modal = modal;
                modal.append();
                this.invokeLater(Circsim.progressController.progressVal, 10);
                this._timer = SC.Timer.schedule({
                  interval: 1300, 
                  action: function() {
                    Circsim.statechart.sendEvent('closeProgress');
                  }
                })
              }, 
        
              closeProgress: function() {
                this.gotoState('PerformProcedureSpecificEvaluations')
              },

              exitState: function() {
                var modal = this._modal;
                modal.remove();
                modal = null
                this._timer.invalidate();
                this._timer = null;
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
                  
                  Circsim.messageController.set('content', "The evaluation is complete.  Your answers are displayed on the left.  The correct answers are displayed on the right.  When you are ready, we will walk through these answers one by one with explanations.  When you are finished reading an explanation, click Next to continue to the next one.  You will notice that if your answer matches the correct answer, the cell will be highlighted in green.  If your answer is incorrect, the cell will be highlighted in red.");
                  
                  Circsim.nextPromptController.set('content', 'Next');
                  
                  // Setting the correctAnswer display.
                  var key          = Circsim.procedureController.get('key');
                  var col          = Circsim.columnController.get('current');
                  var rowLength    = Circsim.procedureController.get('rows').length;
                  var vals         = key.slice(col*rowLength, (col+1)*rowLength);    
                  var currentCells = Circsim.columnController.get('content').get('cells');
                  CoreCircsim.setCellsToCorrectValues(vals, currentCells);                
                  
                  CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells')); // First, remove all displayed answers
                  CoreCircsim.displayCorrectAnswers(currentCells); // Then display the correct ones.
                                  
                  // Setting messages array
                  Circsim.messagesController.set('content', answerKeys);                
                }
              },
              
              next: function(){
                this.gotoState("DisplayProcedureSpecificComment");
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
                  }

                  // This code makes the correct answers highlight
                  var correctCells = [];
                  highlights.forEach(function(idx) {
                    correctCells.push(cells.objectAt(idx));
                  });
                  CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells')); // First, remove all displayed answers
                  CoreCircsim.displayCorrectAnswers(correctCells); // Then display the correct ones.

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
                
                //
                CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells'));
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
          Circsim.cellsController.get('allCells').forEach(function(c) {c.set('correctAnswer', null);});
          Circsim.columnController.set('current', 0);
          Circsim.columnController.set('content', "");
          Circsim.relationshipEvaluationsController.set('current', 0);
        },
        
        next: function() {
          this.gotoState("Running");
        }
      }),

      selectProcedure: function(sender) {
        this.gotoState("Procedure");
        Circsim.cellsController.notifyPropertyChange('allCells');
      }
    })
  })
});
