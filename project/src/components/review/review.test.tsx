import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ReviewScreen from './review';
import {makeFakeComments} from '../../utils/mocks';

const mockComments = makeFakeComments();

describe('Component: ReviewScreen', () => {
  it('should render "ReviewScreen" when user navigate to specific offer url', () => {
    render(
      <BrowserRouter>
        <ReviewScreen
          comments={mockComments}
        />
      </BrowserRouter>,
    );

    mockComments.forEach((comment) => {
      expect(screen.getByText(new RegExp(`${comment.user.name}`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${comment.comment}`, 'i'))).toBeInTheDocument();
    });
  });
});
