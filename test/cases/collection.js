new Test.Unit.Runner({
    setup: function() { with(this) {
        array = [1,2,[3],[4,5]];
    }},

    teardown: function() { with(this) {
    }},

    testHasItemWithValue: function() { with(this) {
        assertThat(array, hasItem(2));
        assertThat(array, hasItem([3]));
    }},

    testHasItemWithMatcher: function() { with(this) {
        assertThat(array, hasItem(greaterThan(1)));
        assertThat(array, hasItem(equalTo([3])));
    }},

    testHasItemWithInexistentValue: function() { with(this) {
        _assertThat(array, hasItem(0)).fails();
        _assertThat(array, hasItem([2])).fails();
    }},

    testHasItemWithNoMatchingValue: function() { with(this) {
        _assertThat(array, hasItem(greaterThan(4))).fails();
    }},

    testHasItemsWithValue: function() { with(this) {
        assertThat(array, hasItems(1));
        assertThat(array, hasItems([4,5]));
    }},

    testHasItemsWithInexistentValues: function() { with(this) {
        _assertThat(array, hasItems(0)).fails();
        _assertThat(array, hasItems([4])).fails();
    }},

    testHasItemsWithNoMatchingValues: function() { with(this) {
        _assertThat(array, hasItems(lessThan(0))).fails();
        _assertThat(array, hasItems(equalTo([4]))).fails();
    }},
    
    testIsValueInArray: function() { with(this) {
        assertThat(1, isIn(array));
        assertThat(1, oneOf(array));
        assertThat([3], isIn(array));
        assertThat([3], oneOf(array));
    }},
    
    testIsInexistentValueInArray: function() { with(this) {
        _assertThat(3, isIn(array)).fails();
        _assertThat([4], isIn(array)).fails();
        _assertThat(3, oneOf(array)).fails();
        _assertThat([4], oneOf(array)).fails();
    }},
    
    testEmpty: function() { with(this) {
        assertThat(array, not(empty()));
        assertThat([], empty());
    }},
    
    testHasSizeWithValue: function() { with(this) {
        assertThat(array, hasSize(4));
    }},
    
    testHasSizeWithMatcher: function() { with(this) {
        assertThat(array, hasSize(greaterThan(3)));
    }},
    
    testHasInvalidSizeWithValue: function() { with(this) {
        _assertThat(array, hasSize(3)).fails();
    }},
    
    testHasInvalidSizeWithMatcher: function() { with(this) {
        _assertThat(array, hasSize(lessThan(4))).fails();
    }}
    
}, {'testLog': 'collectionLog'}); 
