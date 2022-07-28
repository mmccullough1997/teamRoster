/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';
import { getPublicTeams } from '../api/teamData';
import Search from '../components/Search';
import PublicTeamCard from '../components/PublicTeamCard';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  // const { user } = useAuth();

  const getAllTheTeams = () => {
    getPublicTeams().then((theTeams) => {
      const publicTeams = theTeams.filter((team) => team.public === true);
      setTeams(publicTeams);
      setFilteredTeams(publicTeams);
    });
  };

  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add Team</Button>
      </Link>
      <Search players={teams} setFilteredPlayers={setFilteredTeams} onUpdate={getAllTheTeams} />
      <div className="d-flex flex-wrap">
        {filteredTeams.map((team) => (
          <PublicTeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Teams;
