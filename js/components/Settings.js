import React from 'react';
import {
  Text,
  List,
  ListItem
} from 'native-base';
import DebouncedInput from './DebouncedInput';

class Settings extends React.Component {
  render() {
    const {team1, team2, onChangeTeamName, onChangePlayerName, onChangeSetScore, setScore} = this.props;
    return (
      <List>
        <ListItem itemDivider>
          <Text>Set score</Text>
        </ListItem>

        <DebouncedInput placeholder="Set score" value={setScore} maxLength={12} onChangeText={(value) => onChangeSetScore(value)}/>

        <ListItem itemDivider>
          <Text>Team 1</Text>
        </ListItem>

        <DebouncedInput placeholder="Team 1 name" value={team1.get('name')} maxLength={12} onChangeText={(value) => onChangeTeamName('team1', value)}/>

        <ListItem itemDivider>
          <Text>Team 1 Player 1</Text>
        </ListItem>

        <DebouncedInput placeholder="Player 1 name" value={team1.get('player1').get('name')} onChangeText={(value) => onChangePlayerName('team1', 'player1', value)}/>

        <ListItem itemDivider>
          <Text>Team 1 Player 2</Text>
        </ListItem>

        <DebouncedInput placeholder="Player 2 name" value={team1.get('player2').get('name')} onChangeText={(value) => onChangePlayerName('team1', 'player2', value)}/>

        <ListItem itemDivider>
          <Text>Team 2</Text>
        </ListItem>

        <DebouncedInput placeholder="Team 2 name" value={team2.get('name')} maxLength={12} onChangeText={(value) => onChangeTeamName('team2', value)}/>

        <ListItem itemDivider>
          <Text>Team 2 Player 1</Text>
        </ListItem>

        <DebouncedInput placeholder="Player 1 name" value={team2.get('player1').get('name')} onChangeText={(value) => onChangePlayerName('team2', 'player1', value)}/>

        <ListItem itemDivider>
          <Text>Team 2 Player 2</Text>
        </ListItem>

        <DebouncedInput placeholder="Player 2 name" value={team2.get('player2').get('name')} onChangeText={(value) => onChangePlayerName('team2', 'player2', value)}/>
      </List>
    );
  }
}

Settings.propTypes = {
  team1: React.PropTypes.object,
  team2: React.PropTypes.object,
  onChangeTeamName: React.PropTypes.func,
  onChangeSetScore: React.PropTypes.func,
  onChangePlayerName: React.PropTypes.func,
  setScore: React.PropTypes.number
};
Settings.defaultProps = {};

export default Settings;
