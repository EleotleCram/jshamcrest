JsUnitTest.Unit.Testcase.prototype.shouldFail = function(func) {
    var currentFailures = this.failures;
    func();
    var delta = this.failures - currentFailures
    if (delta > 0) {
        this.failures = currentFailures;
        this.assertions += delta;
        this.messages = this.messages.slice(0, this.messages.length - delta);
    } else {
        this.fail('Assertion should have failed');
    }
};

JsUnitTest.Unit.Testcase.prototype._assertThat = function(actual, matcher, message) {
    var self = this;
    var callback = function() {
        self.assertThat(actual, matcher, message);
    };
    
    return {
        fails: function() {
            self.shouldFail(callback);
        },
        
        succeeds: function() {
            callback();
        }
    };
};

