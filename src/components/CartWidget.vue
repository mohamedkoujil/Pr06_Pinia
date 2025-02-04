<script setup>
// imports
import { ref } from "vue";
import { useCartStore } from "../stores/CartStore";
import CartItem from "./CartItem.vue";
import { storeToRefs } from "pinia";

const { setItemCount, clearCart, checkout, productCount, clearItem } =
  useCartStore();
const { getUniqueItems, getItemsCount, totalPrice, isEmpty } = storeToRefs(
  useCartStore()
);

// data
const active = ref(false);
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ getItemsCount }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="!isEmpty">
        <ul class="items-in-cart">
          <CartItem
            v-for="item in getUniqueItems"
            :key="item.name"
            :product="{ name: item.name, price: item.price }"
            :count="productCount(item)"
            @updateCount="setItemCount(item, $event)"
            @clear="clearItem(item)"
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>{{ totalPrice }}$</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="clearCart"
            >Clear Cart</AppButton
          >
          <AppButton class="primary" @click="checkout">Checkout</AppButton>
        </div>
      </div>
      <!-- Uncomment and use condition to show when cart is empty -->
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
