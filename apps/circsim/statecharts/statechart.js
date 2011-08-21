/*globals Circsim CoreCircsim*/

Circsim.statechart = SC.Statechart.create({
  trace: YES,

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
        CoreCircsim.createGrid(procedure);
        var firstColumn = Circsim.columnsController.firstObject();
        Circsim.columnsController.selectObject(firstColumn);
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
            Circsim.instructionsController.set("content", "Click the button to select PV:");
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
            Circsim.messageController.set('content', 'Great! Now, select the direction in the table.');
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
                
        "IVCorrectSummary": SC.State.design({
          enterState: function(){
            Circsim.messageController.set("content", "You're Amazing Dude!  Here's the summary.");
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
          Circsim.messageController.set('content', 'Now, go ahead and fill out the rest of the column, \'natch!');
        },

        clickedOnCell: function(s) {
          var cell = s.selection.firstObject();
          CoreCircsim.updateCell(cell);        
        },

        next: function() {
          this.beginEvaluations();
        },
        
        beginEvaluations: function(){
          this.gotoState("ColumnEvaluation");
        }
      }),
      
      "ColumnEvaluation": SC.State.design({
        initialSubstate: "RelationshipEvaluation",
        
        "RelationshipEvaluation": SC.State.design({
          initialSubstate: "REIntroduction",
          
          "REIntroduction": SC.State.design({
            enterState: function(){
              Circsim.messageController.set("content", "Now's the time to evaluate the physiological relationships.");
            },
            
            next: function() {
              this.beginRE();
            },            
            
            beginRE: function(){
              this.gotoState("EvaluateRelationship");
            }
          }),
          
          "EvaluateRelationship": SC.State.design({
            REErrors: function(){
              this.gotoState("REErrorCorrection");
            },
            
            RECorrect: function(){
              this.gotoState("RECorrectSummary");
            }
          }),
          
          "REErrorCorrection": SC.State.design({
            submitRECorrections: function(){
              this.gotoState("EvaluateRelationshipCorrections");
            }
          }),
          
          "EvaluateRelationshipCorrections": SC.State.design({
            RECorrectionCorrect: function(){
              this.gotoState("RECorrectSummary");
            },
            
            RECorrectionIncorrect: function(){
              this.gotoState("REIncorrectSummary");
            }
          }),
          
          "RECorrectSummary": SC.State.design({
            REComplete: function(){
              this.gotoState("CheckForRemainingRE");
            }
          }),
          
          "REIncorrectSummary": SC.State.design({
            REComplete: function(){
              this.gotoState("CheckForRemainingRE");
            }            
          }),
          
          "CheckForRemainingRE": SC.State.design({
            RERemain: function(){
              this.gotoState("EvaluateRelationship");
            },
            
            performProcedureSpecificEvaluations: function(){
              this.gotoState("ProcedureSpecificEvaluations");
            }
          })
        }),
        
        "ProcedureSpecificEvaluation": SC.State.design({
          initialSubstate: "PerformProcedureSpecificEvaluations",
          
          "PerformProcedureSpecificEvaluations": SC.State.design({
            displayProcedureSpecificComments: function(){
              this.gotoState("CheckForMoreProcedureSpecificComments");
            }            
          }),
          
          "DisplayProcedureSpecificComment": SC.State.design({
            checkForMoreComments: function(){
              this.gotoState("");
            }            
          }),
          
          "CheckForMoreProcedureSpecificComments": SC.State.design({
            commentsRemaining: function(){
              this.gotoState("DisplayProcedureSpecificComment");
            },
            
            columnComplete: function(){
              this.gotoState("CheckForRemainingColumns");
            }
          })
        })
      }),
      
      "CheckForRemainingColumns": SC.State.design({
        remainingColumns: function(){
          this.gotoState("ColumnInput");
        },
        
        procedureComplete: function(){
          this.gotoState("ProcedureComplete");
        }
      })
    }),

    "ProcedureComplete": SC.State.design({
      enterState: function(){
        // TODO: Mark this procedure isComplete to true
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
