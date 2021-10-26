import {nanoid} from 'nanoid';
import {sortName} from '../../const';
import {ChangeSortPayload} from '../../types/action';

type SortingProps = {
  currentSortName: ChangeSortPayload;
  onSortChoose: (sortName: ChangeSortPayload) => void;
};

function Sorting(props: SortingProps): JSX.Element {
  const {currentSortName, onSortChoose} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
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
      <ul className="places__options places__options--custom">
        {sortName.map((name) => (
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
              onSortChoose(evt.currentTarget.dataset.sortName as ChangeSortPayload);
            }}
          >{name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
