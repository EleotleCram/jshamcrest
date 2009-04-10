/**
 * @fileOverview Provides collection-related matchers.
 */

/**
 * All the given matchers should match the assertion's actual value to be
 * sucessful. This matcher behaves pretty much like the JavaScript &&
 * operator (short-circuiting). Ex: <p>
 * assertThat([1,2,3], allOf(greaterThan(0)));
 * @param {array} arguments List of delegate matchers.
 * @return {object} 'allOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.allOf = function() {
    var args = arguments;
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        for (var i = 0; i < args.length; i++) {
            if (!args[i].matches(actual)) {
                return false;
            }
        }
        return true;
    });
};

/**
 * Any of the given matchers should match the assertion's actual value to be
 * sucessful. This matcher behaves pretty much like the JavaScript ||
 * operator (short-circuiting). Ex: <p>
 * assertThat([1,2,3], anyOf(equalTo(2)));
 * @param {array} arguments List of delegate matchers.
 * @return {object} 'allOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.anyOf = function() {
    var args = arguments;
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        for (var i = 0; i < args.length; i++) {
            if (args[i].matches(actual)) {
                return true;
            }
        }
        return false;
    });
};

/**
 * The assertion's actual value should be an array and must contain the
 * given expected value to be sucessful. Ex: <p>
 * assertThat([1,2,3], hasItem(3));
 * @param {array} expected Expected value.
 * @return {object} 'hasItem' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasItem = function(expected) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        for (var i = 0; i < actual.length; i++) {
            if (actual[i] == expected) {
                return true;
            }
        }
        return false;
    });
};

/**
 * This matcher must match at least one of the assertion's actual value (which
 * is an array) to be successful. Ex: <p>
 * assertThat([1,2,3], hasItemInArray(equalTo(2)));
 * @param {object} matcher Delegate matcher.
 * @return {object} 'hasItemInArray' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasItemInArray = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        for (var i = 0; i < actual.length; i++) {
            if (matcher.matches(actual[i])) {
                return true;
            }
        }
        return false;
    });
};

