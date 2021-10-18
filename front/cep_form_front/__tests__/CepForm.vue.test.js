import { shallowMount } from "@vue/test-utils";

import { CepForm } from "../src/components/CepForm.vue";

const wrapper = shallowMount(CepForm);

describe("INIT COMPONENT TESTS", () => {
  it("has a created hook", () => {
    expect(typeof CepForm.created).toBe("function");
  });

  it("sets the correct default data", () => {
    expect(typeof CepForm.data).toBe("function");
    const defaultData = CepForm.data();
    expect(defaultData.max).toBe(8);
    expect(defaultData.text).toBe("");
    expect(defaultData.myInputModel).toBe("");
    expect(defaultData.mask).toBe("00000-000");
    expect(defaultData.isDisabled).toBe(false);
    expect(defaultData.cep).toBe("");

    expect(defaultData.estado).toBe("");
    expect(defaultData.cidade).toBe("");
    expect(defaultData.logradouro).toBe("");
    expect(defaultData.loading).toBe(false);
    expect(defaultData.color).toBe("#000");
    expect(defaultData.size).toBe("10px");
    expect(defaultData.usedStrings.invalidCep).toBe("Digite um CEP válido!");
    expect(defaultData.usedStrings.invalidCepTypeOther).toBe(
      "CEP não encontrado. Digite um CEP válido!"
    );
    expect(defaultData.usedStrings.lookCep).toBe("Buscar CEP");
    expect(defaultData.usedStrings.cep).toBe("CEP: ");
    expect(defaultData.usedStrings.state).toBe("Estado: ");
    expect(defaultData.usedStrings.city).toBe("Cidade: ");
    expect(defaultData.usedStrings.address).toBe("Logradouro: ");
  });
});
