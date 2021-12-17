Before first running of the application: 
 - run "npm install" in the root of the project to install node modules
 - run the application with "npm start"

Instructions:
 - log in with username
 - type letters to guess a quote from a famous person. The goal is to make errors as low as possible and spend as little time as possible
 - when you finish click "Submit your results" or restart the game

Running tests: 
 - uncomment line 23 in calculationHelper.ts and in the root of the project run "npm run test". One test will fail (App.test.ts) and that is expected because it is not configured for check and running. Function for calculating score is tested in calculate.test.ts file

Note: 
 - in my opinion, use of Redux state management was not necessary for this type of application (the application is small and props are not passed through multiple components). Hence, it was used for demonstration purposes
