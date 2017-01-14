import React from 'react';
import {
  Text,
  List,
  ListItem
} from 'native-base';
import DebouncedInput from './DebouncedInput';

class Settings extends React.Component {
  getTeamSettings() {
    const {players, setPlayerName, teams, setTeamName} = this.props;
    const rows = [];

    console.log(setTeamName);

    teams.forEach((team) => {
      rows.push(
        <ListItem itemDivider key={team.get('id') + 'divider'}>
          <Text>{team.get('title')} settings</Text>
        </ListItem>
      );

      rows.push(
        <DebouncedInput
          key={team.get('id') + 'name'}
          label={team.get('title')}
          value={team.get('name')}
          onChangeText={(value) => setTeamName(team.get('id'), value)} />
      );

      players.filter((player) => player.get('team') === team.get('id')).forEach((player) => {
        rows.push(
          <DebouncedInput
            key={team.get('id') + 'player' + player.get('id')}
            label="Player name"
            value={player.get('name')}
            onChangeText={(value) => setPlayerName(player.get('id'), value)} />
        );
      });
    });

    return rows;
  }

  render() {
    const {setSetScore, setScore} = this.props;
    return (
      <List>
        <ListItem itemDivider>
          <Text>Set score</Text>
        </ListItem>

        <DebouncedInput keyboardType="numeric" label="Set score" value={String(setScore)} maxLength={12} onChangeText={(value) => setSetScore(Math.floor(value))}/>

        {this.getTeamSettings()}
      </List>
    );
  }
}

Settings.propTypes = {
  setScore: React.PropTypes.number.isRequired,
  setSetScore: React.PropTypes.func.isRequired,
  players: React.PropTypes.object.isRequired,
  teams: React.PropTypes.object.isRequired,
  setTeamName: React.PropTypes.func.isRequired,
  setPlayerName: React.PropTypes.func.isRequired
};
Settings.defaultProps = {};

export default Settings;
