Step 1 : Prerequisites to run postman scripts from cli (newman)
======================================================================================

a. Install node js in windows or mac , refer 'https://www.toolsqa.com/mobile-automation/appium/download-and-install-nodejs/' for step by step installation 
	Additional info:(download setup and install just like ordinary application , nothing to configure in custom)

b. Open command prompt and type below commands to check whether node js is installed, version number will come in display
	npm -v in windows
	npm –version in linux/mac

c.Install newman from node js command prompt, for this open node js cli in windows or mac 
   type 'npm install -g newman' in cli

d. Open command prompt and type below commands to check whether newman is installed , version number will come in display
	newman -v (Windows)
	newman –version (Mac)
e. Open command prompt and type bewlo command to download the html rich reporter library which is useful while executing, this report will work with newman	
	npm install -g newman-reporter-htmlextra

Step 2 : How to run the test and generate rich html report in local machine
======================================================================================

a. Copy the postman collection, test environment collection (if available), test data (csv file, if available) into a specefic folder
b. Open the node js cli and use 'cd' command to navigate the directory where the above mentioned collections are available.
c. Type below command to execute
	newman run DoorwardServicesRegression.json -d TestData.csv -n 2 --delay-request 500  -r htmlextra --reporter-htmlextra-noSyntaxHighlighting --reporter-htmlextra-omitHeaders --reporter-htmlextra-browserTitle "Doorward Regression Suite" --reporter-htmlextra-title "Doorward Service Test"
d. Observe a new folder 'Newman' is created after execution.
e. Find the results in the folder.

Additional info: Open the csv data file and add more rows of data if required, dont change the column header. Once rows are added you can give the iteration number n in Step 2 , c session' (TestData.csv -n 2, here the test data csv have 2 rows of data , if 10 rows of data are added give the iteration number to 10, TestData.csv -n 10)

Steps 3: How to execute the doorward regression suite in jenkins
======================================================================================
Important : For this suite to run explicitly in Jenkins Step 1 session can be omitted
a. Copy the collections folder in the test machine where jenkins is set up.
b. Type below command in jenkins Execute Shell section to run collections.
 newman run <dirPath where colelctions are stored/DoorwardServicesRegression.json> -d TestData.csv --disable-unicode --no-color
 example script looks like " newman run /Users/Sreenath/Desktop/DoorwardServicesRegression.json -d TestData.csv --disable-unicode --no-color "
 
 NB: The current suite is configured to cover Authentication, User And Courses services only . The complete suite cretaion is in progress.