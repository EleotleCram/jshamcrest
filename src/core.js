/**
 * @fileOverview Provides core matchers.
 */

/**
 * Built-in matchers.
 * @namespace
 */
JsHamcrest.Matchers = {};

/**
 * The actual value must be any value considered truth by the JavaScript
 * engine. Ex: <p>
 *
 * <pre>
 * assertThat(10, truth());
 * assertThat({}, truth());
 * assertThat(0, not(truth()));
 * assertThat('', not(truth()));
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'truth' matcher.
 */
JsHamcrest.Matchers.truth = function() {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual;
        },

        describeTo: function(description) {
            description.append('truth');
        }
    });
};

/**
 * Delegate-only matcher frequently used to improve readability. Ex: <p>
 *
 * <pre>
 * assertThat(10, is(10));
 * assertThat(10, is(equalTo(10)));
 * </pre>
 *
 * @param {object} matcher Delegate matcher.
 * @return {JsHamcrest.SimpleMatcher} 'is' matcher.
 */
JsHamcrest.Matchers.is = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsHamcrest.isMatcher(matcher)) {
        matcher = JsHamcrest.Matchers.equalTo(matcher);
    }

    return new JsHamcrest.SimpleMatcher({
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
 * assertThat(10, not(20));
 * assertThat(10, not(equalTo(20)));
 * </pre>
 *
 * @param {object} matcher Delegate matcher.
 * @return {JsHamcrest.SimpleMatcher} 'not' matcher.
 */
JsHamcrest.Matchers.not = function(matcher) {
    // Uses 'equalTo' matcher if the given object is not a matcher
    if (!JsHamcrest.isMatcher(matcher)) {
        matcher = JsHamcrest.Matchers.equalTo(matcher);
    }

    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return !matcher.matches(actual);
        },

        describeTo: function(description) {
            description.append('not ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * The actual value must be equal to the given value to be successful.
 * Ex: <p>
 *
 * <pre>
 * assertThat(10, equalTo('10'));
 * </pre>
 *
 * @param {object} expected value.
 * @return {JsHamcrest.SimpleMatcher} 'equalTo' matcher.
 */
JsHamcrest.Matchers.equalTo = function(expected) {
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            if (expected instanceof Array || actual instanceof Array) {
                return JsHamcrest.isArraysEqual(expected, actual);
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
 * assertThat(myObj, anything());
 * assertThat(null, anything());
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'anything' matcher.
 */
JsHamcrest.Matchers.anything = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * assertThat(myObj, nil()); // myObj should be null or undefined
 * </pre>
 *
 * @return {JsHamcrest.SimpleMatcher} 'nil' matcher.
 */
JsHamcrest.Matchers.nil = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * assertThat(myObject, sameAs(anotherObj));
 * </pre>
 *
 * @param {object} expected Expected object.
 * @return {JsHamcrest.SimpleMatcher} 'sameAs' matcher.
 */
JsHamcrest.Matchers.sameAs = function(expected) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'raises' matcher
 */
JsHamcrest.Matchers.raises = function(exceptionName) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.CombinableMatcher} 'both' matcher.
 */
JsHamcrest.Matchers.both = function(matcher) {
    return new JsHamcrest.CombinableMatcher({
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
 * @return {JsHamcrest.CombinableMatcher} 'either' matcher.
 */
JsHamcrest.Matchers.either = function(matcher) {
    return new JsHamcrest.CombinableMatcher({
        matches: matcher.matches,
        describeTo: function(description) {
            description.append('either ').appendDescriptionOf(matcher);
        }
    });
};

/**
 * All the given values or matchers should match the actual value to be
 * sucessful. This matcher behaves pretty much like the JavaScript &&
 * operator (short-circuiting). Ex: <p>
 *
 * <pre>
 * assertThat(5, allOf([greaterThan(0), lessThan(10)]));
 * assertThat(5, allOf([5, lessThan(10)]));
 * assertThat(5, allOf(greaterThan(0), lessThan(10)));
 * assertThat(5, allOf(5, lessThan(10)));
 * </pre>
 *
 * @param {array} arguments List of delegate matchers.
 * @return {JsHamcrest.SimpleMatcher} 'allOf' matcher.
 */
JsHamcrest.Matchers.allOf = function() {
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                var matcher = args[i];
                if (!JsHamcrest.isMatcher(matcher)) {
                    matcher = JsHamcrest.Matchers.equalTo(matcher);
                }
                if (!matcher.matches(actual)) {
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
 * @return {JsHamcrest.SimpleMatcher} 'anyOf' matcher.
 */
JsHamcrest.Matchers.anyOf = function() {
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            for (var i = 0; i < args.length; i++) {
                var matcher = args[i];
                if (!JsHamcrest.isMatcher(matcher)) {
                    matcher = JsHamcrest.Matchers.equalTo(matcher);
                }
                if (matcher.matches(actual)) {
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

