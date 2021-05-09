import { expect, server, BASE_URL } from './setup';
import {adminToken} from "../src/settings";

describe('Course', ()=>{
  it('get all courses without admin token', (done) => {
    server
      .get(`${BASE_URL}/api/course/get-all`).expect(401);
      done();
  });
});

describe('Course', ()=>{
  it('get all courses with admin token', (done) => {
    server
      .get(`${BASE_URL}/api/course/get-all`)
      .set({'Authorization':`Bearer ${adminToken}`})
      .expect(200)
      .end((req,res) => {
        expect(res.body.course).to.be.instanceOf(Array);
        res.body.course.forEach(c => {
          expect(c.contents).to.be.instanceOf(Array);
          
          c.contents.forEach(content => {
            expect(JSON.parse(content.data)).to.be.instanceOf(Object);
          })
        });

        done();
      });
  });
});
