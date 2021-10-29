import {connect, ConnectedProps} from 'react-redux';
import ReviewScreen from '../review/review';
import {Comment, NewComment} from '../../types/comment';
import {nanoid} from 'nanoid';
import {AuthorizationStatus} from '../../const';
import {Fragment, useState, useRef, FormEvent} from 'react';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {ThunkAppDispatch} from '../../types/action';
import {setCommentAction} from '../../store/api-actions';


const STARS_COUNT = 5;
const starsStatuses = new Map([
  [1, 'terribly'],
  [2, 'badly'],
  [3, 'not bad'],
  [4, 'good'],
  [5, 'perfect'],
]);

type ReviewsScreenProps = {
  comments: Comment[];
  currentOffer: Offer;
}

const mapStateToProps = (state: State) => ({
  nearbyOffers: state.nearbyOffers,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onFucjkas(newComment: NewComment) {
    dispatch(setCommentAction(newComment));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewsScreenProps;


function PlaceReviewsScreen(props: ConnectedComponentProps): JSX.Element {
  const {comments, authorizationStatus, currentOffer, onFucjkas} = props;
  const stars = new Array(STARS_COUNT).fill('');
  const [rating, setRating] = useState<number | null>(null);
  const commentTable = useRef<HTMLTextAreaElement | null>(null);

  const onSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (commentTable.current !== null && rating !== null) {
      onFucjkas({offerId: currentOffer.id as number, comment: commentTable.current.value, rating});
    }
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((review) => (
          <ReviewScreen
            key={nanoid(10)}
            review={review}
          />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth
      &&
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={onSubmitHandle}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {stars.map((_star, index) => {
            const realIndex = STARS_COUNT - index;
            return(
              <Fragment key={nanoid(10)}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={realIndex}
                  id={`${realIndex}-stars`}
                  type="radio"
                  onChange={(evt) => {
                    setRating(Number(evt.currentTarget.value));
                  }}
                />
                <label htmlFor={`${realIndex}-stars`} className="reviews__rating-label form__rating-label" title={`${starsStatuses.get(realIndex)}`}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })}
        </div>
        <textarea
          ref={commentTable}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          // onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          //   setUserComment(evt.target.value);
          // }}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit">Submit</button>
        </div>
      </form>}
    </section>
  );
}

export {PlaceReviewsScreen};
export default connector(PlaceReviewsScreen);
