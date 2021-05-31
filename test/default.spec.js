process.env.MONGO_URI = "mongodb+srv://admin:elCabas67@dbv1.gabzs.mongodb.net/database?retryWrites=true&w=majority";
process.env.JWT_SECRET = "MfDbcbt";

describe("DEFAULT", () => it("default test ad", done => done()));

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');

chai.should();
chai.use(chaiHttp);
let agent =  chai.request;

const error = (res, status, error) => {
    res.should.have.status(status);
    res.body.should.be.a('object');
    res.body.should.have.property('error');
    res.body.should.have.property('success');
    res.body.success.should.be.eql(false);
    res.body.error.should.be.eql(error);
}

describe("SIGNUP", () => {
    it('It should send an 400 error (missing password)', (done) => {
        agent(server).post('/account/signup')
            .send({email: 'unemail@epitech.eu'})
            .end((err, res) => {
                error(res, 400, "Missing credentials");
                done();
            });
    });
    it('It should send an 400 error (missing email)', (done) => {
        agent(server).post('/account/signup')
            .send({password: 'unmdp'})
            .end((err, res) => {
                error(res, 400, "Missing credentials");
                done();
            });
    });
    it('It should successfull signup', (done) => {
        agent(server).post('/account/signup')
            .send({email: 'unemail@epitech.eu', password: 'unmdp', username: "User"})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.eql({});
                done();
            });
    });
    it('It should send an 400 error', (done) => {
        agent(server).post('/account/signup')
            .send({email: 'unemail@epitech.eu', password: 'unmdp'})
            .end((err, res) => {
                error(res, 400, "Account already existing with this email");
                done();
            });
    });
});

describe("SIGNIN", () => {
    it('It should send an 400 error (missing password)', (done) => {
        agent(server).post('/account/signin')
            .send({email: 'unemail@epitech.eu'})
            .end((err, res) => {
                error(res, 400, "Missing credentials");
                done();
            });
    });
    it('It should send an 400 error (missing email)', (done) => {
        agent(server).post('/account/signin')
            .send({password: 'unmdp'})
            .end((err, res) => {
                error(res, 400, "Missing credentials");
                done();
            });
    });
    it('It should successfull signin', (done) => {
        agent(server).post('/account/signin')
            .send({email: 'unemail@epitech.eu', password: 'unmdp'})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('data');
                res.body.should.have.property('success');
                res.body.success.should.be.eql(true);
                done();
            });
    });
});


describe("FORGOT", () => {
    it('It should send an email', (done) => {
      agent(server).post('/account/forgot')
          .send({email: 'unemail@epitech.eu'})
          .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.eql({});
              done();
          });
    });
    it('It should send an 400 error', (done) => {
        agent(server).post('/account/forgot')
            .send({email: 'unemailbidon@epitech.eu'})
            .end((err, res) => {
                error(res, 400, "No Account with this email");
                done();
            });
    });
    it('It should send an 400 error', (done) => {
        agent(server).post('/account/forgot')
            .send({email: undefined})
            .end((err, res) => {
                error(res, 400, "Email is missing");
                done();
            });
    });
});
