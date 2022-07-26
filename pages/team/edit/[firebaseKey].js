import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamData';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (
    <TeamForm obj={editItem} />
  );
}
