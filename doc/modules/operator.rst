:mod:`JsHamcrest.Operators` --- Matcher Operators
================================================

.. module:: JsHamcrest.Operators
   :synopsis: Operator functions for matchers.
.. moduleauthor:: Daniel Martins <daniel@destaquenet.com>


Provides utilitary functions on top of matchers.


.. function:: assert(actualValue, matcherOrValue[, {fail, pass, message}])

   Generic assert function to be used for easy integration with testing
   frameworks. Usage example::

       // After add the following method to your testing framework...

       function iAssertThat(actualValue, matcherOrValue, message) {
           return JsHamcrest.Operators.assert(actualValue, matcherOrValue, {
               message: message,
               fail: function(failMessage) {
                   // Forward the call to the appropriate method provided by the testing framework
                   myTestingFramework.fail(failMessage);
               },
               pass: function(passMessage) {
                   // Forward the call to the appropriate method provided by the testing framework
                   myTestingFramework.pass(passMessage);
               }
           });
       }

       // ... you'll be able to leverage the power of JsHamcrest in your test cases
       result = iAssertThat(50, between(0).and(100));

       result.passed // Output: true
       result.get()  // Output: "50 between 0 and 100: Success"

   :arg actualValue:    Actual value.
   :arg matcherOrValue: Instance of :class:`JsHamcrest.SimpleMatcher` or a
                        value.
   :arg fail:           *(Optional)* Callback function to be called when
                        *actualValue* doesn't match *matcherOrValue*.
   :arg pass:           *(Optional)* Callback function to be called when
                        *actualValue* does match *matcherOrValue*.
   :arg message:        *(Optional)* Text that describes the assertion on an
                        even higher level.
   :returns:            Instance of :class:`JsHamcrest.Description` with the
                        assertion description. Also, the result of the assertion
                        (success or failure/error) can be accessed through the
                        :attr:`passed` attribute.

.. function:: filter(array, matcherOrValue)

   Returns those items of the array for which the given matcher or value
   matches::

       var filtered = filter([0,1,2,3,4,5,6], even());
       assertThat(filtered, equalTo([0,2,4,6]));

       var filtered = filter([0,1,2,'1',0], 1);
       assertThat(filtered, equalTo([1,'1']));

   :arg array:          Array of items to be filtered.
   :arg matcherOrValue: Instance of :class:`JsHamcrest.SimpleMatcher` or a
                        value.
   :returns:            Filtered array.
