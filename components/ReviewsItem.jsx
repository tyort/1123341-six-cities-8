import Image from 'next/image';
import { format } from 'date-fns';

function ReviewsItemScreen({ comment }) {
  const { comment: text, user, rating, date } = comment;
  const { avatar_url, name } = user;
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <Image
            className='reviews__avatar user__avatar'
            src={`/${avatar_url}`}
            width='54'
            height='54'
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: `${(Number(rating) * 100) / 5}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{text}</p>
        <time
          className='reviews__time'
          dateTime={format(new Date(date), 'yyyy-MM-dd')}
        >
          {format(new Date(date), 'PPP')}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItemScreen;
