import { getItem, setItem, removeItem } from './storage';

const USERS_KEY = 'users';
const CURRENT_KEY = 'current_user';

export async function signup(username, password) {
  if (!username || !password) return false;
  const users = (await getItem(USERS_KEY, [])) || [];
  const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (exists) return false;
  users.push({ username, password });
  await setItem(USERS_KEY, users);
  return true;
}

export async function login(username, password) {
  const users = await getItem(USERS_KEY, []);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return null;
  await setItem(CURRENT_KEY, user);
  return user;
}

export async function getCurrentUser() {
  return await getItem(CURRENT_KEY, null);
}

export async function logout() {
  await removeItem(CURRENT_KEY);
}

export async function listUsers() {
  return await getItem(USERS_KEY, []);
}