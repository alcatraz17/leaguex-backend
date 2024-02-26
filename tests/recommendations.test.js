const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../src/server'); // Import your Express app instance

chai.use(chaiHttp);

describe('Recommendation API', () => {
  it('should return recommendations for a valid user', async () => {
    const res = await chai
      .request(app)
      .get('/api/user/recommendations')
      .query({ user_id: 1 });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array'); // Assuming recommendations is an array
    // Add more assertions based on your response structure
  });

  it('should return 404 for an invalid user', async () => {
    const res = await chai
      .request(app)
      .get('/api/user/recommendations')
      .query({ user_id: 120 });

    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'User not found');
  });

  after(async () => {});
});
