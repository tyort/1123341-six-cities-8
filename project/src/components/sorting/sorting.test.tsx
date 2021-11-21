import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SortingScreen from './sorting';
import {SortName} from '../../const';
describe('Component: SortingScreen', () => {
  it('should render "SortingScreen" when user navigate to "/main" url', () => {
    const onSortChange = jest.fn();
    render(
      <BrowserRouter>
        <SortingScreen
          currentSortName={SortName.PriceAscending}
          onSortChange={onSortChange}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Price: low to high/i)).toBeInstanceOf(Array);
    expect(screen.getAllByText(/Price: low to high/i)).toHaveLength(2);

    userEvent.click(screen.getByText(/Popular/i));
    expect(onSortChange).toBeCalled();

    userEvent.click(screen.getByTestId(/option-open/i));
    expect(screen.getByTestId(/sort-list/i)).toHaveClass('places__options--opened');
  });
});
