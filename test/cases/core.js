new TestRunner({
    name: 'Core matchers',

    setup: function() { with(this) {
        oldFail = fail;

        failCount = 0;
        _fail = function(message) {
            failCount++;
        };
    }},

    teardown: function() { with(this) {
        fail = oldFail;
    }},

    testAssertThatWithSuccessfulMatcherAndNoMessage: function() { with(this) {
        var description = assertThat(10, greaterThan(0));
        assertEqual(0, failCount);
        assertEqual('Success', description.get());
    }},

    testAssertThatWithSuccessfulMatcherAndMessage: function() { with(this) {
        var description = assertThat(10, greaterThan(0), 'some text');
        assertEqual(0, failCount);
        assertEqual('Success', description.get());
    }},

    testAssertThatWithFailedMatcherAndNoMessage: function() { with(this) {
        fail = _fail;
        var description = assertThat(10, lessThan(0));
        assertEqual(1, failCount);
        assertEqual('\nExpected: less than 0\n     got: 10\n', description.get());
    }},

    testAssertThatWithFailedMatcherAndMessage: function() { with(this) {
        fail = _fail;
        var description = assertThat(10, lessThan(0), 'some text');
        assertEqual(1, failCount);
        assertEqual('some text\nExpected: less than 0\n     got: 10\n', description.get());
    }},

    testAssertThatWithSuccessfulValueAndNoMessage: function() { with(this) {
        var description = assertThat(10, '10');
        assertEqual(0, failCount);
        assertEqual('Success', description.get());
    }},

    testAssertThatWithSuccessfulValueAndMessage: function() { with (this) {
        var description = assertThat(10, '10', 'some text');
        assertEqual(0, failCount);
        assertEqual('Success', description.get());
    }},

    testAssertThatWithFailedValueAndNoMessage: function() { with(this) {
        fail = _fail;
        var description = assertThat(10, '00');
        assertEqual(1, failCount);
        assertEqual('\nExpected: equal to "00"\n     got: 10\n', description.get());
    }},

    testAssertThatWithFailedValueAndMessage: function() { with(this) {
        fail = _fail;
        var description = assertThat(10, '00', 'some text');
        assertEqual(1, failCount);
        assertEqual('some text\nExpected: equal to "00"\n     got: 10\n', description.get());
    }},

    testAssertThatWithTrueActualAndNoMatcher: function() { with(this) {
        var description = assertThat(10);
        assertEqual(0, failCount);
        assertEqual('Success', description.get());
    }},

    testAssertThatWithFalseActualAndNoMatcher: function() { with(this) {
        fail = _fail;
        var description = assertThat(0);
        assertEqual(1, failCount);
        assertEqual('\nExpected: true\n     got: 0\n', description.get());
    }},

    testIsWithValue: function() { with(this) {
        assert(is(10).matches(10));
        assert(!is(10).matches(11));
    }},

    testIsWithMatcher: function() { with(this) {
        assert(is(equalTo(10)).matches(10));
        assert(!is(equalTo(10)).matches(11));
    }},

    testNotWithValue: function() { with(this) {
        assert(not(10).matches(11));
        assert(!not(10).matches(10));
    }},

    testNotWithMatcher: function() { with(this) {
        assert(not(equalTo(10)).matches(11));
        assert(!not(equalTo(10)).matches(10));
    }},

    testEqualTo: function() { with(this) {
        assert(equalTo(10).matches('10'));
        assert(!equalTo(10).matches('11'));
    }},

    testAnything: function() { with(this) {
        assert(anything());
    }},

    testNil: function() { with(this) {
        assert(nil().matches(null));
        assert(nil().matches(undefined));
        assert(!nil().matches({}));
    }},

    testSameAs: function() { with(this) {
        var obj = {};
        assert(sameAs(obj).matches(obj));
        assert(!sameAs(obj).matches({}));
    }},

    testRaises: function() { with(this) {
        function method() { };
        function errorMethod() {
            throw {
                name: 'Exception'
            };
        };
        function anotherErrorMethod() {
            throw new Error();
        };

        assert(raises('Exception').matches(errorMethod));
        assert(!raises('Exception').matches(method));

        assert(raises('Error').matches(anotherErrorMethod));
        assertRaise('Error', function() {
            raises('Exception').matches(anotherErrorMethod);
        });
    }},

    testBoth: function() { with(this) {
        assert(both(greaterThan(5)).and(even()).matches(10));
        assert(!both(odd()).and(greaterThan(5)).matches(10));
        assert(!both(greaterThan(5)).and(odd()).matches(10));
    }},

    testEither: function() { with(this) {
        assert(either(even()).or(greaterThan(0)).matches(10));
        assert(either(even()).or(greaterThan(20)).matches(10));
        assert(!either(greaterThan(20)).or(odd()).matches(10));
    }},

    testAllOfWithValues: function() { with(this) {
        assert(allOf('10').matches(10));
        assert(allOf(['10']).matches(10));
        assert(allOf('10', 10).matches(10));
        assert(!allOf(11, 10).matches(10));
        assert(!allOf('10', 11).matches(10));
    }},

    testAllOfWithMatchers: function() { with(this) {
        assert(allOf(even()).matches(10));
        assert(allOf(even(), greaterThan(5)).matches(10));
        assert(allOf([even(), greaterThan(0)]).matches(10));
        assert(!allOf(greaterThan(0), odd()).matches(10));
        assert(!allOf(odd(), greaterThan(5)).matches(10));
    }},

    testAllOfWithValuesAndMatchers: function() { with(this) {
        assert(allOf('10', greaterThan(5)).matches(10));
        assert(allOf([even(), equalTo('10')]).matches(10));
        assert(!allOf(11, greaterThan(5)).matches(10));
        assert(!allOf([lessThan(5), 10]).matches(10));
    }},

    testAnyOfWithValues: function() { with(this) {
        assert(anyOf('10').matches(10));
        assert(anyOf(['10']).matches(10));
        assert(anyOf('10', 11).matches(10));
        assert(!anyOf(11, 12).matches(10));
        assert(!anyOf(['12', 11]).matches(10));
    }},

    testAnyOfWithMatchers: function() { with(this) {
        assert(anyOf(even()).matches(10));
        assert(anyOf(even(), greaterThan(20)).matches(10));
        assert(anyOf([odd(), greaterThan(5)]).matches(10));
        assert(!anyOf([greaterThan(20), odd()]).matches(10));
    }},

    testAnyOfWithValuesAndMatchers: function() { with(this) {
        assert(anyOf('10', equalTo(11)).matches(10));
        assert(anyOf([lessThan(5), '10']).matches(10));
        assert(!anyOf(12, lessThan(5)).matches(10));
        assert(!anyOf([greaterThan(10), '12']).matches(10));
    }}
}, {'logger':testLogger, 'testLog': 'coreLog'});
