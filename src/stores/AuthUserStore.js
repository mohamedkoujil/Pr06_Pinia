export const useAuthUserStore = defineStore("AuthUserStore", () => {
  const user = ref(null);
  const setUser = (newUser) => {
    user.value = newUser;
  };
  const clearUser = () => {
    user.value = null;
  };
  return {
    user,
    setUser,
    clearUser,
  };
});
