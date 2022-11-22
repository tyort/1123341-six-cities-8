import ReviewItemScreen from './ReviewsItem';

function ReviewsListScreen({ comments }) {
  console.log(comments);
  return (
    <ul className='reviews__list'>
      {comments.map((comment) => (
        <ReviewItemScreen key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default ReviewsListScreen;
