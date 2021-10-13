const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const SearchedCep = require("./services/SearchedCep");
const { json } = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let db = [
  {
    cep: "04571-010",
    logradouro: "Avenida Engenheiro Luiz Carlos Berrini",
    complemento: "até 1405 - lado ímpar",
    bairro: "Cidade Monções",
    localidade: "São Paulo",
    uf: "SP",
    unidade: "",
    ibge: "3550308",
    gia: "1004",
  },
];

//https://viacep.com.br/ws/04571010/json

async function getCep(term) {
  //   const products = await SearchedCep.getProductsByTerm(term);
  //   console.log(products);

  const baseURL = "https://viacep.com.br/ws";

  //   try {
  //     const response = await fetch(`${this.baseURL}/${term}/json`);
  //     console.log("eNTROU AQUI");
  //     const body = await response.text();
  //     return body.length;
  //   } catch (err) {
  //     return {
  //       error: true,
  //       status: err.status,
  //       details: err.message,
  //     };
}

app.get("/", (req, res) => {
  const http = require("http");
  var data;
  var sts;

  request = http.get(`http://viacep.com.br/ws/02441001/json`, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    // console.log("OLHA OS DADOS AI GENTE", response.headers);

    // response.on("data", (d) => {
    //   console.log(`DATA: ${console.log(response.)}`);
    //   //   console.log(json(d));
    //   //   data = process.stdout.write(d);
    // });

    // res.on("data", function (chunk) {
    //   console.log("BODY: " + chunk);
    // });

    var body = "";
    res.on("data", function (chunk) {
      body += chunk;
    });
    res.on("end", function () {
      console.log(body);
    });

    request.on("error", (error) => {
      console.error(error);
      data = error;
    });

    sts = response.statusCode;

    if (response.statusCode == 200) {
      console.log("DEU 200 RAPAZ");
    } else if (response.statusCode >= 400) {
      console.log("IXI, DEU ERRO RAPAZ", response.statusCode);
    }
  });

  request.end();

  console.log("BANANA");

  res.status(456);
  res.send("None shall pass");

  //   console.log(res.json(data));

  //   return res.json(data);
  return res.status(sts);

  req.end();
});

// app.get("/", (req, res) => {
// res.send("Funcionando... ${req}");
// return res.json(db);
//   res.send(getCep("02441001"));

//   const options = {
//     hostname: "whatever.com",
//     port: 3000,
//     path: "/todos",
//     method: "GET",
//   };

// });

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

// const http = require("http");
// // const { url } = require("inspector");
// const MercadoLivre = require("./services/MercadoLivre");
// const MagazineLuiza = require("./services/MagazineLuiza");
// const Cache = require("./utils/Cache");

// const app = http.createServer(async (req, res) => {
//   const term = req.url.replace("/", "");

//   if (term.length < 1) {
//     res.writeHead(400, { "Content-type": "application/json; charset=utf-8" }),
//       res.write(JSON.stringify("O Termo de busca não foi informado")),
//       res.end();
//   }

//   const cachedProducts = Cache.getCache(term);

//   if (cachedProducts) {
//     res.writeHead(200, { "Content-type": "application/json; charset=utf-8" });
//     res.write(JSON.stringify(cachedProducts));
//     return res.end();
//   }

//   // const products = await MercadoLivre.getProductsByTerm(term);
//   const products = await MagazineLuiza.getProductsByTerm(term);

//   console.log(term, products);

//   if (products.error) {
//     res.writeHead(503, { "Content-type": "application/json; charset=utf-8" });
//     res.write(JSON.stringify(products.details));
//     return res.end();
//   }

//   // Cache.setCache(term, JSON.stringify(products));

//   res.writeHead(200, { "Content-type": "application/json; charset=utf-8" });

//   // res.write(JSON.stringify("Servidor rodando"));
//   res.write(JSON.stringify(products));
//   res.end();
// });

// app.listen(3000, () => {
//   console.log("Servidor rodando");
// });
