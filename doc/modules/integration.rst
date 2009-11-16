:mod:`JsHamcrest.Integration` --- Third-Party Integration Utilities
===================================================================

.. module:: JsHamcrest.Integration
   :synopsis: Functions to allow easy integration with other libraries.
.. moduleauthor:: Daniel Martins <daniel@destaquenet.com>


Provides functions to make it easy to integrate JsHamcrest with other popular
JavaScript frameworks.

.. function:: copyMembers(source, target)

   Copies all members of an object to another.

   :arg source: Source object.
   :arg target: Target object.
   :returns:    Nothing.


Unit Testing Frameworks
-----------------------

JsHamcrest is perfect to enhance your JavaScript testing code.

JsTestDriver -- Remote JavaScript Console
`````````````````````````````````````````

.. function:: JsTestDriver({scope})

   Integrates JsHamcrest with `JsTestDriver`_. Instructions on how to set up
   your project:
   
       1. Let's assume your project root directory have a ``lib``
          directory to keep your project's dependencies. In this case, copy
          the ``jshamcrest.js`` file to that directory;

       2. Create a file ``plugin/jshamcrest-plugin.js`` in
          your project root directory and put one of the following lines inside
          it::

              JsHamcrest.Integration.JsTestDriver();
              JsHamcrest.Integration.JsTestDriver({scope:window}); // Same as above
              

       3. Finally, edit the ``jsTestDriver.conf`` file as follows::

              load:
                - lib/*.js
                - <source directory>
                - <test cases directory>
                - plugin/*.js


   That's it. Your test cases should now have access to JsHamcrest functions::

       CalculatorTest = TestCase("CalculatorTest");

       CalculatorTest.prototype.testAdd = function() {
           var calc = new MyCalculator();
           assertThat(calc.add(2,3), equalTo(5));
       };

   :arg scope: *(Optional, default=window)* Copies all test matcher functions
               to the given scope.
   :returns:   Nothing.


JsUnitTest -- JavaScript Unit Testing Framework
```````````````````````````````````````````````

.. highlight:: html

.. function:: JsUnitTest({scope})

   Integrates JsHamcrest with `JsUnitTest`_. The following code is an example on
   how to set up your project::

       <!-- JsUnitTest and dependencies -->
       <script type="text/javascript" src="jsunittest.js"></script>

       <!-- Activate JsUnitTest integration -->
       <script type="text/javascript" src="jshamcrest.js"></script>
       <script type="text/javascript">
           JsHamcrest.Integration.JsUnitTest();
       </script>

       <script type="text/javascript">
           new Test.Unit.Runner({
               setup: function() {
               },

               tearDown: function() {
               },

               testAdd: function() { with(this) {
                   var calc = new MyCalculator();
                   assertThat(calc.add(2,3), equalTo(5));
               }}
           }, {'testLog':'myLog'});
       </script>

   Integrates JsHamcrest with JsUnitTest. The following code is an example on
   how to set up your project:
   
   :arg scope: *(Optional, default=Testcase.prototype)* Copies
               all test matcher functions to the given scope.
   :returns:   Nothing.


