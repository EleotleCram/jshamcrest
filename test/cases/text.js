new TestRunner({
    name: 'Integration',

    setup: function() { with(this) {
    }},

    teardown: function() { with(this) {
    }},

    testSomething: function() { with(this) {
        assert(true);
    }}
}, {'logger':testLogger, 'testLog': 'integrationLog'});
