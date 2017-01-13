const PREFIX = 'TEAMS.';

export const SET_NAME = PREFIX + 'SET_NAME';

export const setTeamName = (id, name) => ({
  type: SET_NAME,
  homeTeamName: name,
  id: id
});
