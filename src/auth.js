const KEY = 'ep:user';

export function setUser(user) {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (err) {
    if (import.meta?.env?.DEV) console.warn('setUser failed', err);
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    if (import.meta?.env?.DEV) console.warn('getUser failed', err);
    return null;
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(KEY);
  } catch (err) {
    if (import.meta?.env?.DEV) console.warn('clearUser failed', err);
  }
}

export function getUserId() {
  const u = getUser();
  return u?.id || null;
}

export function getUserRole() {
  const u = getUser();
  return u?.role || null;
}
