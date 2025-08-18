export const useUserId = () => {
  const key = 'x_user_id';
  const state = useState<string>('x-user-id', () => '');
  if (process.client && !state.value) {
    state.value = localStorage.getItem(key) || crypto.randomUUID();
    localStorage.setItem(key, state.value);
  }
  return state;
};
