/*globals Circsim*/

Circsim.statechart = SC.Statechart.create({
  trace: YES,

  initialState: "Title",

  "Title": SC.State.design({
    startCircsim: function() {
      this.gotoState("Running");
    }
  }),

  "Running": SC.State.design({
    initialSubstate: "Introduction",

    "Introduction": SC.State.design({
      // TODO: Implement this state.
    }),

    "Help": SC.State.design({
      enterState: function() {
        // TODO: Implement this function
      },

      closeHelp: function() {
        this.gotoState("Running");
      }
    }),

    "Procedure": SC.State.design({
      "ProcedureIntro": SC.State.design({
        beginProcedure: function(){
          this.gotoState("InitialVariableEvaluation");
        }
      }),
      
      "InitialVariableEvaluation": SC.State.design({
        initialSubstate: "IVStudentPrompt", 
        
        "IVStudentPrompt": SC.State.design({
          clickCorrectIVa: function(){
            this.gotoState("IVSelectDirection");
          },
          
          clickIncorrectIVa: function(){
            this.gotoState("IVSecondChance");
          }
        }),
        
        "IVSecondChance": SC.State.design({
          clickCorrectIVb: function(){
            this.gotoState("IVSelectDirection");
          },
          
          clickIncorrectIVb: function(){
            this.gotoState("IVIncorrectSummary");
          }
        }),
          
        "IVSelectDirection": SC.State.design({
          submitIVa: function(){
            this.gotoState("IVEvaluateDirection");
          }
        }),
        
        "IVEvaluateDirection": SC.State.design({
          IVDirectionCorrect: function(){
            this.gotoState("IVCorrectSummary");
          },
          
          IVDirectionIncorrect: function(){
            this.gotoState("IVDirectionSecondChance");
          }
        }),
        
        "IVDirectionSecondChance": SC.State.design({
          submitIVb: function(){
            this.gotoState("IVFinalEvaluation");
          }
        }),
        
        "IVFinalEvaluation": SC.State.design({
          finalIVCorrect: function(){
            this.gotoState("IVCorrectSummary");
          },
          
          finalIVIncorrect: function(){
            this.gotoState("IVIncorrectSummary");
          }
        }),
        
        "IVCorrectSummary": SC.State.design({
          completeRestOfColumn: function(){
            this.gotoState("ColumnInput");
          }
        }),
        
        "IVIncorrectSummary": SC.State.design({
          completeRestOfColumn: function(){
            this.gotoState("ColumnInput");
          }          
        })
      }),
      
      "ColumnInput": SC.State.design({
        
        evaluateColumns: function(){
          this.gotoState("ColumnEvaluation");
        }
      }),
      
      "ColumnEvaluation": SC.State.design({
        initialSubstate: "RelationshipEvaluation",
        
        "RelationshipEvaluation": SC.State.design({
          initialSubstate: "REIntroduction",
          
          "REIntroduction": SC.State.design({
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
  })

});
