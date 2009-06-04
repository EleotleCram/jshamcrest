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
 * @return {JsHamcrest.SimpleMatcher} 'greaterThan' matcher.
 */
JsHamcrest.Matchers.greaterThan = function(threshold) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'greaterThanOrEqualTo' matcher.
 */
JsHamcrest.Matchers.greaterThanOrEqualTo = function(threshold) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'lessThan' matcher.
 */
JsHamcrest.Matchers.lessThan = function(threshold) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'lessThanOrEqualTo' matcher.
 */
JsHamcrest.Matchers.lessThanOrEqualTo = function(threshold) {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'notANumber' matcher.
 */
JsHamcrest.Matchers.notANumber = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'even' matcher.
 */
JsHamcrest.Matchers.even = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.SimpleMatcher} 'odd' matcher.
 */
JsHamcrest.Matchers.odd = function() {
    return new JsHamcrest.SimpleMatcher({
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
 * @return {JsHamcrest.RangeMatcherBuilder} 'between' matcher.
 */
JsHamcrest.Matchers.between = function(number) {
    return new JsHamcrest.RangeMatcherBuilder({
        start: number
    });
};

/**
 * Asserts that the actual number is close to the given number, that is, if
 * the actual number is equal to a number within some range of acceptable error.
 * Ex: <p>
 *
 * <pre>
 * assertThat(0.5, closeTo(1.0, 0.5));
 * assertThat(1.0, closeTo(1.0, 0.5));
 * assertThat(1.5, closeTo(1.0, 0.5));
 * assertThat(2.0, not(closeTo(1.0, 0.5)));
 * </pre>
 *
 * @param {number} number Number.
 * @param {number} [delta=0] Acceptable difference range.
 * @return {JsHamcrest.SimpleMatcher} 'closeTo' matcher.
 */
JsHamcrest.Matchers.closeTo = function(number, delta) {
    if (!delta) {
        delta = 0;
    }

    return new JsHamcrest.SimpleMatcher({
        matches: function(actual) {
            return (Math.abs(actual - number) - delta) <= 0;
        },

        describeTo: function(description) {
            description.append('number within ')
                  .appendLiteral(delta).append(' of ').appendLiteral(number);
        }
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
JsHamcrest.RangeMatcherBuilder = function(params) {
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
     * @return {JsHamcrest.SimpleMatcher} Range matcher.
     */
    this.and = function(end) {
        var greater = end;
        var lesser = start;

        if (start > end) {
            greater = start;
            lesser = end;
        }

        return new JsHamcrest.SimpleMatcher({
            matches: function(actual) {
                return actual >= lesser && actual <= greater;
            },

            describeTo: function(description) {
                description.append('between ').appendLiteral(lesser)
                      .append(' and ').appendLiteral(greater);
            }
        });
    }
};

