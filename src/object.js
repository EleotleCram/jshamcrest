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
 * @return {JsHamcrest.SimpleMatcher} 'hasMember' matcher.
 */
JsHamcrest.Matchers.hasMember = function(memberName) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'hasFunction' matcher.
 */
JsHamcrest.Matchers.hasFunction = function(functionName) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'instanceOf' matcher.
 */
JsHamcrest.Matchers.instanceOf = function(clazz) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return !!(actual instanceof clazz);
        },

        describeTo: function(description) {
            var className = clazz.name ? clazz.name : 'something else';
            description.append('instance of ').append(className);
        }
    });
};

/**
 * Asserts that the actual object is of the specified type. Ex: <p>
 *
 * <pre>
 * assertThat("text", typeOf("string"));
 * </pre>
 *
 * @param {function} typeName Type name.
 * @return {JsHamcrest.SimpleMatcher} 'instanceOf' matcher.
 */
JsHamcrest.Matchers.typeOf = function(typeName) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return (typeof actual == typeName);
        },

        describeTo: function(description) {
            description.append('typeof ').append('"').append(typeName)
                    .append('"');
        }
    });
};

/**
 * Asserts that the actual value is an object. Ex: <p>
 *
 * <pre>
 * assertThat({}, object());
 * assertThat(10, not(object()));
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'object' matcher.
 */
JsHamcrest.Matchers.object = function() {
    return new JsHamcrest.Matchers.instanceOf(Object);
};

/**
 * Asserts that the actual value is a string. Ex: <p>
 *
 * <pre>
 * assertThat("text", string());
 * assertThat(10, not(string()));
 * <pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'string' matcher.
 */
JsHamcrest.Matchers.string = function() {
    return new JsHamcrest.Matchers.typeOf('string');
};

/**
 * Asserts that the actual value is a number. Ex: <p>
 *
 * <pre>
 * assertThat(10, number());
 * assertThat(10.0, number());
 * assertThat("text", not(number()));
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'number' matcher.
 */
JsHamcrest.Matchers.number = function() {
    return new JsHamcrest.Matchers.typeOf('number');
};

/**
 * Asserts that the actual value is a boolean. Ex: <p>
 *
 * <pre>
 * assertThat(true, bool());
 * assertThat(false, bool());
 * assertThat("text" not(bool()));
 * <pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'bool' matcher.
 */
JsHamcrest.Matchers.bool = function() {
    return new JsHamcrest.Matchers.typeOf('boolean');
};

/**
 * Asserts that the actual object is a function. Ex: <p>
 *
 * <pre>
 * assertThat(function() {}, func());
 * assertThat("text", not(func()));
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'func' matcher.
 */
JsHamcrest.Matchers.func = function() {
    return new JsHamcrest.Matchers.typeOf('function');
};
