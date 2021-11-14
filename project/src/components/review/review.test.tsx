import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ReviewScreen from './review';
import {makeFakeComment} from '../../utils/mocks';

const mockComment = makeFakeComment();

describe('Component: ReviewScreen', () => {
  it('should render "ReviewScreen" when user navigate to specific offer url', () => {
    render(
      <BrowserRouter>
        <ReviewScreen
          review={mockComment}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(new RegExp(`${mockComment.user.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockComment.comment}`, 'i'))).toBeInTheDocument();
  });
});
