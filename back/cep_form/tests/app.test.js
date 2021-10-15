import app from "../app.js";
import request from "supertest";

describe("CHECK IF IS REQUEST WORKING FINE", () => {
  it("should ", async () => {
    const res = await request(app).get("/01001001");
    console.log("oooo", res.body);
    expect(res.statusCode).toEqual(200);
  });

  test("CHECK IF STATUS CODE IS 200", async () => {
    const res = await request(app).get("/01001001");
    expect(res.statusCode).toEqual(200);
  });
});

describe("CHECK IF IS REQUEST WORKING FINE WITH INCORRECT REQUEST", () => {
  test("CHECK IF STATUS CODE IS 406", async () => {
    const res = await request(app).get("/00000000");
    expect(res.statusCode).toEqual(406);
  });
  test("CHECK IF ERROR INFORMATIONS IS PRESENT", async () => {
    const res = await request(app).get("/00000000");
    expect(res.body.erro).toEqual(true);
  });
});

describe("CHECK IF IS REQUEST HAS THE CORRECT INFORMATIONS COMMING FROM API", () => {
  let res;

  beforeAll(async () => {
    res = await request(app).get("/01001001");
  });

  test("CHECK IF 'LOGRADOURO' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.logradouro).toEqual("Praça da Sé");
  });

  test("CHECK IF 'LOCALIDADE' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.localidade).toEqual("São Paulo");
  });

  test("CHECK IF 'UF' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.uf).toEqual("SP");
  });

  test("CHECK IF 'CEP' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.cep).toEqual("01001-001");
  });
});

// {
//     cep: '01001-001',
//     logradouro: 'Praça da Sé',
//     complemento: 'lado par',
//     bairro: 'Sé',
//     localidade: 'São Paulo',
//     uf: 'SP',
//     ibge: '3550308',
//     gia: '1004',
//     ddd: '11',
//     siafi: '7107'
//   }
