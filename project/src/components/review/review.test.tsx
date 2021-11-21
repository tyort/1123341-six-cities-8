import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ReviewScreen from './review';
import {makeFakeComments} from '../../utils/mocks';

const mockComments = makeFakeComments();
const VISUALILZED_COMMENTS_COUNT = 10;

describe('Component: ReviewScreen', () => {
  it('should render "ReviewScreen" when user navigate to specific offer url', () => {
    render(
      <BrowserRouter>
        <ReviewScreen
          comments={mockComments.slice(0, VISUALILZED_COMMENTS_COUNT)}
        />
      </BrowserRouter>,
    );

    mockComments.forEach((comment) => {
      expect(screen.getByText(new RegExp(`${comment.user.name}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${comment.comment}`, 'i'))).toBeInTheDocument();
    });
  });
});
