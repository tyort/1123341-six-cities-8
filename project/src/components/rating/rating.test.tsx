import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RatingScreen from './rating';
describe('Component: RatingScreen', () => {
  it('should render "RatingScreen" when user navigate to specific offer url', () => {
    const onRateChange = jest.fn();
    render(
      <BrowserRouter>
        <RatingScreen
          onRateChange={onRateChange}
        />
      </BrowserRouter>,
    );

    userEvent.click(screen.getByTestId(/star-1/i));
    expect(onRateChange).toBeCalled();
  });
});
