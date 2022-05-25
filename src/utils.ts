import { AuthorizationStatus } from './const';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const getRandomNumber = (a: number, b: number): number => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Number((Math.random() * (max - min) + min).toFixed());
};

export const calculateStarsCount = (rating: number): number => Math.round(rating) * 20;

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.substring(1);

export const formatDate = (date: string): string => new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
