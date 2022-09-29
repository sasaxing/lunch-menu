import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FoodStock from "../FoodStock.vue";

describe("FoodStock", () => {
  it("renders properly", () => {
    const wrapper = mount(FoodStock);
    expect(wrapper.text()).toContain("Add new food");
  });
});
