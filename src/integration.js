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
        target.assertThat = JsHamcrest.assertThat;
    },

    /**
     * YUITest integration.
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
        YAHOO.util.Assert.that = JsHamcrest.assertThat;

        // Dumb testCase.pass() implementation
        target.Assert.pass = function() { };
    }
};

