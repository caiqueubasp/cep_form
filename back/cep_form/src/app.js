import axios from "axios";
import express from "express";
import cors from "cors";
import ParseAddress from "./models/ParseAddress.js";

const app = express();
app.use(cors());

app.get("/:cep", async (req, res) => {
  const { cep } = req.params;
  const url = `http://viacep.com.br/ws/${cep}/json`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.erro) {
      res.status(406).send(data);
    } else {
      const customData = ParseAddress.parseData(data);

      res.status(200).send(customData);
    }
  } catch (error) {
    console.log(error);
    res.status(406).send(error);
  }
});

export default app;
