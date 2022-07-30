/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getPrivateTeams } from '../../api/teamData';
import Search from '../../components/Search';
import PrivateTeamCard from '../../components/PrivateTeamCard';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getPrivateTeams(user.uid).then((theTeams) => {
      setTeams(theTeams);
      setFilteredTeams(theTeams);
    });
  };

  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <div>
        <h1>My Teams</h1>
        <Link href="/team/new" passHref>
          <Button className="addTeamButton">Add Team</Button>
        </Link>
      </div>
      <Search players={teams} setFilteredPlayers={setFilteredTeams} onUpdate={getAllTheTeams} />
      <div className="d-flex flex-wrap">
        {filteredTeams.map((team) => (
          <PrivateTeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Teams;
