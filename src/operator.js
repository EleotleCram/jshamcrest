JsHamcrest.Operators = {};

/**
 * Returns those items of the array for which matcher matches.
 */
JsHamcrest.Operators.filter = function(array, matcherOrValue) {
    if (!(array instanceof Array) || matcherOrValue == null) {
        return array;
    }
    if (!(matcherOrValue instanceof JsHamcrest.SimpleMatcher)) {
        matcherOrValue = JsHamcrest.Matchers.equalTo(matcherOrValue);
    }

    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (matcherOrValue.matches(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};

/**
 * Generic assert function.
 */
JsHamcrest.Operators.assert = function(actual, matcher, options) {
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

    if (options.message) {
        description.append(options.message).append('. ');
    }

    description.append('Expected ');
    matcher.describeTo(description);

    if (!matcher.matches(actual)) {
        description.append(' but was ');
        matcher.describeValueTo(actual, description);
        if (options.fail) {
            options.fail(description.get());
        }
    } else {
        description.append(': Success');
        if (options.pass) {
            options.pass(description.get());
        }
    }
    return description;
};
