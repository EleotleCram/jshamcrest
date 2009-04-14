new Test.Unit.Runner({
    setup: function() { with(this) {
        description = new JsUnitTest.Hamcrest.Description();
        testCase = new JsUnitTest.Unit.Testcase();
        selfDescribing = {
            describeTo: function(description) {
                description.append('description');
            }
        };
    }},

    teardown: function() { with(this) {
    }},

    testInstallMatchers: function() { with(this) {
        var matchers = {
            _matcher: {}
        };

        JsUnitTest.Hamcrest.installMatchers(matchers);
        assertIdentical(matchers._matcher, testCase._matcher);
    }},

    testIsMatcher: function() { with(this) {
        function CustomMatcher() { };
        CustomMatcher.prototype = new JsUnitTest.Hamcrest.SimpleMatcher();

        assert(JsUnitTest.Hamcrest.isMatcher(new CustomMatcher()));
        assert(!JsUnitTest.Hamcrest.isMatcher({}));
    }},

    testIsArrayEqual: function() { with(this) {
        var isArraysEqual = JsUnitTest.Hamcrest.isArraysEqual;
        assert(!isArraysEqual([], {}));
        assert(!isArraysEqual([1,2], [1]));
        assert(!isArraysEqual([1,[2,3]], [1,['2',2]]));

        assert(isArraysEqual());
        assert(isArraysEqual(null, undefined));
        assert(isArraysEqual([], []));
        assert(isArraysEqual([1,'2'], ['1',2]));
        assert(isArraysEqual(['1',[2,3]], [1,['2','3']]));
    }},

    testCreateSimpleMatcher: function() { with(this) {
        function matches(actual) { };
        function describeTo(description) { };
        var matcher = new JsUnitTest.Hamcrest.SimpleMatcher({
            matches: matches,
            describeTo: describeTo
        });

        assertIdentical(matches, matcher.matches);
        assertIdentical(describeTo, matcher.describeTo);
    }},

    testCreateCombinableMatcher: function() { with(this) {
        function matches(actual) { };
        function describeTo(description) { };
        var matcher = new JsUnitTest.Hamcrest.CombinableMatcher({
            matches: matches,
            describeTo: describeTo
        });

        assertIdentical(matches, matcher.matches);
        assertIdentical(describeTo, matcher.describeTo);

        assert(matcher.and);
        assert(matcher.or);

        assertInstanceOf(JsUnitTest.Hamcrest.CombinableMatcher, matcher.and(50));
        assertInstanceOf(JsUnitTest.Hamcrest.CombinableMatcher, matcher.or(50));
    }},

    testDescriptionAppend: function() { with(this) {
        description.append();
        assert(!description.get());

        description.append('text');
        assertEqual('text', description.get());

        description.append(null);
        assertEqual('text', description.get());
    }},

    testDescriptionAppendLiteral: function() { with(this) {
        var obj = {
            toString: function() {
                return 'Object';
            }
        };
        var value = [obj, '1', 2, null, undefined, [], function() { }];
        var expected = '[{Object}, "1", 2, <null>, <undefined>, [], <Function>]';

        description.appendLiteral(value);
        assertEqual(expected, description.get());
    }},

    testDescriptionAppendDescriptionOf: function() { with(this) {
        description.appendDescriptionOf(null);
        assertEqual('', description.get());

        description.appendDescriptionOf(selfDescribing);
        assertEqual('description', description.get());
    }},

    testDescriptionAppendList: function() { with(this) {
        description.appendList('[', '-', ']', [selfDescribing, null, selfDescribing]);
        assertEqual('[description--description]', description.get());
    }},

    testDescriptionAppendValueList: function() { with(this) {
        description.appendValueList('[', '-', ']', [1,'a',null,undefined]);
        assertEqual('[1-"a"-<null>-<undefined>]', description.get());
    }}
}, {'testLog': 'mainLog'});
