/* eslint-disable */

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../../server');
const hook = require('../hooks');

hook.beforeAll();
hook.afterEachOne();
hook.afterAll();

describe('GET /rss-to-json', function () {
  it('Should convert rss to json', function (done) {
    request(server)
      .get(`/api/v1/rss-to-json?rss_url=${sampleRssUrl}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const body = res.body;

        expect(body.status).to.equal('ok');
        expect(body).to.have.property('feed');
        expect(body).to.have.property('items');
        expect(body.feed).to.have.property('link');
        expect(body.feed).to.have.property('title');
        expect(body.feed).to.have.property('description');

        return done();
      });
  });
});

const sampleRssUrl = 'https://fliplet.com/feed/';
