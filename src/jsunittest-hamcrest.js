/*
 * JsUnitTest-Hamcrest v@VERSION
 * http://github.com/danielfm/jsunittest-hamcrest/tree/master
 *
 * Plug-in to JsUnitTest that adds a collection of useful matchers for building
 * test expressions.
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
 * JsUnitTest main namespace.
 * @namespace
 */
JsUnitTest = JsUnitTest;

/**
 * Main namespace.
 * @namespace
 */
JsUnitTest.Hamcrest = {
    /**
     * Library version.
     */
    version: '@VERSION',

    /**
     * Copies the properties of the given objects to the
     * <code>JsUnitTest.Unit.Testcase</code> prototype.
     * @param {object} matchers Object that contains the matchers to be
     * installed.
     */
    installMatchers: function(matchers) {
        for (method in matchers) {
            JsUnitTest.Unit.Testcase.prototype[method] = matchers[method];
        }
    },

    /**
     * Returns if the given object is a matcher.
     * @param {object} obj Object.
     * @return {boolean} If the given object is a matcher.
     */
    isMatcher: function(obj) {
        return obj instanceof JsUnitTest.Hamcrest.SimpleMatcher;
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
                    return JsUnitTest.Hamcrest.isArraysEqual(a, b);
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
        JsUnitTest.Hamcrest.SimpleMatcher.apply(this, arguments);

        params = params || {};

        /**
         * Wraps this matcher with the given one in such a way that both
         * matchers must match the actual value to be successful.
         * @param {object} anotherMatcher Another matcher.
         * @return {JsUnitTest.Hamcrest.CombinableMatcher} Combinable matcher.
         */
        this.and = function(anotherMatcher) {
            var all = JsUnitTest.Hamcrest.Matchers.allOf(this, anotherMatcher);
            return new JsUnitTest.Hamcrest.CombinableMatcher({
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
         * @return {JsUnitTest.Hamcrest.CombinableMatcher} Combinable matcher.
         */
        this.or = function(anotherMatcher) {
            var any = JsUnitTest.Hamcrest.Matchers.anyOf(this, anotherMatcher);
            return new JsUnitTest.Hamcrest.CombinableMatcher({
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
         * @return {JsUnitTest.Hamcrest.Description} this.
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
         * @return {JsUnitTest.Hamcrest.Description} this.
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
         * @return {JsUnitTest.Hamcrest.Description} this.
         */
        this.appendLiteral = function(literal) {
            if (literal === undefined) {
                this.append('<undefined>');
            } else if (literal === null) {
                this.append('<null>');
            } else if (literal instanceof Array) {
                this.appendValueList('[', ', ', ']', literal);
            } else if (typeof literal == 'number') {
                this.append(literal);
            } else if (typeof literal == 'string') {
                this.append('"' + literal + '"');
            } else if (literal instanceof Function) {
                this.append('<Function>');
            } else {
                this.append('{' + literal + '}');
            }
            return this;
        }

        /**
         * Appends a list of values to this description.
         * @param {string} start Start string.
         * @param {string} separator Separator string.
         * @param {string} end End string.
         * @param {array} list List of values.
         * @return {JsUnitTest.Hamcrest.Description} this.
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
         * @return {JsUnitTest.Hamcrest.Description} this.
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

// CombinableMatcher is a generalization of SimpleMatcher
JsUnitTest.Hamcrest.CombinableMatcher.prototype =
        new JsUnitTest.Hamcrest.SimpleMatcher();

