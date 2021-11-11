import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import withMap from './with-map';
import MainScreen from '../../components/main/main';
import {cities, makeFakeOffers} from '../../utils/mocks';

jest.mock('../../components/map/map', () => {
  const mockMap = () => <>This is mock Map</>;
  return {
    __esModule: true,
    default: mockMap,
  };
});

jest.mock('../../components/offer-card/offer-card', () => {
  const mockOfferCard = () => <>This is mock OfferCard</>;
  return {
    __esModule: true,
    default: mockOfferCard,
  };
});

describe('HOC: withMap', () => {
  it('base component should correct rendering when use with HOC', () => {
    // "() => <h1>withMap</h1>" - тип ComponentType<T> (функциональный компонент)
    const MainScreenWrapped = withMap(() => <h1>withMap</h1>);
    render(<MainScreenWrapped />);
    expect(screen.getByText(/withMap/i)).toBeInTheDocument();
  });

  it('base component should correct rendering Main with render-prop', () => {
    const mockOffers = makeFakeOffers();
    const history = createMemoryHistory();
    const MainScreenWrapped = withMap(MainScreen);

    render(
      <Router history={history}>
        <MainScreenWrapped
          city={cities[1]}
          isMainScreen
          onLogoutHandler={jest.fn()}
          offers={mockOffers}
        >
          <p>This is Sorting component</p>
          <p>This is City component</p>
        </MainScreenWrapped>
      </Router>,
    );

    expect(screen.getByText(/This is Sorting component/i)).toBeInTheDocument();
    expect(screen.getByText(/This is City component/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hamburg/i)).toBeInstanceOf(Array);
  });
});