jsUnity -- Lightweight JavaScript Testing Framework
```````````````````````````````````````````````````

.. function:: jsUnity({scope, attachAssertions})

   Integrates JsHamcrest with `jsUnity`_. The following code is an example on
   how to set up your project::

       <!-- jsUnity and dependencies -->
       <script type="text/javascript" src="jsunity.js"></script>

       <!-- Activate jsUnity integration -->
       <script type="text/javascript" src="jshamcrest.js"></script>
       <script type="text/javascript">
           function CalculatorTestSuite() {
               function testAdd() {
                   var calc = new MyCalculator();
                   assertThat(calc.add(2,3), equalTo(5));
               }
           }

           // Activate the jsUnity integration
           JsHamcrest.Integration.jsUnity();
           var results = jsUnity.run(CalculatorTestSuite);
       </script>

   :arg scope:            *(Optional, default=jsUnity.env.defaultScope)* Copies
                          all test matcher functions to the given scope.
   :arg attachAssertions: *(Optional, default=false)* Whether JsHamcrest should
                          also copy jsUnity's assertion functions to the given
                          scope.
   :returns:              Nothing.


QUnit -- JavaScript Test Suite
``````````````````````````````

.. function:: QUnit({scope})

   Integrates JsHamcrest with `QUnit`_. The following code is an example on how
   to set up your project::

       <!-- QUnit and dependencies -->
       <script type="text/javascript" src="jquery.js"></script>

       <!-- Activate QUnit integration -->
       <script type="text/javascript" src="jshamcrest.js"></script>
       <script type="text/javascript">
           JsHamcrest.Integration.QUnit();

           $(document).ready(function(){
               test("Calculator should add two numbers", function() {
                   var calc = new MyCalculator();
                   assertThat(calc.add(2,3), equalTo(5));
               });
           });
       </script>

       <!-- QUnit and dependencies -->
       <script type="text/javascript" src="testrunner.js"></script>

   :arg scope: *(Optional, default=window)* Copies all test matcher functions
               to the given scope.
   :returns:   Nothing.


screw-unit -- JavaScript BDD Framework
``````````````````````````````````````

.. function:: screwunit({scope})

   Integrates JsHamcrest with `screw-unit`_. The following code is an example on
   how to set up your project::

       <!-- screw-unit and dependencies -->
       <script type="text/javascript" src="jquery-1.2.6.js"></script>
       <script type="text/javascript" src="jquery.fn.js"></script>
       <script type="text/javascript" src="jquery.print.js"></script>
       <script type="text/javascript" src="screw.builder.js"></script>
       <script type="text/javascript" src="screw.matchers.js"></script>
       <script type="text/javascript" src="screw.events.js"></script>
       <script type="text/javascript" src="screw.behaviors.js"></script>
       <link rel="stylesheet" type="text/css" href="screw.css" />

       <!-- Activate screw-unit integration -->
       <script type="text/javascript" src="jshamcrest.js"></script>
       <script type="text/javascript">
           JsHamcrest.Integration.screwunit();

           Screw.Unit(function() {
               describe('Using JsHamcrest assertions in Screw.Unit', function() {
                   it('should succeed', function() {
                       assertThat(5, between(0).and(10), 'This assertion must succeed');
                   });

                   it('should fail', function() {
                       assertThat([], not(empty()), 'This assertion must fail');
                   });
               });
           });
       </script>

   :arg scope: *(Optional, default=Screw.Matchers)* Copies all test matcher
               functions to the given scope.
   :returns:   Nothing.


YUITest -- JavaScript Unit Testing Framework
````````````````````````````````````````````

.. function:: YUITest({scope})

   Integrates JsHamcrest with `YUITest`_. The following code is an example on
   how to set up your project::

       <!-- YUITest and dependencies -->
       <script type="text/javascript" src="yahoo-dom-event/yahoo-dom-event.js"></script>
       <script type="text/javascript" src="yuilogger/logger.js"></script>
       <script type="text/javascript" src="yuitest/yuitest.js"></script>

       <!-- Activate YUITest integration -->
       <script type="text/javascript" src="jshamcrest.js"></script>
       <script type="text/javascript">
           JsHamcrest.Integration.YUITest();
       </script>

       <script type="text/javascript">
           CalculatorTestCase = new YAHOO.tool.TestCase({
               name: "Calculator test case",

               setUp: function() {
               },

               teardown: function() {
               },

               testAdd: function() {
                   var calc = new MyCalculator();
                   Assert.that(calc.add(2,3), equalTo(5));
               }
           });
       </script>

   :arg scope: *(Optional, default=window)* Copies all test matcher functions
               to the given scope.
   :returns:   Nothing.


.. _JsTestDriver: http://code.google.com/p/js-test-driver/
.. _JsUnitTest: http://jsunittest.com/
.. _jsUnity: http://jsunity.com/
.. _QUnit: http://docs.jquery.com/QUnit
.. _screw-unit: http://github.com/nathansobo/screw-unit
.. _YUITest: http://developer.yahoo.com/yui/yuitest/

