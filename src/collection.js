/**
 * @fileOverview Provides collection-related matchers.
 */

/**
 * The actual value should be an array and must contain the given expected
 * value to be sucessful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasItem(equalTo(3)));
 * assertThat([1,2,3], hasItem(3));
 * </pre>
 *
 * @param {array} expected Expected value.
 * @return {object} 'hasItem' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasItem = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            // Should be an array
            if (!(actual instanceof Array)) {
                return false;
            }
            
            // Uses 'equalTo' matcher if the given object is not a matcher
            if (!JsUnitTest.Hamcrest.isMatcher(matcher)) {
                matcher = JsUnitTest.Hamcrest.Matchers.equalTo(matcher);
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
 * The actual value should be an array and must contain the given expected
 * values to be sucessful. Ex: <p>
 *
 * <pre>
 * assertThat([1,2,3], hasItems(2, 3));
 * assertThat([1,2,3], hasItems(greaterThanOrEqualTo(2)));
 * </pre>
 *
 * @param {object...} arguments Values or matchers.
 * @return {object} 'hasItems' matcher.
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
 * @return {object} 'isIn' matcher.
 */
JsUnitTest.Hamcrest.Matchers.isIn = function() {
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                if (args[i] == actual) {
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
 * @return {object} 'oneOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.oneOf = JsUnitTest.Hamcrest.Matchers.isIn;

