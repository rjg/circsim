/*globals CoreCircsim */

sc_require('models/answer_key');

CoreCircsim.AnswerKey.FIXTURES = [

{ 
  guid: 1, 
  procedure: 'Ra', 
  column: 0, // This is the index of the column to which this answer key will be applied.
  isCorrect: YES, // Is this is correct or incorrect answer? (For display purposes)  
  highlights: [0,3], // These are the cells we want to highlight when presenting the summaries...
  cells: [0,3], // This array represents the rows that we want to compare.  The numbers are indices of the rows, so in this case, the first and fourth row... (IS & HR)
  cellValues: [0,0], // This array represents the values that we want in those rows... 
  category: "Neural Variables", 
  comment: "Right!  IS and HR are both controlled by the nervous system (they’re neural variables).  By definition, the DR interval occurs BEFORE any changes in neural firing occurs.  So, there are no changes to these two variables."
},
{ 
  guid: 2,
  procedure: "Ra",
  column: 0,
  highlights: [0,3],
  cells: [0],
  cellValues: [3],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No, IS and HR are physiologically determined by neural inputs.  Since DR is the interval before there are any changing in the neural signals, there can be no change in IS."
},
{ 
  guid: 3,
  procedure: "Ra",
  column: 0,
  highlights: [0,3],
  cells: [3],
  cellValues: [3],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No, IS and HR are physiologically determined by neural inputs.  Since DR is the interval before there are any changing in the neural signals, there can be no change in HR."
},
{ 
  guid: 4,
  procedure: "Ra",
  column: 0,
  highlights: [5,6],
  cells: [5,6],
  cellValues: [1,1],  
  isCorrect: YES,
  category: "MAP = CO x Ra",
  comment: "Correct.  With Ra reduced to 50% of its normal value MAP must also fall."
},
{ 
  guid: 5,
  procedure: "Ra",
  column: 0,
  highlights: [5,6],
  cells: [6],
  cellValues: [4],  
  isCorrect: NO,
  category: "MAP = CO x Ra",
  comment: "No, with Ra reduced to 50% of its normal value MAP also fall.  The relationship involved here is MAP = CO x TPR. Ra is the largest component of TPR and thus with TPR down and CO unchanged MAP must fall."
},
{ 
  guid: 6,
  procedure: "Ra",
  column: 0,
  highlights: [2,6],
  cells: [2,6],
  cellValues: [2,1],  
  isCorrect: YES,
  category: "SV = 1/MAP",
  comment: "Right.  MAP is the pressure against which the left ventricle must eject blood.  MAP is the afterload on the heart.  The fall in MAP that occurs reduces the afterload and results in an (admittedly small) increase in SV."
},
{ 
  guid: 7,
  procedure: "Ra",
  column: 0,
  highlights: [2,6],
  cells: [2],
  cellValues: [5],  
  isCorrect: NO,
  category: "SV = 1/MAP",
  comment: "No, MAP is the pressure against which the left ventricle must eject blood.  MAP is the afterload on the heart.  The fall in MAP that occurs reduces the afterload and results in an (admittedly small) increase in SV."
},
{ 
  guid: '8',
  procedure: "Ra",
  column: 0,
  highlights: [2,4],
  cells: [2,4],
  cellValues: [2,2],  
  isCorrect: YES,
  category: "CO = SV x HR",
  comment: "OK, with SV increased and HR unchanged CO must increase.  Remember, CO = SV x HR"
},
{ 
  guid: '9',
  procedure: "Ra",
  column: 0,
  highlights: [2,4],
  cells: [4],
  cellValues: [5],  
  isCorrect: NO,
  category: "CO = SV x HR",
  comment: "No, with SV increased and HR unchanged, CO must increase. Remember, CO = SV x HR."
},
{ 
  guid: '10',
  procedure: "Ra",
  column: 0,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [1,2],  
  isCorrect: YES,
  category: "CVP = 1/CO",
  comment: "Good.  With CO increased CVP will decrease (when CO changes first, the change in CVP that results in inversely related to the change in CO)."
},
{ 
  guid: '11',
  procedure: "Ra",
  column: 0,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [0,2],  
  isCorrect: NO,
  category: "CVP = 1/CO (inverse)",
  comment: "No. When CO increases there is reduction in central blood volume as the flow from the venous compartment to the arterial compartment increases.  As a consequence, the increase in CO causes a decrease in CVP."
},
{ 
  guid: '12',
  procedure: "Ra",
  column: 0,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [2,2],  
  isCorrect: NO,
  category: "CVP = 1/CO (inverse)",
  comment: "No. When CO increases there is reduction in central blood volume as the flow from the venous compartment to the arterial compartment increases.  As a consequence, the increase in CO causes a decrease in CVP. The relationship between CO and CVP is a complicated one because everything depends on which variable changes first.  Changes in CVP (pre-load) result in corresponding changes in CO.  However, when CO changes first it causes an inverse changes in CO."
},
{ 
  guid: '13',
  procedure: "Ra",
  column: 1,
  highlights: [0,3,5],
  cells: [0,3,5],
  cellValues: [2,2,2],  
  isCorrect: YES,
  category: "Neural Variables",
  comment: "Right, the fall in MAP initiates a baroreceptor reflex which increases the neurally controlled variables, IS, HR, and Ra."
},
{ 
  guid: '14',
  procedure: "Ra",
  column: 1,
  highlights: [0,3,5],
  cells: [0,3,5],
  cellValues: [5,5,5],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No, the fall in MAP initiates a baroreceptor reflex which increases ALL of the neurally controlled variables, IS, HR, and Ra."
},
{ 
  guid: '15',
  procedure: "Ra",
  column: 1,
  highlights: [3,4],
  cells: [3,4],
  cellValues: [2,2],  
  isCorrect: YES,
  category: "HR to CO",
  comment: "Correct.  The reflex increase in HR results in an increase in CO."
},
{ 
  guid: '16',
  procedure: "Ra",
  column: 1,
  highlights: [3,4],
  cells: [4],
  cellValues: [5],  
  isCorrect: NO,
  category: "HR to CO",
  comment: "No, the reflex increase in HR causes an increase in CO."
},
{ 
  guid: '17',
  procedure: "Ra",
  column: 1,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [1,2],  
  isCorrect:YES,
  category: "CO to CVP",
  comment: "OK, the increase in CO causes CVP to decrease as more blood is transferred from the venous compartment to the arterial compartment."
},
{ 
  guid: '18',
  procedure: "Ra",
  column: 1,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [2,2],  
  isCorrect: NO,
  category: "CO to CVP",
  comment: "No, the increase in CO causes a decrease in CVP.  When CO changes “first” it causes an opposite change in CVP.  (When CVP changes first, when preload changes, it causes the same change in CO.)"
},
{ 
  guid: '19',
  procedure: "Ra",
  column: 1,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [0,2],  
  isCorrect: NO,
  category: "CO to CVP",
  comment: "No, one of the determinants of CVP is CO (the rate at which blood is pumped out of the venous compartment).  So when CO increases there is a decrease in CVP."
},
{ 
  guid: '20',
  procedure: "Ra",
  column: 1,
  highlights: [1,2],
  cells: [1,2],
  cellValues: [1,1],  
  isCorrect: YES,
  category: "CVP to SV",
  comment: "Yes, with CVP decreased (that is to say, with preload down) there will be a decrease in SV.  Note that the reflex increase in IS that occurred keeps SV from falling proportionately as much as CVP fell."
},
{ 
  guid: '21',
  procedure: "Ra",
  column: 1,
  highlights: [1,2],
  cells: [1,2],
  cellValues: [1,2],  
  isCorrect: NO,
  category: "CVP to SV",
  comment: "No.  CVP is the preload for the ventricles.  With CVP down the filling of the ventricles will bedown and hene SV must decrease."
},
{ 
  guid: '22',
  procedure: "Ra",
  column: 1,
  highlights: [1,2],
  cells: [1,2],
  cellValues: [1,0],  
  isCorrect: NO,
  category: "CVP to SV",
  comment: "No.  The most important determinant of SV is the preload (CVP) and with CVP decreased there must be a decrease in SV"
},
{ 
  guid: '23',
  procedure: "Ra",
  column: 1,
  highlights: [4,5,6],
  cells: [4,5,6],
  cellValues: [2,2,2],  
  isCorrect: YES,
  category: "Determinants of MAP",
  comment: "Right, the direction of change in MAP produced by the baroreceptor will counter the initial (DR) change in MAP.  Thus, in RR, MAP is increased. One can also reason that with CO increased and Ra increased that MAP must increase."
},
{ 
  guid: '24',
  procedure: "Ra",
  column: 1,
  highlights: [4,5,6],
  cells: [4,5,6],
  cellValues: [2,2,1],  
  isCorrect: NO,
  category: "Determinants of MAP",
  comment: "No, the direction of change in MAP produced by the baroreceptor will counter the initial (DR) change in MAP.  Thus, in RR, MAP is increased. One can also reason that with CO increased and Ra increased that MAP must increase."
},
{ 
  guid: '25',
  procedure: "Ra",
  column: 1,
  highlights: [4,5,6],
  cells: [4,5,6],
  cellValues: [2,2,0],  
  isCorrect: NO,
  category: "Determinants of MAP",
  comment: "No, the direction of change in MAP produced by the baroreceptor will counter the initial (DR) change in MAP.  Thus, in RR, MAP is increased.  One can also reason that with CO increased and Ra increased that MAP must increase."
},
{ 
  guid: '26',
  procedure: "Ra",
  column: 2,
  highlights: [6],
  cells: [6],
  cellValues: [1],  
  isCorrect: YES,
  category: "MAP",
  comment: "Right, the baroreceptor reflex does not fully compensate for the disturbance that was present.  Thus MAP is still less (decreased) from the control value."
},
{ 
  guid: '27',
  procedure: "Ra",
  column: 2,
  highlights: [6],
  cells: [6],
  cellValues: [2],  
  isCorrect: NO,
  category: "MAP",
  comment: "No, your prediction that MAP is increased would mean that the value of MAP is now greater than it was before the disturbance."
},
{ 
  guid: '28',
  procedure: "Ra",
  column: 2,
  highlights: [6],
  cells: [6],
  cellValues: [0],  
  isCorrect: NO,
  category: "MAP",
  comment: "No, your prediction that MAP is unchanged would mean that the baroreceptor reflex fully compensated for the disturbance and that MAP is now the same as it was in the control state. However, the baroreceptor reflex can only partially compensate for the disturbance and thus MAP in the new steady state is still decreased."
},
{ 
  guid: '29',
  procedure: "Ra",
  column: 2,
  highlights: [0,3,5],
  cells: [0,3,5],
  cellValues: [2,2,1],  
  isCorrect:YES,
  category: "Neural Variables",
  comment: "Correct, the neurally controlled variables, IS and HR, are increased by the baroreceptor reflex to help restore MAP.  Ra is still decreased from the controlled value since the reflex can not fully overcome the action of the drug that was administered."
},
{
  guid: '30',
  procedure: "Ra",
  column: 2,
  highlights: [0,3,5],
  cells: [0,3,5],
  cellValues: [2,2,2],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "Not quite correct.  The neurally controlled variables, IS and HR, are increased by the baroreceptor reflex to help restore MAP.  However, Ra is still decreased from its controlled value since the reflex can not fully overcome the action of the drug that was administered."
},
{
  guid: '31',
  procedure: "Ra",
  column: 2,
  highlights: [0,3,5],
  cells: [0,3,5],
  cellValues: [5,5,4],  
  isCorrect: NO,
  category: "Neural Variables",
  comment: "No.The neurally controlled variables, IS and HR, are increased by the baroreceptor reflex to help restore MAP.  However, Ra is still decreased from its controlled value since the reflex can not fully overcome the action of the drug that was administered."
},
{
  guid: '32',
  procedure: "Ra",
  column: 2,
  highlights: [3,4],
  cells: [3,4],
  cellValues: [2,2],  
  isCorrect: YES,
  category: "HR CO",
  comment: "Correct, the increased HR (driven by the reflex) results in increased CO."
},
{
  guid: '33',
  procedure: "Ra",
  column: 2,
  highlights: [3,4],
  cells: [4],
  cellValues: [5],  
  isCorrect: NO,
  category: "HR CO",
  comment: "No, the increased HR (driven by the reflex) results in increased CO."
},
{
  guid: '34',
  procedure: "Ra",
  column: 2,
  highlights: [1,4],
  cells: [1,4],
  cellValues: [1,2],  
  isCorrect: YES,
  category: "CO CVP",
  comment: "Right, with CO increased there is a corresponding decrease in CVP."
},
{
  guid: '35',
  procedure: "Ra",
  column: 2,
  highlights: [1,4],
  cells: [1],
  cellValues: [4],  
  isCorrect: NO,
  category: "CO CVP",
  comment: "No, with CO increased there is a corresponding decrease in CVP."
},
{
  guid: '36',
  procedure: "Ra",
  column: 2,
  highlights: [2],
  cells: [2],
  cellValues: [1],  
  isCorrect: YES,
  category: "SV",
  comment: "Right, SV is down because the effect of the decrease in CVP is greater than the effect of the increase in IS. Alternatively, we can argue that SV is down because the increase in DR due to the decrease in afterload is quantitatively very small while the decrease in SV in RR due to the decrease in CSP is much larger.  Thus, in this instance the SS response follows (is in the same direction) as the RR response."
},
{ 
  guid: '37',
  procedure: "Ra",
  column: 2,
  highlights: [2],
  cells: [2],
  cellValues: [4],  
  isCorrect: NO,
  category: "SV",
  comment: "No, SV is down because the effect of the decrease in CVP is greater than the effect of the increase in IS. Alternatively, we can argue that SV is down because the increase in DR due to the decrease in afterload is quantitatively very small while the decrease in SV in RR due to the decrease in CSP is much larger.  Thus, in this instance the SS response follows (is in the same direction) as the RR response."
}

];
