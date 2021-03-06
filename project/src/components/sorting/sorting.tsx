import {nanoid} from 'nanoid';
import {SortName} from '../../const';

type SortingScreenProps = {
  currentSortName: SortName;
  onSortChange: (sortName: SortName) => void;
};

function SortingScreen(props: SortingScreenProps): JSX.Element {
  const {currentSortName, onSortChange} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        data-testid="option-open"
        className="places__sorting-type"
        tabIndex={0}
        onClick={(evt) => {
          evt.preventDefault();
          const list = (evt.currentTarget.parentElement as HTMLElement).querySelector('.places__options');
          (list as HTMLElement).classList.toggle('places__options--opened');
        }}
      >
        {currentSortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul data-testid="sort-list" className="places__options places__options--custom">
        {Object.values(SortName).map((name) => (
          <li
            key={nanoid(10)}
            data-sort-name={name}
            className={`places__option ${name === currentSortName
              ? 'places__option--active'
              : ''
            }`}
            tabIndex={0}
            onClick={(evt) => {
              evt.preventDefault();
              onSortChange(evt.currentTarget.dataset.sortName as SortName);
              (evt.currentTarget.parentElement as HTMLElement).classList.toggle('places__options--opened', false);
            }}
          >{name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingScreen;
