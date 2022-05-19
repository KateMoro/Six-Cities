type LocationType = {
  latitude: number,
  longitude: number,
  zoom: number
}

type CityType = {
  name: string,
  location: LocationType,
}

type HostType = {
  id: number,
  name: string,
  avatarUrl: string,
  isPro: boolean,
}

export type OfferType = {
  id: number,
  title: string,
  description: string,
  type: string,
  previewImage: string,
  images: Array<string>,
  goods: Array<string>,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  bedrooms: number,
  maxAdults: number,
  price: number,
  city: CityType,
  host: HostType,
  location: LocationType,
}
