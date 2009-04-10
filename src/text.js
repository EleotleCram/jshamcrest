/**
 * @fileOverview Provides string-related matchers.
 */

/**
 * Asserts that the two strings are equals ignoring case. Ex: <p>
 * assertThat('str', equalIgnoringCase('Str'));
 * @param {string} String.
 * @return {object} 'equalIgnoringCase' matcher.
 */
JsUnitTest.Hamcrest.Matchers.equalIgnoringCase = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual.toUpperCase() == str.toUpperCase();
    });
};

/**
 * Asserts that the assertion's actual value (which is a string) have a
 * substring equals to the given string. Ex: <p>
 * assertThat('string', containsString('tri'));
 * @param {string} String.
 * @return {object} 'containsString' matcher.
 */
JsUnitTest.Hamcrest.Matchers.containsString = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual.indexOf(str) >= 0;
    });
};

/**
 * Asserts that the assertion's actual value (which is a string) starts with
 * the given string. Ex: <p>
 * assertThat('string', startsWith('str'));
 * @param {string} String.
 * @return {object} 'startsWith' matcher.
 */
JsUnitTest.Hamcrest.Matchers.startsWith = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual.indexOf(str) == 0;
    });
};

/**
 * Asserts that the assertion's actual value (which is a string) ends with
 * the given string. Ex: <p>
 * assertThat('string', endsWith('ring'));
 * @param {string} String.
 * @return {object} 'endsWith' matcher.
 */
JsUnitTest.Hamcrest.Matchers.endsWith = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual.lastIndexOf(str) + str.length == actual.length;
    });
};

