'use strit';

require('es6-promise').polyfill();

var fetchMock = require('../server.js');
var fetchCalls = [];
var expect = require('chai').expect;
var sinon = require('sinon');

// we can't use sinon to spy on fetch in these tests as fetch-mock
// uses it internally and sinon doesn't allow spying on a previously
// stubbed function, so just use this very basic stub
var dummyFetch = function () {
	fetchCalls.push([].slice.call(arguments));
	return Promise.resolve(arguments);
};

var err = function (err) {
	console.log(error);
}

require('./spec')(fetchMock, GLOBAL);

describe('non-global use', function () {

	before(function () {
		try {
			fetchMock.restore();
		} catch (e) {}
	});
	it('stubs non global fetch if function passed in', function () {

		fetchMock.useNonGlobalFetch(dummyFetch);
		expect(fetchMock.realFetch).to.equal(dummyFetch);
		var mock = fetchMock.mock();
		expect(typeof mock).to.equal('function');
		expect(function () {
			mock('url', {prop: 'val'})
		}).not.to.throw();
		expect(fetchMock.called('__unmatched')).to.be.true;
		expect(fetchCalls.length).to.equal(1);
		expect(fetchCalls[0]).to.eql(['url', {prop: 'val'}]);

		fetchMock.restore();
		fetchMock.usesGlobalFetch = true;
	});
});





