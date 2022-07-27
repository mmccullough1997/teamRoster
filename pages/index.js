/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import Search from '../components/Search';
import TeamCard from '../components/TeamCard';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then((theTeams) => {
      setTeams(theTeams);
      setFilteredTeams(theTeams);
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
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Teams;
