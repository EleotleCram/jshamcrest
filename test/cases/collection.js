new TestRunner({
    name: 'Collection matchers',

    setup: function() { with(this) {
        array = [1,2,[3],[4,5]];
    }},

    teardown: function() { with(this) {
    }},

    testHasItemWithValue: function() { with(this) {
        assert(hasItem(2).matches(array));
        assert(hasItem([3]).matches(array));
    }},

    testHasItemWithMatcher: function() { with(this) {
        assert(hasItem(greaterThan(1)).matches(array));
        assert(hasItem(equalTo([3])).matches(array));
    }},

    testHasItemWithInexistentValue: function() { with(this) {
        assert(!hasItem(0).matches(array));
        assert(!hasItem([2]).matches(array));
    }},

    testHasItemWithNoMatchingValue: function() { with(this) {
        assert(!hasItem(greaterThan(4)).matches(array));
    }},

    testHasItemsWithValue: function() { with(this) {
        assert(hasItems(1).matches(array));
        assert(hasItems([4,5]).matches(array));
    }},

    testHasItemsWithInexistentValues: function() { with(this) {
        assert(!hasItems(0).matches(array));
        assert(!hasItems([4]).matches(array));
    }},

    testHasItemsWithNoMatchingValues: function() { with(this) {
        assert(!hasItems(lessThan(0)).matches(array));
        assert(!hasItems(equalTo([4])).matches(array));
    }},

    testIsValueInArray: function() { with(this) {
        assert(isIn(array).matches(1));
        assert(oneOf(array).matches(1));
        assert(isIn(array).matches([3]));
        assert(oneOf(array).matches([3]));
    }},

    testIsInexistentValueInArray: function() { with(this) {
        assert(!isIn(array).matches(3));
        assert(!isIn(array).matches([4]));
        assert(!oneOf(array).matches(3));
        assert(!oneOf(array).matches([4]));
    }},

    testEmpty: function() { with(this) {
        assert(not(empty()).matches(array));
        assert(empty().matches([]));
    }},

    testHasSizeWithValue: function() { with(this) {
        assert(hasSize(4).matches(array));
    }},

    testHasSizeWithMatcher: function() { with(this) {
        assert(hasSize(greaterThan(3)).matches(array));
    }},

    testHasInvalidSizeWithValue: function() { with(this) {
        assert(!hasSize(3).matches(array));
    }},

    testHasInvalidSizeWithMatcher: function() { with(this) {
        assert(!hasSize(lessThan(4)).matches(array));
    }}
}, {'logger':testLogger, 'testLog': 'collectionLog'});
