import { calculateStarsCount, getFormattedDate } from '../../utils';
import { CommentType } from '../../types/comment';

function ReviewItem(props: CommentType): JSX.Element {
  const {
    user: {
      name,
      avatarUrl,
    },
    rating,
    comment,
    date,
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${calculateStarsCount(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={getFormattedDate(date, 'YYYY-MM-DD')}>{getFormattedDate(date, 'MMMM YYYY')}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
