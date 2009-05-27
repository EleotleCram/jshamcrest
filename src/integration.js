/**
 * @fileOverview Methods to allow integration to major JavaScript testing
 * frameworks.
 */

/**
 * Methods to integrate JsHamcrest to major JavaScript testing frameworks.
 * @namespace
 */
JsHamcrest.Integration = {

    /**
     * Copy all assertion matchers to the given object.
     * @param {object} target Target object.
     * @private
     */
    _copyMatchers: function(target) {
        var source = JsHamcrest.Matchers;
        for (method in source) {
            if (!(method in target)) {
                target[method] = source[method];
            }
        }
    },

    /**
     * JsTestDriver integration. To plug JsHamcrest to JsTestDriver, follow
     * JsTestDriver installation and configuration instructions and then
     * perform the following changes: <p>
     *
     * <ol>
     *     <li>Let's assume your project root directory have a <em>lib</em>
     *     directory to keep your project's dependencies. In this case, copy
     *     the <em>jshamcrest.js</em> file to that directory;</li>
     *
     *     <li>Create a file <em>plugin/jshamcrest-plugin.js</em> in
     *     your project root directory and put the following line inside
     *     it: <p>
     *
     *     <pre>
     * JsHamcrest.Integration.JsTestDriver();
     *     </pre></li>
     *
     *     <li>Finally, edit the <em>jsTestDriver.conf</em> file as
     *     follows: <p>
     *     <pre>
     * load:
     *   - lib/*.js
     *   - &lt;source directory&gt;
     *   - &lt;test cases directory&gt;
     *   - plugin/*.js
     *     </pre></li>
     * </ol>
     *
     * That's it! Your test cases should now have access to JsHamcrest
     * methods: <p>
     *
     * <pre>
     *     CalculatorTest = TestCase("CalculatorTest");
     *
     *     CalculatorTest.prototype.testAdd = function() {
     *         var calc = new MyCalculator();
     *         assertThat(calc.add(2,3), equalTo(5));
     *     };
     * </pre>
     *
     * @param {object} params Configuration object.
     * @param {object} [params.scope=window] Copies all test matcher functions
     * to the given scope.
     */
    JsTestDriver: function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        JsHamcrest.Integration._copyMatchers(target);

        /**
         * Function called when an assertion fails.
         * @ignore
         */
        var _fail = function(message) {
            var exc = new Error(message);
            exc.name = 'AssertError';

            // Removes all jshamcrest-related entries from error stack
            var stack = exc.stack.split('\n');
            var newStack = '';
            for (var i = 0; i < stack.length; i++) {
                if (!/jshamcrest*\.js\:/i.test(stack[i])) {
                    newStack += stack[i] + '\n';
                }
            }
            exc.stack = newStack;
            throw exc;
        };

        /**
         * Assertion method exposed to JsTestDriver.
         * @ignore
         */
        target.assertThat = function (actual, matcher, message) {
            return JsHamcrest.assertThat(actual, matcher, message, _fail);
        };
    },

    /**
     * JsUnitTest integration. To plug JsHamcrest to JsUnitTest, follow
     * JsUnitTest installation and configuration instructions and then edit
     * the test suite HTML file as follows: <p>
     *
     * <pre>
     *     &lt;!-- JsUnitTest and dependencies --&gt;
     *     &lt;script type="text/javascript" src="jsunittest.js"&gt;&lt;/script&gt;
     *
     *     &lt;!-- Don't forget to activate JsUnitTest integration --&gt;
     *     &lt;script type="text/javascript" src="jshamcrest.js"&gt;&lt;/script&gt;
     *     &lt;script type="text/javascript"&gt;
     *         JsHamcrest.Integration.JsUnitTest();
     *     &lt;/script&gt;
     *
     *     &lt;!-- Some code... --&gt;
     *
     *     &lt;script type="text/javascript"&gt;
     *         new Test.Unit.Runner({
     *             setup: function() {
     *             },
     *
     *             tearDown: function() {
     *             },
     *
     *             testAdd: function() { with(this) {
     *                 var calc = new MyCalculator();
     *                 assertThat(calc.add(2,3), equalTo(5));
     *             }},
     *
     *             // More tests here...
     *         }, {'testLog':'myLog'});
     *     &lt;/script&gt;
     * </pre>
     *
     * @param {object} params Configuration object.
     * @param {object} [params.scope=Testcase.prototype] Copies all test
     * matcher functions to the given scope.
     */
    JsUnitTest: function(params) {
        params = params ? params : {};
        var target = params.scope || JsUnitTest.Unit.Testcase.prototype;

        JsHamcrest.Integration._copyMatchers(target);

        /**
         * Assertion method exposed to JsUnitTest.
         * @ignore
         */
        target.assertThat = function (actual, matcher, message) {
            var self = this;

            /**
             * Function called when an assertion executes successfully.
             * @ignore
             */
            var pass = function() {
                self.pass();
            };

            /**
             * Function called when an assertion fails.
             * @ignore
             */
            var fail = function(message) {
                self.fail(message);
            };

            return JsHamcrest.assertThat(actual, matcher, message, fail, pass);
        };
    },

    /**
     * YUITest (Yahoo UI) integration. To plug JsHamcrest to YUITest, follow
     * YUITest installation and configuration instructions and then edit the
     * test suite HTML file as follows: <p>
     * 
     * <pre>
     *     &lt;!-- YUITest and dependencies --&gt;
     *     &lt;script type="text/javascript" src="yahoo-dom-event/yahoo-dom-event.js"&gt;&lt;/script&gt;
     *     &lt;script type="text/javascript" src="yuilogger/logger.js"&gt;&lt;/script&gt;
     *     &lt;script type="text/javascript" src="yuitest/yuitest.js"&gt;&lt;/script&gt;
     *
     *     &lt;!-- Don't forget to activate YUITest integration --&gt;
     *     &lt;script type="text/javascript" src="jshamcrest.js"&gt;&lt;/script&gt;
     *     &lt;script type="text/javascript"&gt;
     *         JsHamcrest.Integration.YUITest();
     *     &lt;/script&gt;
     *
     *     &lt;!-- Some code... --&gt;
     *
     *     &lt;script type="text/javascript"&gt;
     *         CalculatorTestCase = new YAHOO.tool.TestCase({
     *             name: "Calculator test case",
     *
     *             setUp: function() {
     *             },
     *
     *             teardown: function() {
     *             },
     *
     *             // In YUITest, the assertion method is Assert.that(), not assertThat()!
     *             // JsHamcrest tries not to screw with the conventions adopted by the
     *             // unit test framework in use, making the integration feel less
     *             // intrusive and more natural.
     *
     *             testAdd: function() {
     *                 var calc = new MyCalculator();
     *                 Assert.that(calc.add(2,3), equalTo(5));
     *             },
     *
     *             // More tests here...
     *         });
     *     &lt;/script&gt;
     * </pre>
     *
     * @param {object} params Configuration object.
     * @param {object} [params.scope=window] Copies all test matcher functions
     * to the given scope.
     */
    YUITest: function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        JsHamcrest.Integration._copyMatchers(target);
        target.Assert = YAHOO.util.Assert;

        /**
         * Function called when an assertion fails.
         * @ignore
         */
        var fail = function(message) {
            YAHOO.util.Assert.fail(message);
        };

        /**
         * Assertion method exposed to YUITest.
         * @ignore
         */
        YAHOO.util.Assert.that = function(actual, matcher, message) {
            return JsHamcrest.assertThat(actual, matcher, message, fail);
        };
    },

    /**
     * QUnit (JQuery) integration. To plug JsHamcrest to QUnit, follow QUnit
     * installation and configuration instructions and then edit the test
     * suite HTML file as follows: <p>
     *
     * <pre>
     *     &lt;!-- QUnit and dependencies --&gt;
     *     &lt;script type="text/javascript" src="jquery.js"&gt;&lt;/script&gt;
     *
     *     &lt;!-- Don't forget to activate QUnit integration --&gt;
     *     &lt;script type="text/javascript" src="jshamcrest.js"&gt;&lt;/script&gt;
     *     &lt;script&gt;
     *         JsHamcrest.Integration.QUnit();
     *
     *         $(document).ready(function(){
     *             test("Calculator should add two numbers", function() {
     *                 var calc = new MyCalculator();
     *                 assertThat(calc.add(2,3), equalTo(5));
     *             });
     *
     *             // More tests here...
     *         });
     *     &lt;/script&gt;
     *
     *     &lt;!-- Some code... --&gt;
     *
     *     &lt;!-- QUnit and dependencies --&gt;
     *     &lt;script type="text/javascript" src="testrunner.js"&gt;&lt;/script&gt;
     * </pre>
     *
     * @param {object} params Configuration object.
     * @param {object} [params.scope=window] Copies all test matcher functions
     * to the given scope.
     */
    QUnit: function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        JsHamcrest.Integration._copyMatchers(target);

        /**
         * Function called when an assertion executes successfully.
         * @ignore
         */
        var pass = function(message) {
            QUnit.ok(true, message);
        };

        /**
         * Function called when an assertion fails.
         * @ignore
         */
        var fail = function(message) {
            QUnit.ok(false, message);
        };

        /**
         * Assertion method exposed to QUnit.
         * @ignore
         */
        target.assertThat = function(actual, matcher, message) {
            return JsHamcrest.assertThat(actual, matcher, message, fail, pass);
        };
    },

    /**
     * jsUnity integration. To plug JsHamcrest to jsUnity, follow jsUnity
     * installation and configuration instructions and then edit the test
     * suite file as follows: <p>
     *
     * <pre>
     *     // Some test suite
     *     function CalculatorTestSuite() {
     *         function testA() {
     *             var calc = new MyCalculator();
     *             assertThat(calc.add(2,3), equalTo(5));
     *         }
     *
     *         // More tests here...
     *     }
     *
     *     // Don't forget to activate the jsUnity integration
     *     JsHamcrest.Integration.jsUnity();
     *
     *     var results = jsUnity.run(CalculatorTestSuite);
     * </pre>
     *
     * @param {object} params Configuration object.
     * @param {object} [params.scope=jsUnity.env.defaultScope] Copies all test
     * matcher functions to the given scope.
     * @param {object} [params.attachAssertions=false] Whether JsHamcrest
     * should also copy jsUnity's assertion functions to the given scope.
     */
    jsUnity: function(params) {
        params = params ? params : {};
        var target = params.scope || jsUnity.env.defaultScope;
        var assertions = params.attachAssertions || false;

        JsHamcrest.Integration._copyMatchers(target);
        if (assertions) {
            jsUnity.attachAssertions(target);
        }

        /**
         * Function called when an assertion fails.
         * @ignore
         */
        var fail = function(message) {
            throw message;
        };

        /**
         * Assertion method exposed to jsUnity.
         * @ignore
         */
        target.assertThat = function(actual, matcher, message) {
            return JsHamcrest.assertThat(actual, matcher, message, fail);
        };
    }
};

