type CityScreenProps = {
  city: string;
}

function Main(props: CityScreenProps): JSX.Element {
  const {city} = props;

  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="/">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default Main;
