import {connect, ConnectedProps} from 'react-redux';
import ReviewScreen from '../review/review';
import RatingScreen from '../rating/rating';
import {NewComment} from '../../types/comment';
import {nanoid} from 'nanoid';
import {AuthorizationStatus} from '../../const';
import {useRef, FormEvent, useState} from 'react';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {ThunkAppDispatch} from '../../types/action';
import {setCommentAction} from '../../store/api-actions';


type ReviewsScreenProps = {
  currentOffer: Offer;
}

const mapStateToProps = ({OFFER, USER}: State) => ({
  nearbyOffers: OFFER.nearbyOffers,
  authorizationStatus: USER.authorizationStatus,
  comments: OFFER.comments,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSetComment(newComment: NewComment) {
    dispatch(setCommentAction(newComment));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewsScreenProps;


function PlaceReviewsScreen(props: ConnectedComponentProps): JSX.Element {
  const {comments, authorizationStatus, currentOffer, onSetComment} = props;
  const commentTable = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState<number | null>(null);


  const onSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (commentTable.current !== null && rating !== null) {
      onSetComment({offerId: currentOffer.id as number, comment: commentTable.current.value, rating});
    }
  };

  const onRateChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setRating(Number(evt.currentTarget.value));
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
        <RatingScreen
          onRateChange={onRateChange}
        />
        <textarea
          ref={commentTable}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
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
