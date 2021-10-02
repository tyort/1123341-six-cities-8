import MainScreen from '../main/main';

type AppScreenProps = {
  places: string[];
}


function App(props: AppScreenProps): JSX.Element {
  const {places} = props;

  return (
    <MainScreen places={places} />
  );
}

export default App;
