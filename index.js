/* jshint -W067 */
(function() {
    'use strict';

    var dox = require('./lib/dox.js');

    dox.version = '0.4.4';

    var namespace;

    if (typeof module !== 'undefined') {
        namespace = module.exports = dox;
    } else {
        namespace = (function() {
            return this || (1, eval)('this');
        }());
    }

    namespace.dox = dox;
}());
