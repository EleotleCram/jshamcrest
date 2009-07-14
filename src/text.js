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
 * @return {JsHamcrest.SimpleMatcher} 'equalIgnoringCase' matcher.
 */
JsHamcrest.Matchers.equalIgnoringCase = function(str) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'containsString' matcher.
 */
JsHamcrest.Matchers.containsString = function(str) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'startsWith' matcher.
 */
JsHamcrest.Matchers.startsWith = function(str) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.indexOf(str) === 0;
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
 * @return {JsHamcrest.SimpleMatcher} 'endsWith' matcher.
 */
JsHamcrest.Matchers.endsWith = function(str) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual.lastIndexOf(str) + str.length == actual.length;
        },

        describeTo: function(description) {
            description.append('ends with ').appendLiteral(str);
        }
    });
};

/**
 * Asserts that the actual value matches the given regular expression. Ex: <p>
 *
 * <pre>
 * assertThat('0xa4f2c', matches(/\b0[xX][0-9a-fA-F]+\b/));
 * </pre>
 *
 * @param {RegExp} regex Regular expression literal.
 * @return {JsHamcrest.SimpleMatcher} 'matches' matcher.
 */
JsHamcrest.Matchers.matches = function(regex) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return regex.test(actual);
        },

        describeTo: function(description) {
            description.append('matches ').appendLiteral(regex);
        }
    });
};

/**
 * Asserts that the actual value looks like an email address. Ex: <p>
 *
 * <pre>
 * assertThat('user@domain.com', emailAddress());
 * </pre>
 *
 * <b>Note: this matcher is not fully compliant with RFC2822 due to its
 * complexity.</b>
 *
 * @return {JsHamcrest.SimpleMatcher} 'emailAddress' matcher.
 */
JsHamcrest.Matchers.emailAddress = function() {
    var regex = /^([a-z0-9_\.\-\+])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/i;

    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return regex.test(actual);
        },

        describeTo: function(description) {
            description.append('email address');
        }
    });
};

