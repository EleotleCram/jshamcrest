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
     * JsUnitTest.Unit.Testcase prototype.
     * @param {object} matchers Object that contains the matchers to be
     * installed.
     */
    installMatchers: function(matchers) {
        for (method in matchers) {
            JsUnitTest.Unit.Testcase.prototype[method] = matchers[method];
        }
    },
    
    /**
     * Creates a matcher that handles a single value.
     * @class Matcher that handles a single value.
     * @param {function} matcher Matcher function. This function should expect
     * one argument, which is the assertion's 'actual value.
     */
    SimpleMatcher: function(matcher) {
        
        /**
         * Checks if this matcher matches the assertion's actual value.
         * @function
         * @param {object} actual Assertion's actual value.
         * @return {boolean} If they match or not.
         */
        this.matches = matcher;
    },
    
    /**
     * Creates a combinable matcher.
     * @class Matcher that is capable of wrapping several matchers into one.
     * @param {object} matcher Root matcher.
     */
    CombinableMatcher: function(matcher) {
        
        /**
         * Checks if this combinable matcher matches the assertion's actual
         * value.
         * @param {object} actual Assertion's actual value.
         * @return {boolean} If they match or not.
         */
        this.matches = function(actual) {
            return matcher.matches(actual);
        };
        
        /**
         * Wraps this matcher with the given one in such a way that all
         * matchers must match the assertion's actual value in order to be
         * successful. This matcher is short-circuiting, just like the
         * JavaScript's && operator.
         * @param {object} anotherMatcher Another matcher.
         * @return {boolean} Combinable matcher.
         */
        this.and = function(anotherMatcher) {
            return new JsUnitTest.Hamcrest.CombinableMatcher(
                Matchers.allOf(matcher, anotherMatcher));
        };
        
        /**
         * Wraps this matcher with the given one in such a way that at least
         * one of the matchers must match the assertion's actual value in order
         * to be successful. This matcher is short-circuiting, just like the
         * JavaScript's || operator.
         * @param {object} anotherMatcher Another matcher.
         * @return {boolean} Combinable matcher.
         */
        this.or = function(anotherMatcher) {
            return new JsUnitTest.Hamcrest.CombinableMatcher(
                Matchers.anyOf(matcher, anotherMatcher));
        };
    }
};

