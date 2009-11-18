Writing Custom Matchers
=======================

JsHamcrest already provides a large set of matchers, but that doesn't mean you
should stick with those. In fact, we encourage you to create your own matchers
every time you feel the need for something more suitable to the problem you
have in hand.


A Trivial Example
-----------------

To introduce you to this topic, we are going to implement a new matcher whose
task is just to tell if the actual number is the answer to life, the universe,
and everything. This is not a very useful matcher, but it shows everything you
need to create a basic matcher::

    var theAnswerToLifeTheUniverseAndEverything = function() {
        return new JsHamcrest.SimpleMatcher({
            matches: function(actual) {
                return actual == 42;
            },

            describeTo: function(description) {
                description.append('the answer to life, the universe, and everything');
            }
        });
    };


.. note::
   Another great way to learn how to implement new matchers is to look at the
   :ref:`existing ones  <module_matchers>`.


As you can see, a matcher is nothing more than a function that returns a
:class:`JsHamcrest.SimpleMatcher` object . All this particular matcher does is
test whether the actual number is equal to 42.

Okay, let's put that matcher to use::

    // Let's suppose you are using JsHamcrest with some unit testing framework

    // Expected the answer to life, the universe, and everything but was 10
    assertThat(10, theAnswerToLifeTheUniverseAndEverything());

    // Expected the answer to life, the universe, and everything: Success
    assertThat(42, theAnswerToLifeTheUniverseAndEverything());


Do I Need Custom Matchers?
``````````````````````````

But wouldn't it be simpler if we just use the :meth:`JsHamcrest.Matcher.equalTo`
matcher? Let's see an example::

    // Expected equal to 42 but was 10
    assertThat(10, equalTo(42));

    // Expected equal to 42: Success
    assertThat(42, equalTo(42));


At the end, the result is the same. The only downside though is that we lose
the ability to describe the assertion with a meaningful language, more
appropriate to the problem we need to solve.


Composing Matchers
``````````````````

You can use your custom matchers together with the built-in ones to compose even
more interesting match rules. For example, if you want to match when a number
*is not* the answer to life, the universe, and everything, just wrap your custom
matcher with a :meth:`JsHamcrest.Matcher.not` matcher and you're done::

    // Output: Expected not the answer to life, the universe, and everything: Success
    assertThat(10, not(theAnswerToLifeTheUniverseAndEverything()));

    // Output: Expected not the answer to life, the universe, and everything but was 42
    assertThat(42, not(theAnswerToLifeTheUniverseAndEverything()));


That way you get the best of both worlds.


A More Complex Example
----------------------

TODO.


Distributing Your Custom Set Of Matchers
----------------------------------------

TODO.
