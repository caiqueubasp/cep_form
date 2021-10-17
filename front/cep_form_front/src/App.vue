<template>
  <div id="app">
    <CepForm></CepForm>
  </div>
</template>

<script>
import CepForm from "./components/CepForm.vue";

export default {
  name: "App",
  components: {
    CepForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
