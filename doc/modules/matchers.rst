.. _module_matchers:

:mod:`JsHamcrest.Matchers` --- Built-in Matchers
================================================

.. module:: JsHamcrest.Matchers
   :synopsis: Built-in matcher library.
.. moduleauthor:: Daniel Martins <daniel@destaquenet.com>


Built-in matcher library.


Collection Matchers
-------------------

.. function:: empty()

   The actual value should be an array and it must be empty::

       assertThat([], empty());

   :returns: Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: everyItem(matcherOrValue)

   The actual value should be an array and the given matcher or value must
   match all items::

       assertThat([1,2,3], everyItem(greaterThan(0)));
       assertThat([1,'1'], everyItem(1));

   :arg matcherOrValue: Instance of :class:`JsHamcrest.SimpleMatcher` or a
                        value.
   :returns:            Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: hasItem(matcherOrValue)

   The actual value should be an array and it must contain at least one value
   that matches the given matcher or value::

       assertThat([1,2,3], hasItem(equalTo(3)));
       assertThat([1,2,3], hasItem(3));

   :arg matcherOrValue: Instance of :class:`JsHamcrest.SimpleMatcher` or a
                        value.
   :returns:            Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: hasItems(MatchersOrValues...)

   The actual value should be an array and the given matchers or values must
   match at least one item::

       assertThat([1,2,3], hasItems(2,3));
       assertThat([1,2,3], hasItems(greaterThan(2)));
       assertThat([1,2,3], hasItems(1, greaterThan(2));

   :arg MatchersOrValues: Matchers and/or values.
   :returns:              Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: hasSize(matcherOrValue)

   The actual value should be an array and its size must match the given matcher
   or value::

       assertThat([1,2,3], hasSize(3));
       assertThat([1,2,3], hasSize(lessThan(5)));

   :arg matcherOrValue: Instance of :class:`JsHamcrest.SimpleMatcher` or a
                        value.
   :returns:            Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: isIn(arguments...)

   The given array or arguments must contain the actual value::

       assertThat(1, isIn([1,2,3]));
       assertThat(1, isIn(1,2,3));

   :arg arguments...: Array or list of values.
   :returns:          Instance of :class:`JsHamcrest.SimpleMatcher`.


.. function:: oneOf()

   Alias to :meth:`isIn` function.


Core Matchers
-------------

TODO.


Number Matchers
---------------

TODO.


Object Matchers
---------------

TODO.


Text Matchers
-------------

TODO.

