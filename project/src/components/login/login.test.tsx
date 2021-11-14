import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getAllByText(/Sign in/i)).toBeInstanceOf(Array);
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keks');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
