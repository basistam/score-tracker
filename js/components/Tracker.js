import React from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  Text,
  View,
  Button,
  Icon
} from 'native-base';
import Theme from 'native-base/Components/Themes/light';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';
import TrackButton from './TrackButton';
import {createEvent} from '../utils//GameUtils';
import Event from '../constants/Event';

class Tracker extends React.Component {
  render() {
    const {
      homeTeam,
      guestTeam,
      guestDefensePlayer,
      guestOffensePlayer,
      homeDefensePlayer,
      homeOffensePlayer,
      score,
      undo,
      playerScores,
      swapPlayers,
      setScore,
      newGame,
      saveResult,
      game
    } = this.props;
    const homeTeamScore = score.getIn(['teams', 'home']);
    const guestTeamScore = score.getIn(['teams', 'guest']);
    const matchFinished = homeTeamScore == setScore || guestTeamScore == setScore;
    const victoryTeam = homeTeamScore == setScore ? homeTeam.get('name') : guestTeam.get('name');

    return (
      <Grid>
        {!matchFinished ? <Row>
          <Col>
            <TrackButton danger
              player={guestOffensePlayer}
              score={score.getIn(['players', guestOffensePlayer.get('id')])}
              onPress={() => playerScores(createEvent(guestTeam, guestOffensePlayer, Event.GOAL_GUEST))}
              onLongPress={() => playerScores(createEvent(guestTeam, guestOffensePlayer, Event.GOAL_HOME))} />
          </Col>
          <Col>
            <TrackButton success
              player={guestDefensePlayer}
              score={score.getIn(['players', guestDefensePlayer.get('id')])}
              onPress={() => playerScores(createEvent(guestTeam, guestDefensePlayer, Event.GOAL_GUEST))}
              onLongPress={() => playerScores(createEvent(guestTeam, guestDefensePlayer, Event.GOAL_HOME))} />
          </Col>
        </Row> : <Row>
          <View padder>
            <Text style={style.victoryTeam}>{victoryTeam} won!</Text>
          </View>
        </Row>}

        <Row>
          <View>
            <Text style={style.homeTeamName}>{guestTeam.get('name')}</Text>
          </View>
        </Row>

        <Row>
          <Col size={2}>
            <Text style={style.homeTeamScore}><Icon name="ios-arrow-down"/> {homeTeamScore}</Text>
          </Col>
          <Col size={1}><Text style={style.scoreDividerText}>vs</Text></Col>
          <Col size={2}>
            <Text style={style.guestTeamScore}>{guestTeamScore} <Icon name="ios-arrow-up"/></Text>
          </Col>
        </Row>

        <Row>
          <View>
            <Text style={style.guestTeamName}>{homeTeam.get('name')}</Text>
          </View>
        </Row>

        {!matchFinished ? <Row>
          <Col>
            <TrackButton success
              player={homeDefensePlayer}
              score={score.getIn(['players', homeDefensePlayer.get('id')])}
              onPress={() => playerScores(createEvent(homeTeam, homeDefensePlayer, Event.GOAL_HOME))}
              onLongPress={() => playerScores(createEvent(homeTeam, homeDefensePlayer, Event.GOAL_GUEST))} />
          </Col>
          <Col>
            <TrackButton danger
              player={homeOffensePlayer}
              score={score.getIn(['players', homeOffensePlayer.get('id')])}
              onPress={() => playerScores(createEvent(homeTeam, homeOffensePlayer, Event.GOAL_HOME))}
              onLongPress={() => playerScores(createEvent(homeTeam, homeOffensePlayer, Event.GOAL_GUEST))} />
          </Col>
        </Row> : <Row></Row>}

        <Row>
          <View padder></View>
        </Row>

        {!matchFinished ? <Row>
          <Col>
          <View padder>
            <Button block warning
              onPress={() => swapPlayers(homeOffensePlayer, homeDefensePlayer)} >
              <Icon name="ios-swap"/>Home
            </Button>
          </View>
          </Col>
          <Col>
          <View padder>
            <Button block warning
              onPress={() => swapPlayers(guestDefensePlayer, guestOffensePlayer)} >
              <Icon name="ios-swap"/>Guest
            </Button>
          </View>
          </Col>
        </Row> : <Row></Row>}

        <Row>
          <View padder>
            <Button block
              onPress={() => undo()}>
              <Icon name="ios-undo"/>Undo
            </Button>
          </View>
        </Row>

        {matchFinished ? <Row>
          <View padder>
            <Button block success onPress={() => saveResult()}><Icon name="ios-cloud-upload"/> Save result</Button>
          </View>
          <View  padder>
            <Button block danger onPress={() => newGame()}><Icon name="ios-refresh"/> New game</Button>
          </View>
        </Row> : <Row></Row>}
      </Grid>
    );
  }
}

Tracker.propTypes = {
  homeTeam: React.PropTypes.object.isRequired,
  guestTeam: React.PropTypes.object.isRequired,
  guestDefensePlayer: React.PropTypes.object.isRequired,
  guestOffensePlayer: React.PropTypes.object.isRequired,
  homeDefensePlayer: React.PropTypes.object.isRequired,
  homeOffensePlayer: React.PropTypes.object.isRequired,
  score: React.PropTypes.object.isRequired,
  undo: React.PropTypes.func.isRequired,
  playerScores: React.PropTypes.func.isRequired,
  swapPlayers: React.PropTypes.func.isRequired,
  setScore: React.PropTypes.number.isRequired,
  newGame: React.PropTypes.func.isRequired,
  saveResult: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired
};

Tracker.defaultProps = {};

const style = StyleSheet.create({
  victoryTeam: {
    fontSize: 30,
    lineHeight: 50,
    alignSelf: 'center',
    color: Theme.brandSuccess
  },
  guestTeamName: {
    alignSelf: 'center'
  },
  homeTeamName: {
    alignSelf: 'center'
  },
  scoreDividerText: {
    alignSelf: 'center',
    lineHeight: 80
  },
  homeTeamScore: {
    alignSelf: 'flex-end',
    fontSize: 80,
    lineHeight: 80
  },
  guestTeamScore: {
    alignSelf: 'flex-start',
    fontSize: 80,
    lineHeight: 80
  }
});

export default Tracker;
