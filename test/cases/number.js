new Test.Unit.Runner({
    setup: function() { with(this) {
    }},

    teardown: function() { with(this) {
    }},

    testGreaterThan: function() { with(this) {
        var greaterThan = JsUnitTest.Hamcrest.Matchers.greaterThan;
        assert(greaterThan(5).matches(6));
        assert(!greaterThan(5).matches(5));
        assert(!greaterThan(5).matches(4));
    }},

    testGreaterThanOrEqualTo: function() { with(this) {
        var greaterThanOrEqualTo = JsUnitTest.Hamcrest.Matchers.greaterThanOrEqualTo;
        assert(greaterThanOrEqualTo(5).matches(6));
        assert(greaterThanOrEqualTo(5).matches(5));
        assert(!greaterThanOrEqualTo(5).matches(4));
    }},

    testLessThan: function() { with(this) {
        var lessThan = JsUnitTest.Hamcrest.Matchers.lessThan;
        assert(lessThan(5).matches(4));
        assert(!lessThan(5).matches(5));
        assert(!lessThan(5).matches(6));
    }},

    testLessThanOrEqualTo: function() { with(this) {
        var lessThanOrEqualTo = JsUnitTest.Hamcrest.Matchers.lessThanOrEqualTo;
        assert(lessThanOrEqualTo(5).matches(4));
        assert(lessThanOrEqualTo(5).matches(5));
        assert(!lessThanOrEqualTo(5).matches(6));
    }},

    testNotANumber: function() { with(this) {
        var notANumber = JsUnitTest.Hamcrest.Matchers.notANumber;
        assert(notANumber().matches('A'));
        assert(notANumber().matches(Math.sqrt(-1)));
        assert(!notANumber().matches('10'));
        assert(!notANumber().matches(50));
    }},

    testEven: function() { with(this) {
        var even = JsUnitTest.Hamcrest.Matchers.even;
        assert(even().matches(-2));
        assert(even().matches(2));
        assert(!even().matches(-1));
        assert(!even().matches(1));
    }},

    testOdd: function() { with(this) {
        var odd = JsUnitTest.Hamcrest.Matchers.odd;
        assert(odd().matches(-1));
        assert(odd().matches(1));
        assert(!odd().matches(-2));
        assert(!odd().matches(2));
    }},

    testBetween: function() { with(this) {
        var between = JsUnitTest.Hamcrest.Matchers.between;
        var range = between(5).and(10);
        assert(range.matches(5);
        assert(range.matches(8);
        assert(range.matches(10);
        assert(!range.matches(4);
        assert(!range.matches(11);
    }}
}, {'testLog': 'numberLog'});
