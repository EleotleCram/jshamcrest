new Test.Unit.Runner({
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
    assert(hasItems(lessThan(2)).matches(array));
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
    assert(empty().matches(''));
    assert(!empty().matches('string'));
    assert(empty().matches([]));
    assert(!empty().matches(array));
  }},

  testHasSizeWithValue: function() { with(this) {
    assert(hasSize(4).matches(array));
    assert(hasSize(6).matches('string'));
  }},

  testHasSizeWithMatcher: function() { with(this) {
    assert(hasSize(greaterThan(3)).matches(array));
    assert(hasSize(greaterThan(3)).matches('string'));
    assert(hasSize(zero()).matches(function(){}));
    assert(hasSize(greaterThan(3)).matches({a:1, b:2, c:3, d:4}));
  }},

  testHasInvalidSizeWithValue: function() { with(this) {
    assert(!hasSize(3).matches(array));
    assert(!hasSize(3).matches('string'));
    assert(!hasSize(3).matches({}));
  }},

  testHasInvalidSizeWithMatcher: function() { with(this) {
    assert(!hasSize(lessThan(4)).matches(array));
    assert(!hasSize(lessThan(4)).matches('string'));
    assert(!hasSize(lessThan(4)).matches({a:1, b:2, c:3, d:4}));
  }},

  testHasSizeWithInvalidValue: function() { with(this) {
    assert(!hasSize(0).matches(10));
  }},

  testEveryItemWithValue: function() { with(this) {
    assert(everyItem(1).matches([1, '1']));
  }},

  testEveryItemWithMatcher: function() { with(this) {
    assert(everyItem(greaterThan(0)).matches([1, 2, 3, 4]));
  }},

  testEveryItemWithInvalidValue: function() { with(this) {
    assert(!everyItem(0).matches([0, 1]));
  }},

  testEveryItemWithInvalidMatcher: function() { with(this) {
    assert(!everyItem(greaterThan(0)).matches([0, 1, 2, 3, 4]));
  }},
  
  testequivalentMapWithEmptyMaps: function() { with(this) {
    assert(equivalentMap({}).matches({}));
  }},
  
  testequivalentMapWithPrimitives: function() { with(this) {
    assert(equivalentMap({"key" : 1, "key2" : "String"}).matches({"key" : 1, "key2" : "String"}));
  }},
  
  testequivalentMapWithBooleans: function() { with(this) {
    assert(equivalentMap({"key" : new Boolean(true), "key2" : {"key" : new Boolean(false)}}).matches(
                         {"key" : new Boolean(true), "key2" : {"key" : new Boolean(false)}}));
  }},
  
  testequivalentMapWithFunctions: function() { with(this) {
    var fTestFunction = function(){};
    assert(equivalentMap({"key" : new Boolean(true), "key2" : {"key" : fTestFunction}}).matches(
                         {"key" : new Boolean(true), "key2" : {"key" : fTestFunction}}));
  }},
  
  testequivalentMapWithNumbers: function() { with(this) {
    assert(equivalentMap({"key" : new Boolean(true), "key2" : {"key" : new Number(42.5)}}).matches(
                         {"key" : new Boolean(true), "key2" : {"key" : new Number(42.5)}}));
  }},
  
  testequivalentMapWithStrings: function() { with(this) {
    assert(equivalentMap({"key" : 34, "key2" : {"key" : new String("Hello")}}).matches(
                         {"key" : 34, "key2" : {"key" : new String("Hello")}}));
  }},
  
  testequivalentMapWithErrors: function() { with(this) {
    assert(equivalentMap({"key" : "34", "key2" : {"key" : new Error("Oh No!")}}).matches(
                         {"key" : "34", "key2" : {"key" : new Error("Oh No!")}}));
  }},
  
  testequivalentMapWithUndefined: function() { with(this) {
    assert(equivalentMap({"key" : undefined, "key2" : {"key" : new Error("Oh No!")}}).matches(
                         {"key" : undefined, "key2" : {"key" : new Error("Oh No!")}}));
  }},
  
  testequivalentMapWithNull: function() { with(this) {
    assert(equivalentMap({"key" : null, "key2" : {"key" : new Error("Oh No!")}}).matches(
                         {"key" : null, "key2" : {"key" : new Error("Oh No!")}}));
  }},
  
  testequivalentMapWithClassInstance: function() { with(this) {
    function Cons(){};
    Cons.prototype.method = function(){};
    
    var oCons = new Cons();
    
    assert(equivalentMap({"key" : null, "key2" : {"key" : oCons}}).matches(
                         {"key" : null, "key2" : {"key" : oCons}}));
  }},
  
  testequivalentMapWithNestedMapAndArray: function() { with(this) {
    assert(equivalentMap({"key" : {"array" : [1, 2, "String"]}, "key2" : {"key" : {"key" : 3 }}}).matches(
                         {"key" : {"array" : [1, 2, "String"]}, "key2" : {"key" : {"key" : 3 }}}));
  }},
  
  testequivalentMapWithEmptyAndWithPopulatedMapFails: function() { with(this) {
    assertEqual(false, equivalentMap({}).matches({"key" : 2}));
  }},
  
  testequivalentMapWithSimilarStringAndNumberFails: function() { with(this) {
    assertEqual(false, equivalentMap({"key": new String("2")}).matches({"key" : new Number(2)}));
  }},
  
  testequivalentMapWithSimilarBooleanAndRegExprFails: function() { with(this) {
    assertEqual(false, equivalentMap({"key": new Boolean(true)}).matches({"key" : new RegExp("true")}));
  }},
  
  testequivalentMapWithUndefinedAndNullFails: function() { with(this) {
    assertEqual(false, equivalentMap({"key": undefined}).matches({"key" : null}));
  }},
  
  testequivalentMapWithDifferentErrorsFails: function() { with(this) {
    function SubClassError(){}
    SubClassError.prototype = new Error(); //Object.create is not available in all browsers...
    SubClassError.prototype.constructor = SubClassError;
    
    var oError = new Error('Boom.');
    var oSubClassError = new SubClassError('Boom.');
    
    assertEqual(false, equivalentMap({"key": oError}).matches({"key" : oSubClassError}));
  }},
  
  testequivalentArrayWithEmptyArray: function() { with(this) {
    assert(equivalentArray([]).matches([]));
  }},
  
  testequivalentArrayWithPrimitives: function() { with(this) {
    assert(equivalentArray([1, "String"]).matches([1, "String"]));
  }},
  
  testequivalentArrayWithBooleans: function() { with(this) {
    assert(equivalentArray([new Boolean(true), [new Boolean(false)]]).matches(
                         [new Boolean(true), [new Boolean(false)]]));
  }},
  
  testequivalentArrayWithFunctions: function() { with(this) {
    var fTestFunction = function(){};
    assert(equivalentArray([new Boolean(true), [fTestFunction]]).matches(
                         [new Boolean(true), [fTestFunction]]));
  }},
  
  testequivalentArrayWithNumbers: function() { with(this) {
    assert(equivalentArray([new Boolean(true), [new Number(42.5)]]).matches(
                         [new Boolean(true), [new Number(42.5)]]));
  }},
  
  testequivalentArrayWithStrings: function() { with(this) {
    assert(equivalentArray([34, [new String("Hello")]]).matches(
                         [34, [new String("Hello")]]));
  }},
  
  testequivalentArrayWithErrors: function() { with(this) {
    assert(equivalentArray(["34", [new Error("Oh No!")]]).matches(
                         ["34", [new Error("Oh No!")]]));
  }},
  
  testequivalentArrayWithUndefined: function() { with(this) {
    assert(equivalentArray([undefined, [new Error("Oh No!")]]).matches(
                         [undefined, [new Error("Oh No!")]]));
  }},
  
  testequivalentArrayWithNull: function() { with(this) {
    assert(equivalentArray([null, [new Error("Oh No!")]]).matches(
                         [null, [new Error("Oh No!")]]));
  }},
  
  testequivalentArrayWithClassInstance: function() { with(this) {
    function Cons(){};
    Cons.prototype.method = function(){};
    
    var oCons = new Cons();
    
    assert(equivalentArray([null, [oCons]]).matches(
                         [null, [oCons]]));
  }},
  
  testequivalentArrayWithNestedMapAndArray: function() { with(this) {
    assert(equivalentArray([{"array" : [1, 2, "String"]}, [{"key": 3}]]).matches(
                         [{"array" : [1, 2, "String"]}, [{"key" : 3 }]]));
  }}
}, {'testLog': 'collectionLog'});
