const fetch = require("fetch");

const SearchedCep = {
  name: "SearchedCep",
  baseURL: "https://viacep.com.br/ws",
  async getCepByTerm(term) {
    try {
      const response = await fetch(`${this.baseURL}/${term}/json`);
      const body = await response.text();
      const listCep = [];

      return body;
    } catch (err) {
      return {
        error: true,
        status: err.status,
        details: err.message,
      };
    }
  },
};

module.exports = SearchedCep;
