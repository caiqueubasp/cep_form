<template>
  <div id="gran-container">
    <section id="container">
      <form id="form-control">
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
          {{ this.usedStrings.lookCep }}
        </button>
      </form>
    </section>

    <div id="loading-container" class="flex--center--config">
      <pulse-loader
        :loading="loading"
        :color="color"
        :size="size"
      ></pulse-loader>
    </div>

    <section id="cep-response" class="flex--center--config">
      <ul>
        <li>
          <p class="default--word--style">
            <strong class="font-title"> {{ this.usedStrings.cep }} </strong>
            {{ cep }}
          </p>
        </li>
        <li>
          <p class="default--word--style">
            <strong class="font-title">{{ this.usedStrings.state }}</strong>
            {{ estado }}
          </p>
        </li>
        <li>
          <p class="default--word--style">
            <strong class="font-title">{{ this.usedStrings.city }}</strong>
            {{ cidade }}
          </p>
        </li>
        <li>
          <p class="default--word--style">
            <strong class="font-title">{{ this.usedStrings.address }}</strong>
            {{ logradouro }}
          </p>
        </li>
      </ul>
    </section>
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
      usedStrings: {
        invalidCep: "Digite um CEP válido!",
        invalidCepTypeOther: "CEP não encontrado. Digite um CEP válido!",
        lookCep: "Buscar CEP",
        cep: "CEP: ",
        state: "Estado: ",
        city: "Cidade: ",
        address: "Logradouro: ",
      },
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
      if (this.myInputModel.length < 8) {
        this.cepError(this.usedStrings.invalidCep);
      } else {
        this.loading = true;
        this.isDisabled = true;
        setTimeout(async () => {
          await fetch(`http://localhost:3000/${this.myInputModel}`)
            .then(async (response) => {
              const data = await response.json();
              console.log(data);
              if (data.erro == true) {
                this.cepError(this.usedStrings.invalidCepTypeOther);
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
              this.cepError(this.usedStrings.invalidCepTypeOther);
              console.error("ERROR", error);
            });
          this.loading = false;
          this.isDisabled = false;
        }, 1500);
      }
    },
  },
};
</script>

<style>
:root {
  --global--gray--color: #bdbdbd;
  --global--dark--gray--color: #6f7073;
  --global--blue--color: #3065f5;
}

#gran-container {
  width: 100%;
  height: 800px;
  background-color: var(--global--gray--color);
}

#gran-container #container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#gran-container #form-control {
  width: 500px;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

#gran-container #form-control input {
  width: 200px;
  height: 50px;
  color: var(--global--dark--gray--color);
  font-size: 24px;
  margin-right: 2%;
  border: 1px solid var(--global--gray--color);
}

#gran-container #form-control input:focus {
  outline: var(--global--blue--color) 2px solid;
  border: none;
  opacity: 0.6;
}

#form-control button {
  width: 120px;
  height: 50px;
  margin: 1px;
  background-color: black;
  color: white;
  border: none;
}

#gran-container #form-control button:active {
  opacity: 0.8;
  transform: scale(0.9);
}

#gran-container #form-control button:hover {
  opacity: 0.8;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

#gran-container #loading-container {
  width: 100%;
  height: 40px;
}

#gran-container #cep-response {
  width: 500px;
  height: 200px;
  background-color: white;
  display: none;
  margin: auto;
}

#gran-container ul {
  list-style-type: none;
  width: 400px;
}

#gran-container li {
  width: 400px;
  text-align: start;
}

#gran-container span {
  font-weight: bold;
}

#gran-container .font-title {
  color: black;
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
}

#gran-container .flex--center--config {
  display: flex;
  justify-content: center;
  align-items: center;
}

#gran-container .default--word--style {
  font-size: 16px;
  color: var(--global--dark--gray--color);
}

@media (min-width: 100px) and (max-width: 500px) {
  #gran-container {
    width: 100%;
    height: 600px;
    background-color: var(--global--gray--color);
  }

  #gran-container #container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #gran-container #form-control {
    width: 400px;
    height: 200px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
  }

  #gran-container #form-control input {
    width: 300px;
    height: 50px;
    margin-right: 0%;
  }

  #gran-container #form-control button {
    width: 300px;
    height: 50px;
    margin: 1px;
    background-color: black;
    color: white;
    border: none;
  }

  #gran-container #gran-container #cep-response {
    width: 400px;
    height: 200px;
    background-color: white;
    display: none;
    margin: auto;
  }

  #gran-container .font-title {
    font-size: 14px;
  }

  #gran-container .default--word--style {
    font-size: 12px;
  }
}
</style>
