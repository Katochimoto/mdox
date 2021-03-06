describe('parse.type', function() {

    /*jshint -W020 */
    var parse = require('../../lib/parse.type').parse;
    /*jshint -W020 */
    var expect = require('expect.js');


    it('allows any type', function() {
        var tagTypes = parse('{*}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ '*' ]);
    });

    it('symbol name', function() {
        var tagTypes = parse('{boolean}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'boolean' ]);
    });

    it('name expression', function() {
        var tagTypes = parse('{myNamespace.MyClass}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'myNamespace.MyClass' ]);
    });

    it('multiple types', function() {
        var tagTypes = parse('{string|boolean}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(2);
        expect(tagTypes.data).to.eql([ 'string', 'boolean' ]);
    });

    it('multiple types', function() {
        var tagTypes = parse('{(string|boolean)}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(2);
        expect(tagTypes.data).to.eql([ 'string', 'boolean' ]);
    });

    it('multiple types', function() {
        var tagTypes = parse('{(string|Array.<string>)}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(2);
        expect(tagTypes.data).to.eql([ 'string', 'Array.<string>' ]);
    });

    it('arrays and objects (type applications and record types)', function() {
        var tagTypes = parse('{Array.<MyClass>}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'Array.<MyClass>' ]);
    });

    it('arrays and objects (type applications and record types)', function() {
        var tagTypes = parse('{MyClass[]}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'MyClass[]' ]);
    });

    it('arrays and objects (type applications and record types)', function() {
        var tagTypes = parse('{Object.<string, number>}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'Object.<string, number>' ]);
    });

    it('arrays and objects (type applications and record types)', function() {
        var tagTypes = parse('{{a: number, b: string, c}}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ '{a: number, b: string, c}' ]);
    });

    it('nullable type', function() {
        var tagTypes = parse('{?number}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data', 'nullable');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'number' ]);

        expect(tagTypes.nullable).to.be.ok();
    });

    it('non-nullable type', function() {
        var tagTypes = parse('{!number}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data', 'nonNullable');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'number' ]);

        expect(tagTypes.nonNullable).to.be.ok();
    });

    it('variable number of that type', function() {
        var tagTypes = parse('{...number}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ '...number' ]);
    });

    it('optional parameter', function() {
        var tagTypes = parse('{number=}');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data', 'optional');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(1);
        expect(tagTypes.data).to.eql([ 'number' ]);

        expect(tagTypes.optional).to.be.ok();
    });

    it('error parameter', function() {
        var tagTypes = parse('number');
        expect(tagTypes).to.be.a(Object);
        expect(tagTypes).to.only.have.keys('data');

        expect(tagTypes.data).to.be.a(Array);
        expect(tagTypes.data).to.have.length(0);
        expect(tagTypes.data).to.eql([]);
    });
});
