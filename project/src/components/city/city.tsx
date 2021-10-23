import {ChangeCityPayload} from '../../types/action';

type CityScreenProps = {
  cityTitle: ChangeCityPayload;
  onCityChoose: (cityTitle: ChangeCityPayload) => void
}

function CityScreen(props: CityScreenProps): JSX.Element {
  const {cityTitle, onCityChoose} = props;

  return (
    <li
      className="locations__item"
      data-city={cityTitle}
      onClick={(evt) => {
        evt.preventDefault();
        onCityChoose(evt.currentTarget.dataset.city as ChangeCityPayload);
      }}
    >
      <a className="locations__item-link tabs__item" href="/">
        <span>{cityTitle}</span>
      </a>
    </li>
  );
}

export default CityScreen;
