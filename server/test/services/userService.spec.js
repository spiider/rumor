const chai = require('chai');
const sinon = require('sinon');
const UserService = require('./../../src/services/userService');

const { expect } = chai;

describe('UserService', () => {
  describe('#createUser', () => {
    it('expect return error when inserted invalid data', () => {
      expect(UserService.createUser({
        email: 'fakeemail',
        firstName: 'aa',
        lastName: 'bb',
        password: '112',
      })).to.be.a('string');
    });
    it('expect return ok when user is created', () => {
      sinon.stub(UserService, 'findUserByEmail').returns(null);
      expect(UserService.createUser({
        email: 'example@example.pt',
        firstName: 'aa',
        lastName: 'bb',
        password: '112',
      })).to.be.equals(null);
    });
  });

  describe('#validateUser', () => {
    it('expect return error when inserted invalid data', () => {
      const body = {
        email: 'fakeemail',
        firstName: 'aa',
        lastName: 'bb',
        password: '112',
      };
      expect(UserService.validateUser(body).message).to.be.a('string');
    });
    it('expect return true when is a valid user', () => {
      const body = {
        email: 'teste@example.com',
        firstName: 'aa',
        lastName: 'bb',
        password: '112',
      };
      expect(UserService.validateUser(body)).to.be.equals(null);
    });
  });
});
