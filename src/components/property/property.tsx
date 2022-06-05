import { useAppDispatch } from '../../hooks';
import { OfferType } from '../../types/offer';
import { toggleFavoriteAction } from '../../store/api-actions';
import { capitalizeFirstLetter } from '../../utils';
import { toggleOfferFavorite } from '../../store/slices/roomSlice';
import Reviews from '../reviews/reviews';
import NearbyPlaces from '../nearby-places/nearby-places';

const IMAGE_MAX_COUNT = 6;

function Property(props: OfferType): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    description,
    host: {
      name,
      isPro,
      avatarUrl,
    },
  } = props;

  return (
    <>
    <section className="property">

      <div className="property__gallery-container container">
        <div className="property__gallery">
          {
            images.slice(0, IMAGE_MAX_COUNT).map((img) => (
              <div className="property__image-wrapper" key={img}>
                <img className="property__image" src={img} alt="" />
              </div>
            ))
          }
        </div>
      </div>

      <div className="property__container container">
        <div className="property__wrapper">
          {
            isPremium && <div className="property__mark"><span>Premium</span></div>
          }
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <button
              className={`
                  button
                  property__bookmark-button
                  ${isFavorite && 'property__bookmark-button--active'}
                `}
              type="button"
              onClick={() => {
                dispatch(toggleFavoriteAction({ id, isFavorite }));
                  dispatch(toggleOfferFavorite());
              }}
            >
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>

          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{ width: `${rating * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>

          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {capitalizeFirstLetter(type)}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>

          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>

          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {
                goods.map((good) => (
                  <li className="property__inside-item" key={good}>{good}</li>
                ))
              }
            </ul>
          </div>

          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img className="property__avatar user__avatar" src={`/${avatarUrl}`} width="74" height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="property__user-name">
                {name}
              </span>
              {
                isPro && <span className="property__user-status">Pro</span>
              }
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>

          <Reviews />
        </div>
      </div>

    </section>
      <div className="container">
        <NearbyPlaces />
      </div>
    </>
  );
}

export default Property;
