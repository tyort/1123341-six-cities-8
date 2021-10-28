import {ChangeCityPayload} from '../../types/action';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';

type CityScreenProps = {
  cities: City[];
  onCityChoose: (cityTitle: ChangeCityPayload) => void;
  currentCity: City;
}

function CityScreen(props: CityScreenProps): JSX.Element {
  const {cities, currentCity, onCityChoose} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={nanoid(10)}
          className="locations__item"
          data-city={city.name}
          onClick={(evt) => {
            evt.preventDefault();
            onCityChoose(evt.currentTarget.dataset.city as ChangeCityPayload);
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
