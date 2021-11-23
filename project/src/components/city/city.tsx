import {cities} from '../../const';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';

type CityScreenProps = {
  onCityChange: (cityTitle: string) => void;
  currentCity: City;
}

function CityScreen(props: CityScreenProps): JSX.Element {
  const {currentCity, onCityChange} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={nanoid(10)}
          className="locations__item"
          data-city={city}
          onClick={(evt) => {
            evt.preventDefault();
            onCityChange(evt.currentTarget.dataset.city as string);
          }}
        >
          <a
            className={`locations__item-link tabs__item ${currentCity.name === city && 'tabs__item--active'}`}
            href="/"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityScreen;
