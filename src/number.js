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
 * @return {object} 'greaterThan' matcher.
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
 * @return {object} 'greaterThanOrEqualTo' matcher.
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
 * @return {object} 'lessThan' matcher.
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
 * @return {object} 'lessThanOrEqualTo' matcher.
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
 * Asserts that the actual number is NaN (Not a Number). Ex: <p>
 *
 * <pre>
 * assertThat(Math.sqrt(-1), NaN());
 * </pre>
 *
 * @return {object} 'NaN' matcher.
 */
JsUnitTest.Hamcrest.Matchers.NaN = function() {
    return new JsUnitTest.Hamcrest.SimpleMatcher({
        matches: function(actual) {
            return isNaN(actual);
        },
        
        describeTo: function(description) {
            description.append('<NaN>');
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
 * @return {object} 'between' matcher.
 */
JsUnitTest.Hamcrest.Matchers.between = function(number) {
    return new JsUnitTest.Hamcrest.RangeMatcherBuilder({
        start: number,
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
     * @return {object} Range matcher.
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

