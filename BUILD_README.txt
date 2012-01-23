*************************
* Dependency Installation
*
Dependencies: 
- XCode Developer tools
- Ruby 1.9.2 
- SproutCore 1.6

Installing XCode
  Visit the Mac App Store to download and install XCode

Installing Ruby 1.9.2:
  This is necessary because Mac OSX ships with Ruby 1.8.7.  The Circsim buildscript relies on 1.9.2.
  To install 1.9.2, open a terminal and run these two commands. Note: do not paste in the "$" character.
  It is meant to symbolize the prompt.
  
  $ bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )
  $ echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile
  
  After these commands complete, close the terminal and open a new one.  Finally, run the following commands:
  
  $ rvm install 1.9.2
  $ rvm --default use 1.9.2
  
  That will install ruby version manager and set the default ruby version to 1.9.2. 

Installing SproutCore 1.6:
  Go to http://sproutcore.com
  Click the Download Latest link and follow the installation instructions.


*******************
* Changing Circsim
*
Procedure data can be found in the following directory: 

  circsim/design/procedures/

Each procedure has it's own folder in that directory. In the procedure folder you will find two files: 

  answer_keys.csv
  procedure.csv

These contain the data for the procedure and the answer keys for the procedure. The file format is CSV which is 
an open standard spreadsheet format.  The files can be opened in Excel for easy editing. Just make sure to save the 
file in .csv format.

To update a procedure, navigate to the appropriate directory and edit the files as desired.  To add a new procedure, 
create a folder in the procedures/ folder and title it appropriately, then add two files named answer_keys.csv and procedure.csv
The easiest way to do this is probably to just duplicate an existing procedure and then change the relevant data. This way
you can ensure proper formatting etc. 


****************************
* Details on Specific Fields
*
procedure.csv
--------------
Title                      = This is the title of the procedure
Introduction               = The introductory text that will appear when the student selects the procedure.
Initial Variable           = This is an index into the array of rows in the prediction table [IS, CVP, SV, HR, CO, Ra, MAP]. 
                           = NOTE: The array starts at zero! Therefore, to select CVP, make the value 1.
Initial Variable Direction = 0, 1 or 2 (No change, decrease, increase)
Key                        = This is a single array of correct answers for the procedure.  This is used to display correct
                              answers to students during evaluations.  Start in the top left cell and proceed down and then 
                              to the right. 

answer_keys.csv
---------------
Category      = The category of the answer key (e.g. Neural Variables)
Column        = The column which you would like the answer key applied to. (0, 1, or 2 represent DR, RR, and SS)
Comment       = The comment for the answer key
Correct       = Whether the answer key is a correct or incorrect response (Valid values are "yes" or "no". Capitilization doesn't matter)
              = Also, note that making the value 'yes' causes the key to be reviewed as an AND condition, and 'no' as an OR condition
Highlights    = What cells you would like highlighted during the evaluation. (Valid values are cell indexes.  Remember: starts at zero!)
IS, CVP, etc. = The values you would like to check for


************************************
* Instructions for Building Circsim
*
To build Circsim, run the following command from the root of the circsim project: 

  $ ruby build_circsim.rb

This command will output the static files into a directory named:
  
  circsim/build/

You can then drag files into any web environment in which you would like to deploy Circsim.  e.g. a Titanium Desktop project or an 
Apache web server.
