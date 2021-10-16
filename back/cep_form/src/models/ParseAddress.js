const ParseAddress = {
  parseData(data) {
    const customData = {
      cep: data.cep,
      logradouro: data.logradouro,
      localidade: data.localidade,
      uf: data.uf,
    };
    return customData;
  },
};

export default ParseAddress;
