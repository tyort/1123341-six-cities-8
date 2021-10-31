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
  onRateChange: (evt: FormEvent<HTMLInputElement>) => void;
}

function RatingScreen(props: RatingScreenProps): JSX.Element {
  const {onRateChange} = props;
  const stars = new Array(STARS_COUNT).fill('');

  return (
    <div className="reviews__rating-form form__rating">
      {stars.map((_star, index) => {
        const realIndex: number = STARS_COUNT - index;

        return(
          <Fragment key={nanoid(10)}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={realIndex}
              id={`${realIndex}-stars`}
              type="radio"
              onChange={onRateChange}
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
  );
}

export default RatingScreen;
