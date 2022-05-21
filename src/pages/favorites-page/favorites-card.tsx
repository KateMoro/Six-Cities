import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { OfferType } from '../../types/offer';
import { AppRoute } from '../../const';
import { calculateStarsCount, capitalizeFirstLetter } from '../../utils';
import { toggleFavoriteAction } from '../../store/api-actions';

function FavoritesCard(props: OfferType): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    title,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    type,
  } = props;

  return (
    <article className="favorites__card place-card">
      {
        isPremium && <div className="place-card__mark"><span>Premium</span></div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="
              button
              place-card__bookmark-button
              place-card__bookmark-button--active"
            type="button"
            onClick={() => {
              dispatch(toggleFavoriteAction({ id, isFavorite }));
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateStarsCount(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
