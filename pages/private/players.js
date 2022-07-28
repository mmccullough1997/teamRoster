/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPrivatePlayers } from '../../api/playersData';
import PrivatePlayerCard from '../../components/PrivatePlayerCard';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllPlayers = () => {
    getPrivatePlayers(user.uid).then((thePlayers) => {
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
        <Link passHref href="/player/newPlayer">
          <Button>Add Player</Button>
        </Link>
      </div>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} onUpdate={getAllPlayers} />
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PrivatePlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </>
  );
}
