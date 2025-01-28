import { defineStore } from "pinia";
import { ref } from "vue";
import productsRaw from "../data/products.json";

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref(productsRaw);
  const getItems = () => {
    return products.value;
  };
  const getItemsCount = () => {
    return products.value.length + 1;
  };
  const addItem = (item) => {
    products.value.push(item);
  };
  return {
    products,
    getItems,
    getItemsCount,
    addItem,
  };
});
