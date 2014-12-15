var StubFluxxor = require('./index.js');

describe("StubFluxxor", function() {
    describe("#store", function() {
        var stores, subject;
        beforeEach(function() {
            stores = {
                storeOne: {
                    fnOne: function() {},
                    fnTwo: function() {},
                    propOne: 'foo',
                    propTwo: 'bar',
                },
                storeTwo: {
                    fnOne: function() {},
                    fnTwo: function() {},
                    propOne: 'foo',
                    propTwo: 'bar',
                }
            };

            subject = new StubFluxxor(stores);
        });

        it("should return a mock store", function() {
            expect(subject.store('storeOne')).toBeDefined();
            expect(subject.store('storeTwo')).toBeDefined();
        });

        it("should stub all the methods", function() {
            expect(subject.store('storeOne').fnOne()).toBeUndefined();
            expect(subject.store('storeOne').fnTwo()).toBeUndefined();
            expect(subject.store('storeTwo').fnOne()).toBeUndefined();
            expect(subject.store('storeTwo').fnTwo()).toBeUndefined();
        });

        it("should stub event emitter methods", function() {
            expect(subject.store('storeOne').on()).toBeUndefined();
        });

        it("should not include properties", function() {
            expect(subject.store('storeOne').propOne).toBeUndefined();
            expect(subject.store('storeOne').propTwo).toBeUndefined();
            expect(subject.store('storeTwo').propOne).toBeUndefined();
            expect(subject.store('storeTwo').propTwo).toBeUndefined();
        });

        it("should throw when an invalid store key is provided", function() {
            expect(function() {
                subject.store('rubbish!');
            }).toThrow();
        });
    });

    describe("actions", function() {
        beforeEach(function() {
            subject = new StubFluxxor({}, {
                thing: function() {},
                foo: {
                    bar: function() {}
                }
            });
        });
        it("should stash the provided actions", function() {
            expect(subject.actions.thing).toBeDefined();
            expect(subject.actions.foo.bar).toBeDefined();
        });
    });
});
