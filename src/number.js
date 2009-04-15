/**
 * @fileOverview Provides number-related matchers.
 */

/**
 * Asserts that the actual number is greater than the given threshold. Ex: <p>
 *
 * <pre>
 * assertThat(10, greaterThan(5));
 * </pre>
 *
 * @param {number} threshold Threshold number.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'greaterThan' matcher.
 */
JsUnitTest.Hamcrest.Matchers.greaterThan = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual > threshold;
        },

        describeTo: function(description) {
            description.append('greater than ').appendLiteral(threshold);
        }
    });
};

/**
 * Asserts that the actual number is greater than or equal to the given
 * threshold. Ex: <p>
 *
 * <pre>
 * assertThat(10, greaterThanOrEqualTo(5));
 * </pre>
 *
 * @param {number} threshold Threshold number.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'greaterThanOrEqualTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.greaterThanOrEqualTo = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual >= threshold;
        },

        describeTo: function(description) {
            description.append('greater than or equal to ')
                    .appendLiteral(threshold);
        }
    });
};

/**
 * Asserts that the actual number is less than the given threshold. Ex: <p>
 *
 * <pre>
 * assertThat(5, lessThan(10));
 * </pre>
 *
 * @param {number} threshold Threshold number.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'lessThan' matcher.
 */
JsUnitTest.Hamcrest.Matchers.lessThan = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual < threshold;
        },

        describeTo: function(description) {
            description.append('less than ').appendLiteral(threshold);
        }
    });
};

/**
 * Asserts that the actual number is less than or equal to the given threshold.
 * Ex: <p>
 *
 * <pre>
 * assertThat(5, lessThanOrEqualTo(10));
 * </pre>
 *
 * @param {number} threshold Threshold number.
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'lessThanOrEqualTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.lessThanOrEqualTo = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual <= threshold;
        },

        describeTo: function(description) {
            description.append('less than or equal to ').append(threshold);
        }
    });
};

/**
 * Asserts that the actual value is not a number. Ex: <p>
 *
 * <pre>
 * assertThat(Math.sqrt(-1), notANumber());
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'notANumber' matcher.
 */
JsUnitTest.Hamcrest.Matchers.notANumber = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return isNaN(actual);
        },

        describeTo: function(description) {
            description.append('not a number');
        }
    });
};

/**
 * Asserts that the actual value is even. Ex: <p>
 *
 * <pre>
 * assertThat(4, even());
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'even' matcher.
 */
JsUnitTest.Hamcrest.Matchers.even = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual % 2 == 0;
        },

        describeTo: function(description) {
            description.append('even');
        }
    });
};

/**
 * Asserts that the actual value is odd. Ex: <p>
 *
 * <pre>
 * assertThat(3, odd());
 * </pre>
 *
 * @return {JsUnitTest.Hamcrest.SimpleMatcher} 'odd' matcher.
 */
JsUnitTest.Hamcrest.Matchers.odd = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return actual % 2 != 0;
        },

        describeTo: function(description) {
            description.append('odd');
        }
    });
};

/**
 * Asserts that the actual number is between a given inclusive range. Ex: <p>
 * 
 * <pre>
 * assertThat(5, between(4).and(7));
 * </pre>
 *
 * @param {number} number Range start.
 * @return {JsUnitTest.Hamcrest.RangeMatcherBuilder} 'between' matcher.
 */
JsUnitTest.Hamcrest.Matchers.between = function(number) {
    return new JsUnitTest.Hamcrest.RangeMatcherBuilder({
        start: number
    });
};

/**
 * Creates a number range matcher builder.
 * @class Matcher builder that provides an easy way to create matchers for
 * number ranges.
 * @constructor
 * @param {object} param Configuration object.
 * @param {number} param.start Range start.
 */
JsUnitTest.Hamcrest.RangeMatcherBuilder = function(params) {
    params = params || {};

    /**
     * Range start.
     * @property
     * @type number
     * @private
     */
    var start = params.start;

    /**
     * Finishes to build the range matcher.
     * @param {number} end Range end.
     * @return {JsUnitTest.Hamcrest.SimpleMatcher} Range matcher.
     */
    this.and = function(end) {
        var greater = end;
        var lesser = start;

        if (start > end) {
            greater = start;
            lesser = end;
        }

        return new JsUnitTest.Hamcrest.Matchers.allOf(
            JsUnitTest.Hamcrest.Matchers.greaterThanOrEqualTo(lesser),
            JsUnitTest.Hamcrest.Matchers.lessThanOrEqualTo(greater)
        );
    }
};

