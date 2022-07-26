/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playersData';
import PlayerCard from '../components/PlayerCard';
import { useAuth } from '../utils/context/authContext';
import Search from '../components/Search';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllPlayers = () => {
    getPlayers(user.uid).then((thePlayers) => {
      setPlayers(thePlayers);
      setFilteredPlayers(thePlayers);
    });
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <>
      <h1 className="homeHeader">Welcome, Coach {user.displayName}!</h1>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} />
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </>
  );
}
