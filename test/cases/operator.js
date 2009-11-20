new Test.Unit.Runner({
    name: 'Matcher operators',

    setup: function() { with(this) {
    }},

    teardown: function() { with(this) {
    }},

    testFilterWithInvalidArray: function() { with(this) {
        var array = 'Invalid Array';
        assertIdentical(array, filter(array, even()));
    }},

    testFilterWithoutMatcher: function() { with(this) {
        var array = [1,2,3];
        assertIdentical(array, filter(array));
    }},

    testFilterWithValue: function() { with(this) {
        var array = [1,2,3];
        assertEnumEqual([1], filter(array, '1'));
        assertEnumEqual([], filter(array, 0));
    }},

    testFilter: function() { with(this) {
        var array = [0,1,2,3,4,5,6,7,8,9];
        assertEnumEqual([2,4,6,8], filter(array, both(even()).and(greaterThan(0))));

        matcher = JsHamcrest.Matchers.greaterThan(10);
        assertEnumEqual([], filter(array, matcher));
    }}
}, {'testLog': 'operatorLog'});
