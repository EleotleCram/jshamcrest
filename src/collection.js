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
 * @return {JsHamcrest.SimpleMatcher} 'hasItem' matcher.
 */
JsHamcrest.Matchers.hasItem = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsHamcrest.isMatcher(matcher)) {
        matcher = JsHamcrest.Matchers.equalTo(matcher);
    }

    return new JsHamcrest.SimpleMatcher({
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
 * The actual value should be an array and the given values or matchers must
 * match at least one item to be sucessful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasItems(2, 3));
 * assertThat([1,2,3], hasItems(greaterThan(2)));
 * </pre>
 *
 * @param {object...} arguments Values or matchers.
 * @return {JsHamcrest.SimpleMatcher} 'hasItems' matcher.
 */
JsHamcrest.Matchers.hasItems = function() {
    var items = [];
    for (var i = 0; i < arguments.length; i++) {
        items.push(JsHamcrest.Matchers.hasItem(arguments[i]));
    }
    return JsHamcrest.Matchers.allOf(items);
};

/**
 * The given array must contain the actual value to be successful. Ex: <p>
 * 
 * <pre>
 * assertThat(1, isIn([1,2,3]));
 * assertThat(1, isIn(1,2,3));
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'isIn' matcher.
 */
JsHamcrest.Matchers.isIn = function() {
    var equalTo = JsHamcrest.Matchers.equalTo;

    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }

    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'oneOf' matcher.
 */
JsHamcrest.Matchers.oneOf = JsHamcrest.Matchers.isIn;

/**
 * The actual value should be an array and it must be empty to be sucessful.
 * Ex: <p>
 *
 * <pre>
 * assertThat([], empty());
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'empty' matcher.
 */
JsHamcrest.Matchers.empty = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'hasSize' matcher.
 */
JsHamcrest.Matchers.hasSize = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsHamcrest.isMatcher(matcher)) {
        matcher = JsHamcrest.Matchers.equalTo(matcher);
    }

    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual instanceof Array && matcher.matches(actual.length);
        },

        describeTo: function(description) {
            description.append('has size ').appendDescriptionOf(matcher);
        },

        describeValueTo: function(actual, description) {
            if (actual instanceof Array) {
                description.append(actual.length);
            } else {
                description.appendLiteral(actual);
            }
        }
    });
};

