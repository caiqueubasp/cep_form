<template>
  <div id="gran-container">
    <div id="container">
      <div id="form-control">
        <input
          type="number"
          placeholder="00000-000"
          v-mask="mask"
          v-model="myInputModel"
          max="8"
        />

        <button
          :disabled="isDisabled"
          class="default--word--style"
          @click="getCepData"
        >
          Buscar CEP
        </button>
      </div>
      <div id="loading-container" class="flex--center--config">
        <pulse-loader
          :loading="loading"
          :color="color"
          :size="size"
        ></pulse-loader>
      </div>

      <div id="cep-response" class="flex--center--config">
        <ul>
          <li>
            <p class="default--word--style">
              <span class="font-title">CEP: </span> {{ cep }}
            </p>
          </li>
          <li>
            <p class="default--word--style">
              <span class="font-title">Estado: </span> {{ estado }}
            </p>
          </li>
          <li>
            <p class="default--word--style">
              <span class="font-title">Cidade: </span> {{ cidade }}
            </p>
          </li>
          <li>
            <p class="default--word--style">
              <span class="font-title">Logradouro: </span> {{ logradouro }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueMask from "v-mask";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

Vue.use(VueMask);

export default {
  name: "CepForm",
  components: {
    PulseLoader,
  },
  data() {
    return {
      max: 8,
      text: "",
      myInputModel: "",
      mask: "########",
      isDisabled: false,
      cep: "",
      estado: "",
      cidade: "",
      logradouro: "",
      loading: false,
      color: "#000",
      size: "10px",
    };
  },

  methods: {
    changeCepDetailsVisibilty(visibility) {
      document.getElementById("cep-response").style.display = visibility;
    },
    cepError(msg) {
      alert(msg);
    },
    async getCepData() {
      console.log("TAMANHO DO CEP", this.myInputModel.length);

      if (this.myInputModel.length < 8) {
        console.log("TAMANHO DO CEP", this.myInputModel.length);
        this.cepError("Digite um CEP válido!");
      } else {
        this.loading = true;
        this.isDisabled = true;
        setTimeout(async () => {
          await fetch(`http://localhost:3000/${this.myInputModel}`)
            .then(async (response) => {
              const data = await response.json();
              console.log(data);
              if (data.erro == true) {
                this.cepError("CEP não encontrado. Digite um CEP válido!");
                console.error("INVALID REQUEST");
                this.changeCepDetailsVisibilty("none");
              } else {
                this.cep = data.cep;
                this.estado = data.uf;
                this.cidade = data.localidade;
                this.logradouro = data.logradouro;
                this.changeCepDetailsVisibilty("flex");
              }
            })
            .catch((error) => {
              this.cepError("CEP não encontrado. Digite um CEP válido!");
              console.error("ERROR", error);
            });
          this.loading = false;
          this.isDisabled = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
#gran-container {
  width: 100%;
  height: 500px;
  background-color: rgb(189, 189, 189);
  display: flex;
  justify-content: center;
  align-items: center;
}

#form-control {
  width: 500px;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

#form-control input {
  width: 200px;
  height: 50px;
  color: #85888c;
  font-size: 24px;
}

#form-control input:focus {
  /* border: rgba(48, 101, 245, 0.699) 2px solid;
   */
  outline: rgba(48, 101, 245, 0.699) 2px solid;
  border: none;
}

#form-control button {
  width: 120px;
  height: 50px;
  margin: 1px;
  background-color: black;
  color: white;
  border: none;
}

#form-control button:active {
  opacity: 0.8;
  width: 115px;
  height: 45px;
}

#form-control button:hover {
  opacity: 0.8;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

#loading-container {
  width: 500px;
  height: 40px;
}

#gran-container #cep-response {
  width: 500px;
  height: 200px;
  background-color: white;
  display: none;
}

ul {
  list-style-type: none;
  width: 400px;
}

li {
  width: 400px;
  text-align: start;
}

span {
  font-weight: bold;
}

.font-title {
  color: black;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
}

.gray-color {
  color: #85888c;
}

.flex--center--config {
  display: flex;
  justify-content: center;
  align-items: center;
}

.default--word--style {
  font-size: 16px;
  color: #85888c;
}
</style>
