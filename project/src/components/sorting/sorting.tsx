import {nanoid} from 'nanoid';
import {sortName} from '../../const';

type SortingProps = {
  currentSortName: string;
};

function Sorting(props: SortingProps): JSX.Element {
  const {currentSortName} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
      Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortName.map((name) => (
          <li
            key={nanoid(10)}
            className={`places__option ${name === currentSortName
              ? 'places__option--active'
              : ''
            }`}
            tabIndex={0}
          >{name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
