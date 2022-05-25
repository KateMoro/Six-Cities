import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchOfferRoomAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import Property from '../../components/property/property';

function RoomPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { offer } = useAppSelector((state) => state.room);
  const param = useParams();
  const id = Number(param.id);

  useEffect(() => {
    dispatch(fetchOfferRoomAction(id));
    dispatch(fetchCommentsAction(id));
  }, [dispatch, id]);

  if (!offer || id !== offer.id) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <Property {...offer} />
      </main>
    </div>
  );
}

export default RoomPage;
