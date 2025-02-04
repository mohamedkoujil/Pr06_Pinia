import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", () => {
  const cart = ref([]);

  const getItems = () => {
    return cart.value;
  };

  const groupedItems = computed(() => {
    return groupBy(cart.value, "name");
  });

  const getUniqueItems = computed(() => {
    return Object.keys(groupedItems.value).map(
      (name) => groupedItems.value[name][0]
    );
  });

  const getItemsCount = computed(() => {
    return cart.value.length;
  });

  const addToCart = (count, product) => {
    if (count < 1) {
      return;
    }
    for (let i = 0; i < count; i++) {
      cart.value.push({ ...product });
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
    return groupedItems.value[item.name]?.length || 0;
  };

  const setItemCount = (item, count) => {
    console.log(item.name, count);
    clearItem(item);
    addToCart(count, item);
  };

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0);
  });

  const isEmpty = computed(() => {
    return cart.value.length === 0;
  });

  const clearCart = () => {
    cart.value = [];
  };

  const checkout = () => {
    const { getUser } = useAuthUserStore();
    console.log("checkout");
    alert(
      `${getUser().name} just bought ${getItemsCount.value} items! Total: $${
        totalPrice.value
      }`
    );
  };

  return {
    cart,
    getItems,
    groupedItems,
    getUniqueItems,
    getItemsCount,
    addToCart,
    removeItem,
    clearItem,
    productCount,
    setItemCount,
    totalPrice,
    isEmpty,
    clearCart,
    checkout,
  };
});
