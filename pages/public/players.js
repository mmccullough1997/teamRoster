/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPublicPlayers } from '../../api/playersData';
import PublicPlayerCard from '../../components/PublicPlayerCard';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllPlayers = () => {
    getPublicPlayers().then((thePlayers) => {
      setPlayers(thePlayers);
      setFilteredPlayers(thePlayers);
    });
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <>
      <div>
        <h1 className="homeHeader">Welcome, Coach {user.displayName}!</h1>
      </div>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} onUpdate={getAllPlayers} />
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PublicPlayerCard key={player.firebaseKey} playerObj={player} />
        ))}
      </div>
    </>
  );
}
