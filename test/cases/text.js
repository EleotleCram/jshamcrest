new TestRunner({
    name: 'Text matchers',

    setup: function() { with(this) {
    }},

    teardown: function() { with(this) {
    }},

    testEqualIgnoringCase: function() { with(this) {
        var equalIgnoringCase = JsUnitTest.Hamcrest.Matchers.equalIgnoringCase;
        assert(equalIgnoringCase('TeSt').matches('tEsT'));
        assert(equalIgnoringCase(' Te St  ').matches(' tE sT  '));
        assert(!equalIgnoringCase('TeSt').matches('tEsT '));
        assert(!equalIgnoringCase('TeS1').matches('tEsT'));
    }},

    testContainsString: function() { with(this) {
        var containsString = JsUnitTest.Hamcrest.Matchers.containsString;
        assert(containsString('st').matches('test'));
        assert(containsString('te').matches('test'));
        assert(!containsString('St').matches('test'));
        assert(!containsString('Te').matches('test'));
    }},

    testStartsWith: function() { with(this) {
        var startsWith = JsUnitTest.Hamcrest.Matchers.startsWith;
        assert(startsWith('te').matches('test'));
        assert(startsWith('  t e').matches('  t est'));
        assert(!startsWith('es').matches('test'));
        assert(!startsWith(' t e').matches('  t est'));
    }},

    testEndsWith: function() { with(this) {
        var endsWith = JsUnitTest.Hamcrest.Matchers.endsWith;
        assert(endsWith('est').matches('test'));
        assert(endsWith(' st  ').matches('te st  '));
        assert(!endsWith(' st').matches('test'));
        assert(!endsWith(' st ').matches('te st  '));
    }}
}, {'logger':testLogger, 'testLog': 'textLog'});
