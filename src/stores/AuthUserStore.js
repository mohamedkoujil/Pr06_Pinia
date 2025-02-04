import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthUserStore = defineStore("AuthUserStore", () => {
  const user = ref({
    id: 1,
    name: "John Doe",
    email: "example@example.com",
  });
  const setUser = (newUser) => {
    user.value = newUser;
  };
  const getUser = () => {
    return user.value;
  };
  const clearUser = () => {
    user.value = null;
  };
  return {
    user,
    setUser,
    getUser,
    clearUser,
  };
});
