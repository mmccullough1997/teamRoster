import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// YOU SHOULD NOT BE ABLE TO EDIT OR DELETE PUBLIC TEAM OR PLAYERS

const getPrivateTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getPublicTeams = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload) // patch with firebase id
        .then(() => {
          getPrivateTeams(teamObj.uid).then(resolve);
        });
    }).catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deletePrivateTeam = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getPrivateTeams(uid).then((teamsArray) => resolve(teamsArray));
    })
    .catch((error) => reject(error));
});

const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getPrivateTeams(teamObj.uid).then(resolve))
    .catch(reject);
});

// GET A SINGLE TEAM'S PLAYERS
const getSingleTeamsPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="team_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getTeamName = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((team) => {
    resolve(team.name);
  })
    .catch((error) => reject(error));
});

export {
  getPrivateTeams,
  getPublicTeams,
  createTeam,
  getSingleTeam,
  deletePrivateTeam,
  updateTeam,
  getSingleTeamsPlayers,
  getTeamName,
};
