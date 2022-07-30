/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { viewTeamDetails } from '../../../api/mergedData';
import { getSingleTeamsPlayers } from '../../../api/teamData';
import PublicPlayerCard from '../../../components/PublicPlayerCard';

export default function ViewTeam() {
  const { user } = useAuth();
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  // const getAllTheSingleTeamsPlayers = () => {
  //   console.warn('Do something?');
  // };

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getSingleTeamsPlayers(firebaseKey).then((setPlayers));
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="ms-5 details">
        <h5>Team Name: {teamDetails.name}</h5>
        <h4>Coach: {teamDetails.coach}</h4>
        <h4>Coach Email: {user.email}</h4>
        <h4>Coach Last Login: {user.metadata.lastSignInTime}</h4>
        <h4 className="card-text bold"><b># Players:</b> {players.length}</h4>
        <h3># Wins: {teamDetails.wins}</h3>
        <h3># Losses: {teamDetails.losses}</h3>
      </div>
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PublicPlayerCard key={player.firebaseKey} playerObj={player} />
        ))}
      </div>
    </div>
  );
}
