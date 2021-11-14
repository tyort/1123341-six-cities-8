import {useSelector, useDispatch} from 'react-redux';
import ReviewScreen from '../review/review';
import RatingScreen from '../rating/rating';
import {AuthorizationStatus} from '../../const';
import {useRef, FormEvent, useState, useEffect} from 'react';
import {Offer} from '../../types/offer';
import {setCommentAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {getOfferComments} from '../../store/single-offer-reducer/selectors';

type ReviewsScreenProps = {
  currentOffer: Offer;
}

function PlaceReviewsScreen(props: ReviewsScreenProps): JSX.Element {
  const {currentOffer} = props;
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const comments = useSelector(getOfferComments);

  useEffect(() => {
    setFormDisabled(false);
  }, [comments]);

  const dispatch = useDispatch();

  const commentTable = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const onSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (commentTable.current !== null && rating !== null) {
      setFormDisabled(true);
      dispatch(setCommentAction({
        offerId: currentOffer.id as number,
        comment: commentTable.current.value,
        rating,
      }));

      evt.currentTarget.reset();
      setBtnDisabled(true);
      setRating(null);
    }
  };

  const onRateChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setRating(Number(evt.currentTarget.value));

    if (document.querySelector('textarea')?.checkValidity() && document.querySelector('textarea')?.value !== '') {
      setBtnDisabled(false);
    }
  };

  const onTextareaChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.validity.valid && isBtnDisabled && rating !== null) {
      setBtnDisabled(false);
    } else if (!evt.currentTarget.validity.valid && !isBtnDisabled) {
      setBtnDisabled(true);
    }
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        <ReviewScreen
          comments={comments}
        />
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
          isDisabled={isFormDisabled}
        />
        <textarea
          maxLength={300}
          minLength={50}
          ref={commentTable}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={onTextareaChange}
          disabled={isFormDisabled}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          {isBtnDisabled
            ? <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
            : <button className="reviews__submit form__submit button" type="submit">Submit</button>}
        </div>
      </form>}
    </section>
  );
}

export default PlaceReviewsScreen;
