import {Link} from 'react-router-dom';

function NotPlacesScreen(): JSX.Element {
  return (
    <section className="not-found__screen">
      <h1>No places to stay available</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}

export default NotPlacesScreen;
