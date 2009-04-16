/**
 * JsUnitTest-Hamcrest Rhino test suite.
 */

// Set up the environment and load Jsunittest
load('assets/env.js');
load('assets/jsunittest.js');

// Load JsUnitTest-Hamcrest
load('../build/jsunittest-hamcrest.js');

// Test logger used to collect and display the test results
var testLogger = new Test.Unit.RhinoTextLogger();

// Test runner implementation to run our test cases
var TestRunner = Test.Unit.SimpleRunner;

// Run test cases
Test.loadTestCasesFromDirectory('cases');

// Print the result and return the appropriate exit code
testLogger.printSummaryAndExit();

