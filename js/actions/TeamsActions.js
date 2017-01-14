const PREFIX = 'TEAMS.';

export const SET_TEAM_NAME = PREFIX + 'SET_TEAM_NAME';

export const setTeamName = (id, name) => ({
  type: SET_TEAM_NAME,
  homeTeamName: name,
  id: id
});
