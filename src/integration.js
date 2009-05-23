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
     * JsUnitTest integration.
     */
    JsUnitTest: function() {
        var source = JsHamcrest.Matchers;
        var target = JsUnitTest.Unit.Testcase.prototype;

        // Add assertions to test case
        for (method in source) {
            target[method] = source[method];
        }

        // Add assertion method
        target.assertThat = function (actual, matcher, message) {
            var self = this;
            var pass = function() {
                self.pass();
            };

            var fail = function(message) {
                self.fail(message);
            };

            return JsHamcrest.assertThat(actual, matcher, message, pass, fail);
        };
    },

    /**
     * YUITest (Yahoo UI) integration.
     */
    YUITest: function() {
        var source = JsHamcrest.Matchers;
        var target = YAHOO.tool.TestCase.prototype;

        // Add assertions to test case
        for (method in source) {
            target[method] = source[method];
        }

        // Add assertion method
        target.Assert = YAHOO.util.Assert;

        var pass = function() {
        };

        var fail = function() {
        };
        YAHOO.util.Assert.that = JsHamcrest.assertThat;

        // Dumb testCase.pass() implementation
        target.Assert.pass = function() { };
    },

    /**
     * QUnit (JQuery) integration.
     */
    QUnit: function() {

        var source = JsHamcrest.Matchers;
        var target = window;

        // Add assertions to test case
        for (method in source) {
            target[method] = source[method];
        }

        // Add assertion method
        target.assertThat = function(actual, matcher, message) {
            var pass = function(message) {
                QUnit.ok(true, message);
            };

            var fail = function(message) {
                QUnit.ok(false, message);
            };

            return JsHamcrest.assertThat(actual, matcher, message, pass, fail);
        };
    }
};

