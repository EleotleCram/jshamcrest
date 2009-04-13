/**
 * @fileOverview Provides collection-related matchers.
 */

/**
 * The actual value should be an array and it must contain at least one value
 * that matches the given value or matcher to be successful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasItem(3));
 * assertThat([1,2,3], hasItem(equalTo(3)));
 * </pre>
 *
 * @param {array} matcher Number or matcher.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasItem' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasItem = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsUnitTest.Hamcrest.isMatcher(matcher)) {
        matcher = JsUnitTest.Hamcrest.Matchers.equalTo(matcher);
    }

    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            // Should be an array
            if (!(actual instanceof Array)) {
                return false;
            }

            for (var i = 0; i < actual.length; i++) {
                if (matcher.matches(actual[i])) {
                    return true;
                }
            }
            return false;
        },

        describeTo: function(description) {
            description.append('array contains item ')
                    .appendDescriptionOf(matcher);
        }
    });
};

/**
 * The actual value should be an array and it must contain at least one value
 * that matches each given value or matcher to be sucessful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasItems(2, 3));
 * assertThat([1,2,3], hasItems(greaterThanOrEqualTo(2)));
 * </pre>
 *
 * @param {object...} arguments Values or matchers.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasItems' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasItems = function() {
    var items = [];
    for (var i = 0; i < arguments.length; i++) {
        items.push(JsUnitTest.Hamcrest.Matchers.hasItem(arguments[i]));
    }
    return JsUnitTest.Hamcrest.Matchers.allOf(items);
};

/**
 * The given array must contain the actual value to be successful. Ex: <p>
 * 
 * <pre>
 * assertThat(1, isIn([1,2,3]));
 * assertThat(1, isIn(1,2,3));
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'isIn' matcher.
 */
JsUnitTest.Hamcrest.Matchers.isIn = function() {
    var equalTo = JsUnitTest.Hamcrest.Matchers.equalTo;

    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }

    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                if (equalTo(args[i]).matches(actual)) {
                    return true;
                }
            }
            return false;
        },

        describeTo: function(description) {
            description.append('one of ').appendLiteral(args);
        }
    });
};

/**
 * The given array must contain the actual value to be successful. This is an
 * alias to 'isIn' matcher. Ex: <p>
 * <pre>
 * assertThat(1, oneOf([1,2,3]));
 * assertThat(1, oneOf(1,2,3));
 * </pre>
 *
 * @function
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'oneOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.oneOf = JsUnitTest.Hamcrest.Matchers.isIn;

/**
 * The actual value should be an array and it must be empty to be sucessful.
 * Ex: <p>
 *
 * <pre>
 * assertThat([], empty());
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'empty' matcher.
 */
JsUnitTest.Hamcrest.Matchers.empty = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual instanceof Array && actual.length == 0;
        },

        describeTo: function(description) {
            description.append('empty');
        }
    });
};

/**
 * The actual value should be an array and its size must match the given value
 * or matcher to be sucessful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasSize(3));
 * assertThat([1,2,3], hasSize(lessThan(5)));
 * </pre>
 *
 * @param {object} matcher Number or matcher.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasSize' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasSize = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsUnitTest.Hamcrest.isMatcher(matcher)) {
        matcher = JsUnitTest.Hamcrest.Matchers.equalTo(matcher);
    }

    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual instanceof Array && matcher.matches(actual.length);
        },

        describeTo: function(description) {
            description.append('has size ').appendDescriptionOf(matcher);
        }
    });
};

