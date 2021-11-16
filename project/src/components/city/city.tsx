import {CityName} from '../../const';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';

type CityScreenProps = {
  cities: City[];
  cityChangeHandler: (cityTitle: CityName) => void;
  currentCity: City;
}

function CityScreen(props: CityScreenProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('CityScreen');
  const {cities, currentCity, cityChangeHandler} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={nanoid(10)}
          className="locations__item"
          data-city={city.name}
          onClick={(evt) => {
            evt.preventDefault();
            cityChangeHandler(evt.currentTarget.dataset.city as CityName);
          }}
        >
          <a
            className={`locations__item-link tabs__item ${currentCity.name === city.name && 'tabs__item--active'}`}
            href="/"
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityScreen;
