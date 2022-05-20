import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/slices/offersSlice';
import { cities } from '../../const';

function Locations(): JSX.Element {
  const currentCity = useAppSelector((state) => state.offers.city);
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  href={city}
                  className={`
                    locations__item-link
                    tabs__item
                    ${city === currentCity && 'tabs__item--active'}
                  `}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(changeCity(city));
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default Locations;
