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

        for (method in source) {
            target[method] = source[method];
        }

        target.assertThat = JsHamcrest.assertThat;
    },

    /**
     * YUITest (Yahoo UI) integration.
     */
    YUITest: function() {
        throw 'Not implemented yet.';
    }
};

