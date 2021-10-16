import app from "../src/app.js";
import { jest } from "@jest/globals";
import request from "supertest";
import ParseAddress from "../src/models/ParseAddress.js";

jest.useFakeTimers();

const completeCepResponseExemple = {
  cep: "01001-001",
  logradouro: "Praça da Sé",
  complemento: "lado par",
  bairro: "Sé",
  localidade: "São Paulo",
  uf: "SP",
  ibge: "3550308",
  gia: "1004",
  ddd: "11",
  siafi: "7107",
};

const parsedCepExemple = {
  cep: "01001-001",
  logradouro: "Praça da Sé",
  localidade: "São Paulo",
  uf: "SP",
};

const errorExemple = { erro: true };

describe("CHECK IF IS REQUEST WORKING FINE WITH VALID CEP", () => {
  let res;

  beforeAll(async () => {
    res = await request(app).get("/01001001");
  });

  test("CHECK IF STATUS CODE IS 200", async () => {
    expect(res.statusCode).toEqual(200);
  });

  test("CHECK IF RESPONSE BODY IS EQUAL THE MOCKED EXEMPLE", async () => {
    expect(res.body).toEqual(parsedCepExemple);
  });

  test("CHECK IF RESPONSE BODY TYPE IS A OBJECT", async () => {
    expect(typeof res.body).toEqual("object");
  });
});

describe("CHECK IF IS REQUEST WORKING FINE WITH INCORRECT REQUEST", () => {
  let res;

  beforeAll(async () => {
    res = await request(app).get("/00000000");
  });

  test("CHECK IF STATUS CODE IS 406", async () => {
    expect(res.statusCode).toEqual(406);
  });

  test("CHECK IF ERROR INFORMATIONS IS PRESENT", async () => {
    expect(res.body.erro).toEqual(true);
  });

  test("CHECK IF ERROR BODY IS EQUAL EXEMPLE", async () => {
    expect(res.body).toEqual(errorExemple);
  });

  test("CHECK IF ERROR TYPE IS A OBJECT", async () => {
    expect(typeof res.body).toEqual("object");
  });
});

describe("CHECK IF IS REQUEST HAS THE CORRECT INFORMATIONS COMMING FROM API", () => {
  let res;

  beforeAll(async () => {
    res = await request(app).get("/01001001");
  });

  test("CHECK IF 'LOGRADOURO' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.logradouro).toEqual(parsedCepExemple.logradouro);
    expect(typeof res.body.logradouro).toEqual("string");
  });

  test("CHECK IF 'LOCALIDADE' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.localidade).toEqual(parsedCepExemple.localidade);
    expect(typeof res.body.localidade).toEqual("string");
  });

  test("CHECK IF 'UF' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.uf).toEqual(parsedCepExemple.uf);
    expect(typeof res.body.uf).toEqual("string");
  });

  test("CHECK IF 'CEP' RESPONSE VALUE IS CORRECT", async () => {
    expect(res.body.cep).toEqual(parsedCepExemple.cep);
    expect(typeof res.body.cep).toEqual("string");
  });
});

describe("TEST IF CORRECT PARSED ADDRESS FUNCTIONS IS CORRECTING WORKING", () => {
  let cepFullData;
  let errorVerification;

  beforeAll(async () => {
    cepFullData = completeCepResponseExemple;
    errorVerification = ParseAddress.parseData(errorExemple);
  });

  test("CHECK IF OBJECT IS PARSED CORRECTTING ", async () => {
    expect(ParseAddress.parseData(cepFullData)).toEqual(parsedCepExemple);
  });

  test("CHECK IF OBJECT VALUES ARE UNDEFINED WHEN WROG PARAM IS CALLED", async () => {
    expect(errorVerification.cep).toEqual(undefined);
    expect(errorVerification.logradouro).toEqual(undefined);
    expect(errorVerification.localidade).toEqual(undefined);
    expect(errorVerification.uf).toEqual(undefined);
  });
});
