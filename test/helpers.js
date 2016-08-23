'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var helpers = require('./helpers/');

/**
 * Tests for the test helpers.
 */
describe('test helper', function() {

    describe('`deepEqualCircular`', function() {
        var deepEqualCircular = helpers.deepEqualCircular;

        it('works like `assert.deepStrictEqual`', function() {
            var obj1;
            var obj2;

            obj1 = { foo: 'bar', baz: ['qux', 42, null], obj: {} };
            obj2 = { obj: {}, baz: ['qux', 42, null], foo: 'bar' };
            deepEqualCircular(obj1, obj2);

            obj1 = { foo: 'bar', baz: ['qux', 42, null], obj: { ject: 'ion!' } };
            assert.throws(function() { deepEqualCircular(obj1, obj2); });
        });

        it('does not break with circular references', function() {
            var obj1;
            var obj2;

            obj1 = { foo: 'bar', baz: ['qux', 42, null], obj: {} };
            obj1.ref = obj1.obj;
            obj2 = { obj: {}, baz: ['qux', 42, null], foo: 'bar' };
            obj2.ref = obj2.obj;
            deepEqualCircular(obj1, obj2);
        });

    });

});
