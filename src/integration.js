/**
 * @fileOverview Methods to allow integration to major JavaScript frameworks.
 */

/**
 * Methods to integrate JsHamcrest to major JavaScript frameworks.
 * @namespace
 * @class
 */
JsHamcrest.Integration = function() {

    /**
     * Assert method that is capable of handling matchers. If the given matcher
     * fails, this method registers a failed/error'd assertion with the unit
     * test framework being used. Ex: <p>
     *
     * <pre>
     * // Asserts that something is equal to x
     * assertThat(something, equalTo(x));
     * assertThat(something, equalTo(x), "Some description text");
     *
     * // Same here
     * assertThat(something, x);
     * assertThat(something, x, "Some description text");
     *
     * // Asserts that something evaluates to some value considered truth
     * assertThat(something);
     * </pre>
     *
     * @param {object} actual Actual value under test.
     * @param {object} matcher Matcher to assert the correctness of the actual
     * value.
     * @param {string} message Message that describes the assertion, if
     * necessary.
     * @param {function} fail Function to be called when the assertion fails.
     * @param {function} pass Function to be called when the assertion
     * succeeds.
     * @return {JsHamcrest.Description} Test result description.
     * @private
     */
    function assertThat(actual, matcher, message, fail, pass) {
        var description = new JsHamcrest.Description();
        var matchers = JsHamcrest.Matchers;

        // Actual value must be any value considered non-null by JavaScript
        if (matcher == null) {
            matcher = matchers.truth();
        }

        // Creates a 'equalTo' matcher if 'matcher' is not a valid matcher
        if (!JsHamcrest.isMatcher(matcher)) {
            matcher = matchers.equalTo(matcher);
        }

        if (message) {
            description.append(message).append('. ');
        }

        description.append('Expected ');
        matcher.describeTo(description);

        if (!matcher.matches(actual)) {
            description.append(' but was ');
            matcher.describeValueTo(actual, description);
            fail(description.get());
        } else {
            description.append(': Success');
            if (pass) {
                pass(description.get());
            }
        }
        return description;
    }

    /**
     * Copy all members of an object to another.
     * @param {object} source Source object.
     * @param {object} target Target object.
     */
    this.copyMembers = function(source, target) {
        for (method in source) {
            if (!(method in target)) {
                target[method] = source[method];
            }
        }
    };

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
    this.JsTestDriver = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);

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
            return assertThat(actual, matcher, message, _fail);
        };
    };

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
    this.JsUnitTest = function(params) {
        params = params ? params : {};
        var target = params.scope || JsUnitTest.Unit.Testcase.prototype;

        this.copyMembers(JsHamcrest.Matchers, target);

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

            return assertThat(actual, matcher, message, fail, pass);
        };
    };

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
    this.YUITest = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);
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
            return assertThat(actual, matcher, message, fail);
        };
    };

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
    this.QUnit = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);

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
            return assertThat(actual, matcher, message, fail, pass);
        };
    };

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
    this.jsUnity = function(params) {
        params = params ? params : {};
        var target = params.scope || jsUnity.env.defaultScope;
        var assertions = params.attachAssertions || false;

        this.copyMembers(JsHamcrest.Matchers, target);
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
            return assertThat(actual, matcher, message, fail);
        };
    };
    
    return this;
};
JsHamcrest.Integration = new JsHamcrest.Integration();

