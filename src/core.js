/**
 * @fileOverview Provides the core matchers.
 */

/**
 * Aaaaa
 * @namespace
 */
JsUnitTest.Hamcrest.Matchers = {};

/**
 * Assert method to be used with the provided matchers. If the given matcher
 * fails, this method registers a failed/error'd assertion within the current
 * TestCase object.
 * @param {object} actual Actual value under test.
 * @param {object} matcher Matcher to assert the correctness of the actual
 * value.
 * @param {string} message Message that describes the assertion, if necessary.
 */
JsUnitTest.Hamcrest.Matchers.assertThat = function(actual, matcher, message) {
    if (!matcher.matches(actual)) {
        // TODO Create a Description class to build rich assert error messages
        this.fail('Hamcrest: assertion failed');
    } else {
        this.pass();
    }
};

/**
 * Sugar matcher frequently used to improve readability. Ex: <p>
 * assertThat(10, is(equalTo(10)));
 * @param {object} matcher Delegate matcher.
 * @return {object} 'is' matcher.
 */
JsUnitTest.Hamcrest.Matchers.is = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return matcher.matches(actual);
    });
};

/**
 * Negates the result of a delegate matcher. Ex: <p>
 * assertThat(10, not(equalTo(20)));
 * @param {object} matcher Delegate matcher.
 * @return {object} 'not' matcher.
 */
JsUnitTest.Hamcrest.Matchers.not = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return !matcher.matches(actual);
    });
};

/**
 * Compares the actual value with the expected value. Ex: <p>
 * assertThat(10, equalTo(10));
 * @param {object} expected value.
 * @return {object} 'equalTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.equalTo = function(expected) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual == expected;
    });
};

/**
 * Do-nothing matcher. Ex: <p>
 * assertThat(myObj, is(anything())); // Actually I don't care about myObj
 * @return {object} 'anything' matcher.
 */
JsUnitTest.Hamcrest.Matchers.anything = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return true;
    });
};

/**
 * Matcher that compares the actual value agains null. Ex: <p>
 * assertThat(myObj, is(nil())); // should be null or undefined
 * @return {object} 'nil' matcher.
 */
JsUnitTest.Hamcrest.Matchers.nil = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual == null;
    });
};

/**
 * Matcher that compares the identity of two objects. Ex: <p>
 * assertThat(myObject, is(sameAs(anotherObj))); // Should point to the SAME instance
 * @param {object} expected Expected object.
 * @return {object} 'sameAs' matcher.
 */
JsUnitTest.Hamcrest.Matchers.sameAs = function(expected) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual === expected;
    });
};

/**
 * Matcher used to create a combinable matcher where the assertion's actual
 * value must match all matchers. Ex: <p>
 * assertThat(10, both(equalTo(10)).and(lessThan(20))); // All matchers must match
 * @param {object} matcher Matcher that should be turn into a combinable
 * matcher.
 * @return {object} 'both' matcher.
 */
JsUnitTest.Hamcrest.Matchers.both = function(matcher) {
    return new JsUnitTest.Hamcrest.CombinableMatcher(matcher);
};

/**
 * Matcher used to create a combinable matcher where the assertion's actual
 * value must match any matchers. Ex: <p>
 * assertThat(10, either(equalTo(10)).or(lessThan(50))); // At least one matcher must match
 * @param {object} matcher Matcher that should be turn into a combinable
 * matcher.
 * @return {object} 'either' matcher.
 */
JsUnitTest.Hamcrest.Matchers.either = function(matcher) {
    return new JsUnitTest.Hamcrest.CombinableMatcher(matcher);
};

