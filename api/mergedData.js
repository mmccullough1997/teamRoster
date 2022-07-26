import { deletePlayer } from './playersData';
import { deleteTeam, getSingleTeam, getSingleTeamsPlayers } from './teamData';

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getSingleTeamsPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

const deleteTeamsPlayers = (teamId) => new Promise((resolve, reject) => {
  getSingleTeamsPlayers(teamId).then((playersArray) => {
    console.warn(playersArray, 'Team Players');
    const deletePlayerPromises = playersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewTeamDetails, deleteTeamsPlayers };
