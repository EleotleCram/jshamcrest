/*
 * JsHamcrest v@VERSION
 * http://github.com/danielfm/jshamcrest/tree/master
 *
 * Hamcrest port to JavaScript.
 *
 * Copyright (c) 2009 Daniel Fernandes Martins
 * Licensed under the BSD license.
 *
 * Revision: @REV
 * Date:     @DATE
 */
 
/**
 * @fileOverview Provides the main namespace, along with core abstractions.
 */

/**
 * Main namespace.
 * @namespace
 */
JsHamcrest = {
    /**
     * Library version.
     */
    version: '@VERSION',

    /**
     * Assert method that is capable of handling matchers. If the given matcher
     * fails, this method registers a failed/error'd assertion within the current
     * TestCase object. Ex: <p>
     *
     * <pre>
     * // Asserts that something is equal to x
     * assertThat(something, equalTo(x));
     * assertThat(something, equalTo(x), "Some description text");
     *
     * // Same here
     * assertThat(something, x);
     * assertThat(something, x, "Some description text");
     *
     * // Asserts that something evaluates to some value considered truth
     * assertThat(something);
     * </pre>
     *
     * @param {object} actual Actual value under test.
     * @param {object} matcher Matcher to assert the correctness of the actual
     * value.
     * @param {string} message Message that describes the assertion, if
     * necessary.
     * @param {function} fail Function to be called when the assertion fails.
     * @return {JsHamcrest.Description} Test result description.
     * @param {function} pass Function to be called when the assertion
     * succeeds.
     */
    assertThat: function(actual, matcher, message, fail, pass) {
        var description = new JsHamcrest.Description();
        var matchers = JsHamcrest.Matchers;

        // Actual value must be any value considered non-null by JavaScript
        if (matcher == null) {
            matcher = matchers.truth();
        }

        // Creates a 'equalTo' matcher if 'matcher' is not a valid matcher
        if (!JsHamcrest.isMatcher(matcher)) {
            matcher = matchers.equalTo(matcher);
        }

        if (!matcher.matches(actual)) {
            if (message) {
                description.append(message).append('. ');
            }

            description.append('Expected ');
            matcher.describeTo(description);
            description.append(' but was ');
            matcher.describeValueTo(actual, description);

            fail(description.get());
        } else {
            if (message) {
                description.append(message).append(': ');
            }
            description.append('Success');

            if (pass) {
                pass(description.get());
            }
        }
        return description;
    },

    /**
     * Returns if the given object is a matcher.
     * @param {object} obj Object.
     * @return {boolean} If the given object is a matcher.
     */
    isMatcher: function(obj) {
        return obj instanceof JsHamcrest.SimpleMatcher;
    },

    /**
     * Returns if the given arrays are equivalent.
     * @param {array} array Array.
     * @param {array} anotherArray Another array.
     * @return {booelan} If the given arrays are equivalent.
     */
    isArraysEqual: function(array, anotherArray) {
        if (array instanceof Array || anotherArray instanceof Array) {
            if (array.length != anotherArray.length) {
                return false;
            }

            for (var i = 0; i < array.length; i++) {
                var a = array[i];
                var b = anotherArray[i];

                if (a instanceof Array || b instanceof Array) {
                    return JsHamcrest.isArraysEqual(a, b);
                } else if (a != b) {
                    return false;
                }
            }
            return true;
        } else {
            return array == anotherArray;
        }
    },

    /**
     * Creates a simple matcher.
     * @class Builds a matcher object that uses external functions provided
     * by the caller in order to define the current matching logic.
     * @constructor
     * @param {object} params Configuration object.
     * @param {function} params.matches Matcher logic.
     * @param {function} params.describeTo Self description logic. This
     * function is used to create textual descriptions from matcher objects.
     * @param {function} [params.describeValueTo] This function is used to
     * describe the actual value of a test assertion. If not provided the
     * actual value will be described as a literal.
     */
    SimpleMatcher: function(params) {
        params = params || {};

        /**
         * Checks if this matcher matches the actual value.
         * @function
         * @param {object} actual Actual value.
         * @return {boolean} If they match or not.
         */
        this.matches = params.matches;

        /**
         * Describes this matcher's tasks to the given descriptor.
         * @function
         * @param {object} descriptor Descriptor.
         */
        this.describeTo = params.describeTo;

        // Replace the function to describe the actual value
        if (params.describeValueTo) {
            this.describeValueTo = params.describeValueTo;
        }
    },

    /**
     * Creates a combinable matcher.
     * @class Matcher that provides an easy way to wrap several matchers into
     * one.
     * @param {object} params Configuration object.
     * @param {function} params.matches Matcher logic.
     * @param {function} params.describeTo Self description logic. This
     * function is used to create textual descriptions from matcher objects.
     */
    CombinableMatcher: function(params) {
        // Call superclass' constructor
        JsHamcrest.SimpleMatcher.apply(this, arguments);

        params = params || {};

        /**
         * Wraps this matcher with the given one in such a way that both
         * matchers must match the actual value to be successful.
         * @param {object} anotherMatcher Another matcher.
         * @return {JsHamcrest.CombinableMatcher} Combinable matcher.
         */
        this.and = function(anotherMatcher) {
            var all = JsHamcrest.Matchers.allOf(this, anotherMatcher);
            return new JsHamcrest.CombinableMatcher({
                matches: all.matches,

                describeTo: function(description) {
                    description.appendDescriptionOf(all);
                }
            });
        };

        /**
         * Wraps this matcher with the given one in such a way that at least
         * one of the matchers must match the actual value to be successful.
         * @param {object} anotherMatcher Another matcher.
         * @return {JsHamcrest.CombinableMatcher} Combinable matcher.
         */
        this.or = function(anotherMatcher) {
            var any = JsHamcrest.Matchers.anyOf(this, anotherMatcher);
            return new JsHamcrest.CombinableMatcher({
                matches: any.matches,

                describeTo: function(description) {
                    description.appendDescriptionOf(any);
                }
            });
        };
    },

    /**
     * Creates a description.
     * @class Description is the object that builds assertion error messages.
     * @constructor
     */
    Description: function() {
        /**
         * Current content of this description.
         * @property
         * @type string
         * @private
         */
        var value = '';

        /**
         * Gets the current content of this description.
         * @return {string} Current content of this description.
         */
        this.get = function() {
            return value;
        }

        /**
         * Appends the description a self describing object to this
         * description.
         * @param {object} selfDescribing Any object that have a
         * <code>describeTo</code> method that accepts a description object as
         * argument.
         * @return {JsHamcrest.Description} this.
         */
        this.appendDescriptionOf = function(selfDescribing) {
            if (selfDescribing) {
                selfDescribing.describeTo(this);
            }
            return this;
        };

        /**
         * Appends a text to this description.
         * @param {string} text Text to append.
         * @return {JsHamcrest.Description} this.
         */
        this.append = function(text) {
            if (text != null) {
                value += text;
            }
            return this;
        };

        /**
         * Appends a JavaScript language's literals to this description.
         * @param {object} literal Literal to append.
         * @return {JsHamcrest.Description} this.
         */
        this.appendLiteral = function(literal) {
            if (literal === undefined) {
                this.append('undefined');
            } else if (literal === null) {
                this.append('null');
            } else if (literal instanceof Array) {
                this.appendValueList('[', ', ', ']', literal);
            } else if (typeof literal == 'string') {
                this.append('"' + literal + '"');
            } else if (literal instanceof Function) {
                this.append('Function');
            } else {
                this.append(literal);
            }
            return this;
        }

        /**
         * Appends a list of values to this description.
         * @param {string} start Start string.
         * @param {string} separator Separator string.
         * @param {string} end End string.
         * @param {array} list List of values.
         * @return {JsHamcrest.Description} this.
         */
        this.appendValueList = function(start, separator, end, list) {
            this.append(start);
            for (var i = 0; i < list.length; i++) {
                if (i > 0) {
                    this.append(separator);
                }
                this.appendLiteral(list[i]);
            }
            this.append(end);
            return this;
        };

        /**
         * Appends a list of self describing objects to this description.
         * @param {string} start Start string.
         * @param {string} separator Separator string.
         * @param {string} end End string.
         * @param {array} list List of self describing objects. These objects
         * must that have a <code>describeTo</code> method that accepts a
         * description object as argument.
         * @return {JsHamcrest.Description} this.
         */
        this.appendList = function(start, separator, end, list) {
            this.append(start);
            for (var i = 0; i < list.length; i++) {
                if (i > 0) {
                    this.append(separator);
                }
                this.appendDescriptionOf(list[i]);
            }
            this.append(end);
            return this;
        };
    }
};


/**
 * Describes the actual value to the given descriptor.
 * This method is optional and, if it's not present,
 * the actual value will be described as a JavaScript
 * literal.
 * @param {object} actual Actual value.
 * @param {object} descriptor Descriptor.
 */
JsHamcrest.SimpleMatcher.prototype.describeValueTo = function(actual, description) {
    description.appendLiteral(actual);
};


// CombinableMatcher is a specialization of SimpleMatcher
JsHamcrest.CombinableMatcher.prototype =
        new JsHamcrest.SimpleMatcher();

