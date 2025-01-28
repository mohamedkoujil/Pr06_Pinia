import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("CartStore", () => {
  const cart = ref([]);
  const getItems = () => {
    return cart.value;
  };
  const getUniqueItems = () => {
    return [...new Set(cart.value)];
  };
  const getItemsCount = () => {
    return cart.value.length;
  };
  const addToCart = (count, product) => {
    for (let i = 0; i < count; i++) {
      cart.value.push(product);
    }
  };
  const removeItem = (item) => {
    const index = cart.value.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };
  const clearItem = (item) => {
    cart.value = cart.value.filter((i) => i.name !== item.name);
  };
  const productCount = (item) => {
    return cart.value.filter((i) => i.name === item.name).length;
  };
  const addItem = (item) => {
    console.log(item);
    cart.value.push(item);
  };
  const deleteItem = (item) => {
    const index = cart.value.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };
  const setItemCount = (item, count) => {
    cart.value = cart.value.filter((i) => i.name !== item.name);
    for (let i = 0; i < count; i++) {
      cart.value.push(item);
    }
  };
  const totalPrice = () => {
    return cart.value.reduce((acc, item) => acc + item.price, 0);
  };
  const isEmpty = () => {
    return cart.value.length === 0;
  };
  const clearCart = () => {
    cart.value = [];
  };
  return {
    cart,
    getItems,
    getUniqueItems,
    getItemsCount,
    addToCart,
    removeItem,
    clearItem,
    productCount,
    addItem,
    deleteItem,
    setItemCount,
    totalPrice,
    isEmpty,
    clearCart,
  };
});
