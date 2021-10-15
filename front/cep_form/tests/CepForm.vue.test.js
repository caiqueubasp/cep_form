import { shallowMount } from "@vue/test-utils";
import CepForm from "../src/components/CepForm.vue";

describe("fisrt vue test", () => {
  const wrapper = shallowMount(CepForm);
  const vm = wrapper.vm;

  test("check", () => {
    vm.getCepData();

    vm.myInputModel;

    expect(vm.myInputModel).toBe("");
  });
});
