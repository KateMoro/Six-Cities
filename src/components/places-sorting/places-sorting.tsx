import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/slices/offersSlice';
import { places } from '../../const';

function PlacesSorting(): JSX.Element {
  const { sortType } = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const handleSortTypeClick = () => {
    const optionsList = document.querySelector('.places__options');
    if (optionsList) {
      optionsList.classList.toggle('places__options--opened');
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortTypeClick}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom">
        {
          places.map((place) => (
            <li
              className={`
                places__option
                ${place === sortType ? 'places__option--active' : ''}
              `}
              key={place}
              tabIndex={0}
              onClick={() => dispatch(changeSortType(place))}
            >
              {place}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;
