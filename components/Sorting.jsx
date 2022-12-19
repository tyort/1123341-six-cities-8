import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeSortName } from '../src/store/action';

const sortings = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

function Sorting() {
  const [isSortMenuShow, setSortMenuShow] = useState(false);
  const dispatch = useDispatch();
  const { sortName } = useSelector((state) => state);
  const getChangeSortName = (sortingName) => {
    dispatch(changeSortName({ sortName: sortingName }));
  };
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by </span>
      <span
        onClick={() => setSortMenuShow((prevState) => !prevState)}
        role='presentation'
        className='places__sorting-type'
        tabIndex='0'
      >
        {sortName}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortMenuShow ? 'places__options--opened' : ''
        }`}
      >
        {sortings.map((sortingName) => {
          const asddasd = 1;
          return (
            <li
              onClick={() => {
                getChangeSortName(sortingName);
                setSortMenuShow(false);
              }}
              role='presentation'
              key={sortingName}
              className={`places__option ${
                sortingName === sortName ? 'places__option--active' : ''
              }`}
              tabIndex='0'
            >
              {sortingName}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default Sorting;
