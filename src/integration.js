/**
 * Integration utilities.
 */
JsHamcrest.Integration = new (function() {

    /**
     * Generic assert function.
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
     * Copies all members of an object to another.
     */
    this.copyMembers = function(source, target) {
        for (var method in source) {
            if (!(method in target)) {
                target[method] = source[method];
            }
        }
    };

    /**
     * JsTestDriver integration.
     */
    this.JsTestDriver = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);

        // Function called when an assertion fails.
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

        // Assertion method exposed to JsTestDriver.
        target.assertThat = function (actual, matcher, message) {
            return assertThat(actual, matcher, message, _fail);
        };
    };

    /**
     * JsUnitTest integration.
     */
    this.JsUnitTest = function(params) {
        params = params ? params : {};
        var target = params.scope || JsUnitTest.Unit.Testcase.prototype;

        this.copyMembers(JsHamcrest.Matchers, target);

        // Assertion method exposed to JsUnitTest.
        target.assertThat = function (actual, matcher, message) {
            var self = this;

            // Function called when an assertion executes successfully.
            var pass = function() {
                self.pass();
            };

            // Function called when an assertion fails.
            var fail = function(message) {
                self.fail(message);
            };

            return assertThat(actual, matcher, message, fail, pass);
        };
    };

    /**
     * YUITest (Yahoo UI) integration.
     */
    this.YUITest = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);
        target.Assert = YAHOO.util.Assert;

        // Function called when an assertion fails.
        var fail = function(message) {
            YAHOO.util.Assert.fail(message);
        };

        // Assertion method exposed to YUITest.
        YAHOO.util.Assert.that = function(actual, matcher, message) {
            return assertThat(actual, matcher, message, fail);
        };
    };

    /**
     * QUnit (JQuery) integration.
     */
    this.QUnit = function(params) {
        params = params ? params : {};
        var target = params.scope || window;

        this.copyMembers(JsHamcrest.Matchers, target);

        // Function called when an assertion executes successfully.
        var pass = function(message) {
            QUnit.ok(true, message);
        };

        // Function called when an assertion fails.
        var fail = function(message) {
            QUnit.ok(false, message);
        };

        // Assertion method exposed to QUnit.
        target.assertThat = function(actual, matcher, message) {
            return assertThat(actual, matcher, message, fail, pass);
        };
    };

    /**
     * jsUnity integration.
     */
    this.jsUnity = function(params) {
        params = params ? params : {};
        var target = params.scope || jsUnity.env.defaultScope;
        var assertions = params.attachAssertions || false;

        this.copyMembers(JsHamcrest.Matchers, target);
        if (assertions) {
            jsUnity.attachAssertions(target);
        }

        // Function called when an assertion fails.
        var fail = function(message) {
            throw message;
        };

        // Assertion method exposed to jsUnity.
        target.assertThat = function(actual, matcher, message) {
            return assertThat(actual, matcher, message, fail);
        };
    },

    /**
     * Screw.Unit integration.
     */
    this.screwunit = function(params) {
        params = params ? params : {};
        var target = params.scope || Screw.Matchers;

        this.copyMembers(JsHamcrest.Matchers, target);

        // Function called when an assertion fails.
        var fail = function(message) {
            throw message;
        };

        // Assertion method exposed to jsUnity.
        target.assertThat = function(actual, matcher, message) {
            return assertThat(actual, matcher, message, fail);
        };
    };
    
    return this;
})();

