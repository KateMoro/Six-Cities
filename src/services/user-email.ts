const USER_EMAIL = 'user-email';

export type Email = string;

export const getUserEmail = (): Email => {
  const email = localStorage.getItem(USER_EMAIL);
  return email ?? '';
};

export const saveUserEmail = (email: Email): void => {
  localStorage.setItem(USER_EMAIL, email);
};

export const dropUserEmail = (): void => {
  localStorage.removeItem(USER_EMAIL);
};
