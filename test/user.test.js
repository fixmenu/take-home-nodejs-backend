import { expect, server, BASE_URL } from './setup';
import {adminToken} from "../src/settings";

describe('User', ()=>{
  it('get users without admin token', (done) => {
    server
      .post(`${BASE_URL}/admin/api/user/get-by-query`)
      .send({value:''})
      .expect(401).end(() => { done();});
   
  });
});

describe('User', ()=>{
  it('get users with admin token', (done) => {
    server
      .post(`${BASE_URL}/admin/api/user/get-by-query`)
      .send({value:''})
      .set({'Authorization':`Bearer ${adminToken}`})
      .expect(200)
      .end((req,res) => {
        expect(res.body.user).to.be.instanceOf(Array);
        console.log(res.body);
        res.body.user.forEach(u => {
          expect(u).to.not.have.own.property('password');
        });

        done();
      });
  });
});
