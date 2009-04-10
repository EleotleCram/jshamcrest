/**
 * @fileOverview Provides object-related matchers.
 */

/**
 * Asserts that the assertion's actual object contains the given property.
 * Ex: <p>
 * assertThat(myObj, hasProperty('name'));
 * @param {string} property Property name.
 * @return {object} 'hasProperty' matcher.
 */
JsUnitTest.Hamcrest.Matchers.hasProperty = function(property) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        try {
            return property in actual;
        } catch (e) { }
        return false;
    });
};

/**
 * Asserts that the assertion's actual object is instance of the given class.
 * Ex: <p>
 * assertThat(myObj, instanceOf(Array));
 * @param {function} clazz Constructor function.
 * @return {object} 'instanceOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.instanceOf = function(clazz) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return !!(actual instanceof clazz);
    });
};

