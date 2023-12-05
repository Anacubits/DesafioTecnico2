const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../script'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('API de Autenticação', () => {
  let token;

  // Testar o cadastro de usuário
  it('Deve cadastrar um novo usuário', (done) => {
    chai.request(app)
      .post('/signup')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('mensagem').equal('Usuário criado com sucesso');
        done();
      });
  });

  // Testar o login de usuário
  it('Deve autenticar o usuário e retornar um token', (done) => {
    chai.request(app)
      .post('/signin')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token; // Armazenar o token para os próximos testes
        done();
      });
  });

  // Testar a busca de usuário autenticado
  it('Deve retornar informações do usuário autenticado', (done) => {
    chai.request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('email').equal('test@example.com');
        done();
      });
  });

  // Testar rota não encontrada
  it('Deve retornar mensagem de rota não encontrada', (done) => {
    chai.request(app)
      .get('/notfound')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('mensagem').equal('Endpoint não encontrado');
        done();
      });
  });

  // Limpar o usuário criado nos testes
  after((done) => {
    // Adicione código para limpar o banco de dados ou ajustar o estado conforme necessário
    done();
  });
});


// Execute os testes usando o comando:mocha test

