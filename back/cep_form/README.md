# BACKEND - CEP_FORM

> README com instruções de como rodar o backend do projeto.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Contact](#contact)

## General Information

- Projeto de backend simples com o intuito de rodar uma API local,
  que faz uma consulta na no endpoint: http://viacep.com.br/ws/ ,
  faz um parse da resposta e disponibiliza um resumo das informações.

## Technologies Used PROD

- NODE - version 14.18.0
- AXIOS - version ^0.23.0
- CORS - version ^2.8.5

## Technologies Used PROD DEV

- EXPRESS - version ^4.17.1
- JEST - version ^27.2.5
- JEST-CLI - version ^27.2.5
- NODEMON - version ^2.0.13
- SUPERTEST - version ^6.1.6

## Screenshots

![Example screenshot](./img/screenshots/request_exemple_200.png)

## Setup

Para este projeto rodar é necessário ter o NODE instalado em sua maquina, caso ainda não tenha
veja o link: https://nodejs.org/en/download/ e instale antes de continuar.

Com o node instalado é necessário baixar o projeto e do GitHub em sua maquina local <br/>

HTTPS - `git clone https://github.com/caiqueubasp/cep_form.git` <br/>
SSH - `git clone git@github.com:caiqueubasp/cep_form.git` <br/>

Após baixar com o GIT, instale as dependencias:

dependencias gerais: `npm install`
dependencias em DEV: `npm i -D`

## Usage

Para este projeto selecionei a porta 3000, caso a mesma esteja rodando em outro local, deixe-a livre
ou mude no arquivo "src/server.js" a porta listada. <br/>

para rodar o servidor digite no terminal: <br/>

`nodemon server.js`

## Utils Links

- NODE: https://nodejs.org/en/download/
- NODEMON: https://www.npmjs.com/package/nodemon
- AXIOS: https://www.npmjs.com/package/axios
- CORS: https://www.npmjs.com/package/cors
- EXPRESS: https://expressjs.com/pt-br/
- JEST: https://jestjs.io/
- SUPERTEST: https://www.npmjs.com/package/supertest

## Contact

Created by [@caiqueubasp] - feel free to contact me!
LinkedIn: https://www.linkedin.com/in/caique-souza-00072669/
GITHUB: https://github.com/caiqueubasp
