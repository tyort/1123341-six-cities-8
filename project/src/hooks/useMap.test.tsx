import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {renderHook} from '@testing-library/react-hooks';
import useMap from './useMap';
import {cities} from '../utils/mocks';
import {Map} from 'leaflet';

describe('Hook: useMap', () => {

  it('should return leaflet`s Map', () => {
    render(
      <BrowserRouter>
        <h1>My Map</h1>
        <section>This is for Map</section>
      </BrowserRouter>);

    const {result} = renderHook(() =>
      useMap(screen.getByText(/This is for Map/i), cities[0]),
    );

    expect(result.current).toBeInstanceOf(Map);
  });
});
