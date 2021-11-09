import {render} from '@testing-library/react';
import {Router as BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import useMap from './useMap';
import {cities} from '../utils/mocks';

const mockStore = configureMockStore();
describe('Hook: useMap', () => {

  it('should return leaflet`s Map', () => {
    const history = createMemoryHistory();
    history.push('/map');

    const {container} = render(
      <Provider store={mockStore({})}>
        <BrowserRouter history={history}>
          <h1>This is for Map</h1>
          <section>This is section</section>
        </BrowserRouter>
      </Provider>);

    expect(container.querySelector('h1')).toBeInTheDocument();

    const {result} = renderHook(() =>
      useMap(jest.fn(container.querySelector('h1')), cities[0]),
    );

    // eslint-disable-next-line no-console
    console.log(result.current);
  });
});
