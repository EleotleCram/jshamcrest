new TestRunner({
    name: 'Object matchers',

    setup: function() { with(this) {
    }},

    teardown: function() { with(this) {
    }},

    testHasMember: function() { with(this) {
        var hasMember = JsHamcrest.Matchers.hasMember;
        assert(hasMember('length').matches([]));
        assert(hasMember('matches').matches(hasMember()));
        assert(!hasMember('somethingElse').matches([]));
        assert(!hasMember('somethingElse').matches(null));
    }},

    testHasFunction: function() { with(this) {
        var hasFunction = JsHamcrest.Matchers.hasFunction;
        assert(hasFunction('matches').matches(hasMember()));
        assert(!hasFunction('length').matches([]));
        assert(!hasFunction('somethingElse').matches(null));
    }},

    testInstanceOf: function() { with(this) {
        var instanceOf = JsHamcrest.Matchers.instanceOf;
        assert(instanceOf(Array).matches([]));
        assert(instanceOf(Object).matches([]));
        assert(!instanceOf(Function).matches([]));
    }},

    testTypeOf: function() { with(this) {
        assert(typeOf('string').matches('text'));
        assert(typeOf('number').matches(10));
        assert(typeOf('boolean').matches(false));
        assert(typeOf('function').matches(function() { }));
    }},

    testObject: function() { with(this) {
        assert(object().matches({}));
        assert(!object().matches(10));
    }},

    testString: function() { with(this) {
        assert(string().matches('text'));
        assert(!string().matches(10));
    }},

    testNumber: function() { with(this) {
        assertThat(number().matches(10));
        assertThat(number().matches(10.0));
        assertThat(!number().matches('text'));
    }},

    testBool: function() { with(this) {
        assertThat(bool().matches(true));
        assertThat(bool().matches(false));
        assertThat(!bool().matches('text'));
    }},

    testFunc: function() { with(this) {
        assertThat(func().matches(function() { }));
        assertThat(!func().matches({}));
    }}
}, {'logger':testLogger, 'testLog': 'objectLog'});
