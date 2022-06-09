import dayjs from 'dayjs';
import { AuthorizationStatus } from './const';
import { OfferType } from './types/offer';
import { CommentType } from './types/comment';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const getRandomNumber = (a: number, b: number): number => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Number((Math.random() * (max - min) + min).toFixed());
};

export const calculateStarsCount = (rating: number): number => Math.round(rating) * 20;

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.substring(1);

export const getFormattedDate = (date: string, format: string): string => dayjs(date).format(format);

export const sortByDate = (a: CommentType, b: CommentType) => dayjs(b.date).diff(dayjs(a.date), 'ms');

export const sorting = (offers: OfferType[], sortType: string): OfferType[] => {
  switch (sortType) {
    case 'Price: low to high':
      return offers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return offers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
