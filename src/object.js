/**
 * @fileOverview Provides object-related matchers.
 */

/**
 * Asserts that the actual object contains the given member (variable or
 * function). Ex: <p>
 *
 * <pre>
 * assertThat(myObj, hasMember('name'));
 * </pre>
 *
 * @param {string} memberName Member name.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasMember' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasMember = function(memberName) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            try {
                return memberName in actual;
            } catch (e) { }
            return false;
        },

        describeTo: function(description) {
            description.append('has member ').appendLiteral(memberName);
        }
    });
};

/**
 * Asserts that the actual object contains the given function. Ex: <p>
 *
 * <pre>
 * assertThat(myObj, hasFunction('getName'));
 * </pre>
 *
 * @param {string} property Property name.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasFunction' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasFunction = function(functionName) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            try {
                return functionName in actual && 
                        actual[functionName] instanceof Function;
            } catch (e) { }
            return false;
        },

        describeTo: function(description) {
            description.append('has function ').appendLiteral(functionName);
        }
    });
};

/**
 * Asserts that the actual object is instance of the given class. Ex: <p>
 *
 * <pre>
 * assertThat(myObj, instanceOf(Array));
 * </pre>
 *
 * @param {function} clazz Constructor function.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'instanceOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.instanceOf = function(clazz) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return !!(actual instanceof clazz);
        },

        describeTo: function(description) {
            var className = clazz.name ? clazz.name : 'a class';
            description.append('instance of ').append(className);
        }
    });
};

