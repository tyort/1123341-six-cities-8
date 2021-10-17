import {Review} from '../../types/offer';

type ReviewScreenProps = {
  review: Review;
}

function PlaceReviewsScreen(props: ReviewScreenProps): JSX.Element {
  const {review} = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`img/${review.avatar}`} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.setRating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.text}
        </p>
        <time className="reviews__time" dateTime={`${review.date}`}>{review.date}</time>
      </div>
    </li>
  );
}

export default PlaceReviewsScreen;
