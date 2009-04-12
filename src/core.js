/**
 * @fileOverview Provides core matchers.
 */

/**
 * Built-in matchers.
 * @namespace
 */
JsUnitTest.Hamcrest.Matchers = {};

/**
 * Assert method that is capable of handling matchers. If the given matcher
 * fails, this method registers a failed/error'd assertion within the current
 * TestCase object.
 * @param {object} actual Actual value under test.
 * @param {object} matcher Matcher to assert the correctness of the actual
 * value.
 * @param {string} message Message that describes the assertion, if necessary.
 */
JsUnitTest.Hamcrest.Matchers.assertThat = function(actual, matcher, message) {
    // Creates a 'equalTo' matcher if 'matcher' is not a valid matcher
    if (!JsUnitTest.Hamcrest.isMatcher(matcher)) {
        matcher = JsUnitTest.Hamcrest.Matchers.equalTo(matcher);
    }
    
    if (!matcher.matches(actual)) {
        var description = new JsUnitTest.Hamcrest.Description();
        if (message) {
            description.append(message);
        }
        description.append('\nExpected: ');
        matcher.describeTo(description);
        description.append('\n     got: ').appendLiteral(actual).append('\n');
        this.fail(description.get());
    } else {
        this.pass();
    }
};

/**
 * Delegate-only matcher frequently used to improve readability. Ex: <p>
 *
 * <pre>
 * assertThat(10, is(equalTo(10)));
 * </pre>
 *
 * @param {object} matcher Delegate matcher.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'is' matcher.
 */
JsUnitTest.Hamcrest.Matchers.is = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return matcher.matches(actual);
        },
        
        describeTo: function(description) {
            description.append('is ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * The delegate matcher must not match to be successful. Ex: <p>
 *
 * <pre>
 * assertThat(10, not(equalTo(20)));
 * </pre>
 *
 * @param {object} matcher Delegate matcher.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'not' matcher.
 */
JsUnitTest.Hamcrest.Matchers.not = function(matcher) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return !matcher.matches(actual);
        },
        
        describeTo: function(description) {
            description.append('not ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * The actual number must be equal to the given number to be successful.
 * Ex: <p>
 *
 * <pre>
 * assertThat(10, equalTo('10'));
 * </pre>
 *
 * @param {object} expected value.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'equalTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.equalTo = function(expected) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            if (expected instanceof Array || actual instanceof Array) {
                return JsUnitTest.Hamcrest.isArraysEqual(expected, actual);
            }
            return actual == expected;
        },
        
        describeTo: function(description) {
            description.append('equal to ').appendLiteral(expected);
        }
    });
};

/**
 * Useless always-match matcher. Ex: <p>
 *
 * <pre>
 * assertThat(myObj, is(anything())); // I don't actually care about myObj
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'anything' matcher.
 */
JsUnitTest.Hamcrest.Matchers.anything = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return true;
        },
        
        describeTo: function(description) {
            description.append('anything');
        }
    });
};

/**
 * The actual value must be null (or undefined) to be successful. Ex: <p>
 *
 * <pre>
 * assertThat(myObj, is(nil())); // myObj should be null or undefined
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'nil' matcher.
 */
JsUnitTest.Hamcrest.Matchers.nil = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual == null;
        },
        
        describeTo: function(description) {
            description.appendLiteral(null);
        }
    });
};

/**
 * The actual value must be the same as the given value to be successful.
 * Ex: <p>
 *
 * <pre>
 * assertThat(myObject, is(sameAs(anotherObj)));
 * </pre>
 *
 * @param {object} expected Expected object.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'sameAs' matcher.
 */
JsUnitTest.Hamcrest.Matchers.sameAs = function(expected) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual === expected;
        },
        
        describeTo: function(description) {
            description.append('same as ').appendLiteral(expected);
        }
    });
};

/**
 * The actual value is a function and, when invoked, it should thrown an
 * exception with the given name to be successful. Ex: <p>
 *
 * <pre>
 * var MyException = function(message) {
 *   this.name = 'MyException';
 *   this.message = message;
 * };
 * 
 * var myFunction = function() {
 *   // Do something dangerous...
 *   throw new MyException('Unexpected error');
 * }
 *
 * assertThat(myFunction, raises('MyException'));
 * </pre>
 *
 * @param {string} exceptionName Name of the expected exception.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'raises' matcher
 */
JsUnitTest.Hamcrest.Matchers.raises = function(exceptionName) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actualFunction) {
            try {
                actualFunction();
            } catch (e) {
                if (e.name == exceptionName) {
                    return true;
                } else {
                    throw e;
                }
            }
            return false;
        },
        
        describeTo: function(description) {
            description.append('raises ').append(exceptionName);
        }
    });
}

/**
 * Creates a combinable matcher where the actual value must match all matchers
 * to be successful. Ex: <p>
 *
 * <pre>
 * assertThat(10, both(greaterThan(5)).and(lessThan(20)));
 * </pre>
 *
 * @param {object} matcher Matcher that should be turn into a combinable
 * matcher.
 * @return {JsUnitTest.Hamcrest.CombinableMatcher} 'both' matcher.
 */
JsUnitTest.Hamcrest.Matchers.both = function(matcher) {
    return new JsUnitTest.Hamcrest.CombinableMatcher({
        allOf: true,
        matches: matcher.matches,
        
        describeTo: function(description) {
            description.append('both ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * Creates a combinable matcher where the actual value must match at least one
 * matcher to be successful. Ex: <p>
 *
 * <pre>
 * assertThat(10, either(lessThan(20)).or(greaterThan(50)));
 * </pre>
 *
 * @param {object} matcher Matcher that should be turn into a combinable
 * matcher.
 * @return {JsUnitTest.Hamcrest.CombinableMatcher} 'either' matcher.
 */
JsUnitTest.Hamcrest.Matchers.either = function(matcher) {
    return new JsUnitTest.Hamcrest.CombinableMatcher({
        allOf: false,
        matches: matcher.matches,
        
        describeTo: function(description) {
            description.append('either ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * All the given matchers should match the actual value to be sucessful. This
 * matcher behaves pretty much like the JavaScript && operator
 * (short-circuiting). Ex: <p>
 *
 * <pre>
 * assertThat(5, allOf(greaterThan(0), lessThan(10)));
 * </pre>
 *
 * @param {array} arguments List of delegate matchers.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'allOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.allOf = function() {
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                if (!args[i].matches(actual)) {
                    return false;
                }
            }
            return true;
        },
        
        describeTo: function(description) {
            description.appendList('(', ' and ', ')', args);
        }
    });
};

/**
 * At least one of the given matchers should match the actual value to be
 * sucessful. This matcher behaves pretty much like the JavaScript ||
 * operator (short-circuiting). Ex: <p>
 *
 * <pre>
 * assertThat(5, not(anyOf(lessThan(0), greaterThan(100))));
 * </pre>
 *
 * @param {array} arguments List of delegate matchers.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'allOf' matcher.
 */
JsUnitTest.Hamcrest.Matchers.anyOf = function() {
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                if (args[i].matches(actual)) {
                    return true;
                }
            }
            return false;
        },
        
        describeTo: function(description) {
            description.appendList('(', ' or ', ')', args);
        }
    });
};

