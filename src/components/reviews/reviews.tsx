import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';


function Reviews(): JSX.Element {
  const { comments } = useAppSelector((state) => state.room);
  const { authorizationStatus } = useAppSelector((state) => state.user);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {
          comments.map((comment) => <ReviewItem key={`${comment.id}-${comment.date}`} {...comment} />)
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />
      }
    </section>
  );
}

export default Reviews;
