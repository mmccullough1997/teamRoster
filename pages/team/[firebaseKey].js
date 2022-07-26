/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { viewTeamDetails } from '../../api/mergedData';
import { getSingleTeamsPlayers } from '../../api/teamData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const { user } = useAuth();
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getSingleTeamsPlayers(firebaseKey).then((setPlayers));
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>Team Name: {teamDetails.name}</h5>
        <h4>Coach: {user.displayName}</h4>
        <h3># Players: </h3>
        <h3># Wins: {teamDetails.wins}</h3>
        <h3># Losses: {teamDetails.losses}</h3>
      </div>
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} />
        ))}
      </div>
    </div>
  );
}
