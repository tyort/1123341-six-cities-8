import { Fragment, memo } from 'react';
import { months } from '../../const';
import {Comment} from '../../types/comment';

type ReviewScreenProps = {
  comments: Comment[];
}

function ReviewScreen(props: ReviewScreenProps): JSX.Element {
  const {comments} = props;

  const getVisualizedDate = (commentDate: string) => {
    const date = new Date(commentDate);
    const monthName = months.get(date.getMonth());
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  };

  return (
    <Fragment>
      {comments
        .slice(0, 10)
        .map((review) => {
          const percentRating = review.rating * 20;

          return (
            <li key={review.id} className="reviews__item">
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
                <time className="reviews__time" dateTime={`${review.date}`}>{getVisualizedDate(review.date)}</time>
              </div>
            </li>
          );
        })}
    </Fragment>
  );
}

export default memo(ReviewScreen, (prevProps, nextProps) =>
  prevProps.comments === nextProps.comments,
);
