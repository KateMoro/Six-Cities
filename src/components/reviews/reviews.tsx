import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { sortByDate } from '../../utils';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';

const COMMENTS_MAX_COUNT = 10;

function Reviews(): JSX.Element {
  const { comments } = useAppSelector((state) => state.comments);
  const { authorizationStatus } = useAppSelector((state) => state.user);

  const sortedComments = comments.slice().sort(sortByDate);

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
          sortedComments
            .slice(0, COMMENTS_MAX_COUNT)
            .map((comment) => <ReviewItem key={`${comment.id}-${comment.date}`} {...comment} />)
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />
      }
    </section>
  );
}

export default Reviews;
