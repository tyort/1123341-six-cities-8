import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import CityScreen from './city';
import {cities} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: CityScreen', () => {
  const onCityChange = jest.fn();

  it('should render "CityScreen" when user navigate to "/main" url', () => {
    render(
      <BrowserRouter>
        <CityScreen
          currentCity={cities[2]}
          onCityChange={onCityChange}
          cities={cities}
        />
      </BrowserRouter>,
    );

    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toHaveLength(6);
    screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i)
      .forEach((city) => userEvent.click(city));
    expect(onCityChange).toBeCalledTimes(6);
  });
});
