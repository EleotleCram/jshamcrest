/**
 * @fileOverview Methods to allow integration to major JavaScript testing
 * frameworks.
 */

JsHamcrest.Integration = {

    /**
     *
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
     *
     */
    YUITest: function() {
        throw 'Not implemented yet.';
    }
};

