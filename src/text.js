/**
 * @fileOverview Provides string-related matchers.
 */

/**
 * Asserts that the two strings are equals, ignoring case. Ex: <p>
 *
 * <pre>
 * assertThat('str', equalIgnoringCase('Str'));
 * </pre>
 *
 * @param {string} String.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'equalIgnoringCase' matcher.
 */
JsUnitTest.Hamcrest.Matchers.equalIgnoringCase = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.toUpperCase() == str.toUpperCase();
        },
        
        describeTo: function(description) {
            description.append('equal ignoring case "').append(str).append('"');
        }
    });
};

/**
 * Asserts that the actual value have a substring equals to the given string.
 * Ex: <p>
 *
 * <pre>
 * assertThat('string', containsString('tri'));
 * </pre>
 *
 * @param {string} String.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'containsString' matcher.
 */
JsUnitTest.Hamcrest.Matchers.containsString = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.indexOf(str) >= 0;
        },
        
        describeTo: function(description) {
            description.append('contains string "').append(str).append('"');
        }
    });
};

/**
 * Asserts that the actual value starts with the given string. Ex: <p>
 *
 * <pre>
 * assertThat('string', startsWith('str'));
 * </pre>
 *
 * @param {string} String.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'startsWith' matcher.
 */
JsUnitTest.Hamcrest.Matchers.startsWith = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.indexOf(str) == 0;
        },
        
        describeTo: function(description) {
            description.append('starts with ').appendLiteral(str);
        }
    });
};

/**
 * Asserts that the actual value ends with the given string. Ex: <p>
 *
 * <pre>
 * assertThat('string', endsWith('ring'));
 * </pre>
 *
 * @param {string} String.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'endsWith' matcher.
 */
JsUnitTest.Hamcrest.Matchers.endsWith = function(str) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.lastIndexOf(str) + str.length == actual.length;
        },
        
        describeTo: function(description) {
            description.append('ends with ').appendLiteral(str);
        }
    });
};

