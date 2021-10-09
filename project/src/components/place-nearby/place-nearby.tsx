import NextDoorScreen from '../next-door/next-door';

type Names = string[];

const placesNames: Names = [
  'Wood and stone place',
  'Canal View Prinsengracht',
  'Cozy apartment',
];

function PlaceNearbyScreen(): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {placesNames.map((name) => <NextDoorScreen key={name}/>)}
        </div>
      </section>
    </div>
  );
}

export default PlaceNearbyScreen;
