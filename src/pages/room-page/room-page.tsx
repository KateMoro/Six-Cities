import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCommentsAction,
  fetchRoomOfferAction,
  fetchNearbyPlacesAction
} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import Property from '../../components/property/property';

function RoomPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { roomOffer, roomNearbyOffers } = useAppSelector((state) => state.offers);
  const param = useParams();
  const id = Number(param.id);

  useEffect(() => {
    dispatch(fetchRoomOfferAction(id));
    dispatch(fetchCommentsAction(id));
    dispatch(fetchNearbyPlacesAction(id));
  }, [dispatch, id]);

  if (!roomOffer || id !== roomOffer.id) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <Property offer={roomOffer} nearbyOffers={roomNearbyOffers} />
      </main>
    </div>
  );
}

export default RoomPage;
