const DEFAULT_CITY_NAME = 'Paris';
type CityScreenProps = {
  cityTitle: string;
  onCityChoose: (cityTitle: string) => void
}

function CityScreen(props: CityScreenProps): JSX.Element {
  const {cityTitle, onCityChoose} = props;

  return (
    <li
      className="locations__item"
      data-city={cityTitle}
      onClick={(evt) => {
        evt.preventDefault();
        onCityChoose(evt.currentTarget.dataset.city || DEFAULT_CITY_NAME);
      }}
    >
      <a className="locations__item-link tabs__item" href="/">
        <span>{cityTitle}</span>
      </a>
    </li>
  );
}

export default CityScreen;
