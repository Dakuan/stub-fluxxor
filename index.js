var _ = require('lodash');

function _createStubStore(memo, value, key) {
    memo[key] = _.chain(value)
        .functions()
        .reduce(_stubStoreMethods, {})
        .value();
    return memo;
}

function _stubStoreMethods(memo, key) {
    memo[key] = function() {};
    memo.on = function() {};
    return memo;
}

function StubFluxxor(stores) {
    this._stores = _(stores).chain()
        .forIn()
        .reduce(_createStubStore, {})
        .value();
}

StubFluxxor.prototype.store = function(storeKey) {
    var store = this._stores[storeKey];
    if (store) {
        return store;
    } else {
        throw ['Error: no store found for key:', storeKey].join(' ');
    }
};

module.exports = StubFluxxor;
