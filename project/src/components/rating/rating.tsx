import {FormEvent, Fragment} from 'react';
import {nanoid} from 'nanoid';

const STARS_COUNT = 5;
const starsStatuses = new Map([
  [1, 'terribly'],
  [2, 'badly'],
  [3, 'not bad'],
  [4, 'good'],
  [5, 'perfect'],
]);

type RatingScreenProps = {
  rateChangeHandler: (evt: FormEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  rating: number | null;
}

function RatingScreen(props: RatingScreenProps): JSX.Element {
  const {isDisabled, rateChangeHandler, rating} = props;
  const stars = new Array(STARS_COUNT).fill('');

  return (
    <div className="reviews__rating-form form__rating">
      {stars.map((_star, index) => {
        const realIndex: number = STARS_COUNT - index;

        return(
          <Fragment key={nanoid(10)}>
            <input
              data-testid={`star-${index}`}
              className="form__rating-input visually-hidden"
              name="rating"
              value={realIndex}
              id={`${realIndex}-stars`}
              type="radio"
              onChange={rateChangeHandler}
              checked={rating === realIndex && true}
            />
            <label
              htmlFor={`${realIndex}-stars`}
              className="reviews__rating-label form__rating-label"
              title={`${starsStatuses.get(realIndex)}`}
              style={isDisabled ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}

export default RatingScreen;
