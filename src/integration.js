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
     * JsUnitTest integration.
     */
    JsUnitTest: function() {
        var target = JsUnitTest.Unit.Testcase.prototype;

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

            return JsHamcrest.assertThat(actual, matcher, message, pass, fail);
        };
    },

    /**
     * YUITest (Yahoo UI) integration.
     */
    YUITest: function() {
        var target = window;

        JsHamcrest.Integration._copyMatchers(target);
        target.Assert = YAHOO.util.Assert;

        /**
         * Assertion method exposed to YUITest.
         * @ignore
         */
        YAHOO.util.Assert.that = function(actual, matcher, message) {

            /**
             * Function called when an assertion executes successfully.
             * @ignore
             */
            var pass = function() {
            };

            /**
             * Function called when an assertion fails.
             * @ignore
             */
            var fail = function(message) {
                YAHOO.util.Assert.fail(message);
            };

            return JsHamcrest.assertThat(actual, matcher, message, pass, fail);
        };
    },

    /**
     * QUnit (JQuery) integration.
     */
    QUnit: function() {
        var target = window;

        JsHamcrest.Integration._copyMatchers(target);

        /**
         * Assertion method exposed to QUnit.
         * @ignore
         */
        target.assertThat = function(actual, matcher, message) {

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

            return JsHamcrest.assertThat(actual, matcher, message, pass, fail);
        };
    }
};

