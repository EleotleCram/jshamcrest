/**
 * @fileOverview Provides number-related matchers.
 */

/**
 * Asserts that the assertion's actual number is greater than the given
 * threshold. Ex: <p>
 * assertThat(10, greaterThan(5));
 * @param {number} expected Threshold number.
 * @return {object} 'greaterThan' matcher.
 */
JsUnitTest.Hamcrest.Matchers.greaterThan = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual > threshold;
    });
};

/**
 * Asserts that the assertion's actual number is greater than or equal to
 * the given threshold. Ex: <p>
 * assertThat(10, greaterThanOrEqualTo(5));
 * @param {number} expected Threshold number.
 * @return {object} 'greaterThanOrEqualTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.greaterThanOrEqualTo = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual >= threshold;
    });
};

/**
 * Asserts that the assertion's actual number is less than the given
 * threshold. Ex: <p>
 * assertThat(5, lessThan(10));
 * @param {number} expected Threshold number.
 * @return {object} 'lessThan' matcher.
 */
JsUnitTest.Hamcrest.Matchers.lessThan = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual < threshold;
    });
};

/**
 * Asserts that the assertion's actual number is less than or equal to
 * the given threshold. Ex: <p>
 * assertThat(5, lessThanOrEqualTo(10));
 * @param {number} expected Threshold number.
 * @return {object} 'lessThanOrEqualTo' matcher.
 */
JsUnitTest.Hamcrest.Matchers.lessThanOrEqualTo = function(threshold) {
    return new JsUnitTest.Hamcrest.SimpleMatcher(function(actual) {
        return actual <= threshold;
    });
};

