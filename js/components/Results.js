import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Card,
  CardItem,
  Text,
  Grid,
  Col,
  Row,
  Icon,
  Button
} from 'native-base';
import * as GameUtils from '../utils/GameUtils';
import dateFormat from 'dateformat';
import Theme from 'native-base/Components/Themes/light';

class Results extends React.Component {
  render() {
    const {data, removeFromHistory} = this.props;

    return (
      <View padder>
        {data.reverse().map((game, i) => {
          const score = GameUtils.getScore(game);
          const victoryTeam = score.get('teams').get('home') > score.get('teams').get('guest') ? 'home' : 'guest';
          let homeScore = 0;
          let guestScore = 0;

          return (<Card key={i}>
            <CardItem header>
              <Grid>
                <Row>
                  <Col size={3}>
                    <Text>
                      <Text style={victoryTeam == 'home' ? style.winner : null}>{game.get('home').get('name')}</Text> vs. <Text style={victoryTeam == 'guest' ? style.winner : null}>{game.get('guest').get('name')}</Text>
                    </Text>
                    <Text style={style.date}>{dateFormat(game.get('startDate'))} - {dateFormat(game.get('endDate'), 'HH:MM:ss')}</Text>
                  </Col>
                  <Col size={1}>
                    <Text style={style.result}>
                      {score.get('teams').get('home')} - {score.get('teams').get('guest')}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
            <CardItem>
              <Grid>
              {score.get('players').map((player, i) => <Row key={i}>
                <Col size={4}>
                  <Text>
                    <View style={style.iconView}>
                    <Icon name={game.get('players').find(player => player.get('id') === i).get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball'} style={style.playerIcon}/></View> {game.get('players').find(player => player.get('id') === i).get('name')}
                  </Text>
                </Col>
                <Col size={1}>
                  <Text style={style.score}>{player} goals</Text>
                </Col>
              </Row>)}
              </Grid>
            </CardItem>
            <CardItem>
              <Grid>
                {game.get('events').map((event, i) => {
                  if (event.get('type').get('team') === 'home') {
                    homeScore++;
                  } else {
                    guestScore++;
                  }
                  return <Row key={i}>
                    <Col size={1}><Text style={style.date}>{dateFormat(event.get('eventDate'), 'HH:MM:ss')}</Text></Col>
                    <Col size={4}>
                      <Text style={style.log}>
                        <Text style={style.player}>
                          <View style={style.iconView}><Icon name={event.get('player').get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball'} style={style.playerIcon}/></View> {event.get('player').get('name')}
                        </Text> goal to <Text style={style.goals}>
                          {game.get(event.get('type').get('team')).get('name')}
                        </Text>
                      </Text>
                    </Col>
                    <Col size={1}><Text style={style.score}>{homeScore} - {guestScore}</Text></Col>
                  </Row>
                }).reverse()}
              </Grid>
            </CardItem>
            <CardItem button>
              <Button block transparent onPress={() => removeFromHistory(game.get('id'))}>
                <Text style={style.remove}>Remove this record</Text>
              </Button>
            </CardItem>
          </Card>);
        })}
      </View>
    );
  }
}

const greyColor = '#b5b5b5';

const style = StyleSheet.create({
  log: {
    fontSize: 12
  },
  remove: {
    color: Theme.brandDanger
  },
  goals: {
    fontWeight: 'bold',
    fontSize: 12
  },
  iconView: {
    width: 15,
    height: 15
  },
  player: {
    fontWeight: 'bold',
    fontSize: 12
  },
  playerIcon: {
    fontSize: 15
  },
  score: {
    alignSelf: 'flex-end'
  },
  winner: {
    fontWeight: 'bold',
  },
  date: {
    color: greyColor,
    fontSize: 12
  },
  result: {
    alignSelf: 'flex-end',
    fontSize: 30,
    lineHeight: 40
  }
})

Results.propTypes = {
  data: React.PropTypes.object,
  removeFromHistory: React.PropTypes.func.isRequired
};
Results.defaultProps = {};

export default Results;
