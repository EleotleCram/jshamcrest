/**
 * @fileOverview Provides object-related matchers.
 */

/**
 * Asserts that the actual object contains the given property. Ex: <p>
 *
 * <pre>
 * assertThat(myObj, hasProperty('name'));
 * </pre>
 *
 * @param {string} property Property name.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'hasProperty' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasProperty = function(property) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            try {
                return property in actual;
            } catch (e) { }
            return false;
        },

        describeTo: function(description) {
            description.append('has property ').appendLiteral(property);
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

