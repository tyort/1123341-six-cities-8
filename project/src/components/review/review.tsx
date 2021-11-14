import { months } from '../../const';
import {Comment} from '../../types/comment';

type ReviewScreenProps = {
  review: Comment;
}

function PlaceReviewsScreen(props: ReviewScreenProps): JSX.Element {
  const {review} = props;
  const percentRating = review.rating * 20;

  const visualDate = (commentDate: string) => {
    const date = new Date(commentDate);
    const monthName = months.get(date.getMonth());
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`${review.user.avatar_url}`} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${percentRating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={`${review.date}`}>{visualDate(review.date)}</time>
      </div>
    </li>
  );
}

export default PlaceReviewsScreen;
