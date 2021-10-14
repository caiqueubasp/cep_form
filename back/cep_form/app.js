import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/:cep", async (req, res) => {
  var { cep } = req.params;
  var url = `http://viacep.com.br/ws/${cep}/json`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    var data = response.data;
    console.log("STATUS: ", response.status);

    if (data.erro) {
      console.log(data.erro);
      res.status(406).send(data);
    } else {
      var customData = {
        cep: data.cep,
        logradouro: data.logradouro,
        localidade: data.localidade,
        uf: data.uf,
      };

      res.status(200).send(customData);
    }
  } catch (error) {
    console.log(error);
    res.status(406).send(error);
  }
});

app.listen(3000, () =>
  console.log("servidor rodando em ---  http://localhost/3000")
);
