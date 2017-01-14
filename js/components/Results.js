import React from 'react';
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
import GameLog from './GameLog';
import Immutable from 'immutable';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedCards: new Immutable.List()
    }
  }

  expandCard(index) {
    const expandedCards = this.state.expandedCards;
    const cardIndex = expandedCards.indexOf(index);

    if (cardIndex == -1) {
      this.setState({expandedCards: expandedCards.push(index)});
    } else {
      this.setState({expandedCards: expandedCards.delete(cardIndex)});
    }
  }

  render() {
    const {data, removeFromHistory} = this.props;

    const getPlayerIcon = (player) => {
      return player.get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball';
    }

    return (
      <View padder>
        {data.reverse().map((game, i) => {
          const score = GameUtils.getScore(game);
          const victoryTeam = score.get('teams').get('home') > score.get('teams').get('guest') ? 'home' : 'guest';
          const isExpanded = this.state.expandedCards.includes(i);

          return (<Card key={i}>
            <CardItem button header
              style={style.header}
              onPress={() => this.expandCard(i)}>
              <Grid>
                <Row>
                  <Col>
                    <Text>
                      <Text style={victoryTeam == 'home' ? style.winner : null}>{game.get('home').get('name')}</Text> vs. <Text style={victoryTeam == 'guest' ? style.winner : null}>{game.get('guest').get('name')}</Text>
                    </Text>
                    <Text style={style.date}>{dateFormat(game.get('startDate'))} - {dateFormat(game.get('endDate'), 'HH:MM:ss')}</Text>
                  </Col>
                  <Col style={style.score}>
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
                <Col style={style.iconCol}>
                  <Text style={style.playerIconText}>
                    <Icon
                      name={getPlayerIcon(game.get('players').find(player => player.get('id') === i))}
                      style={style.playerIcon}/>{/*Center icon hack*/' '}
                  </Text>
                </Col>
                <Col size={5}>
                  <Text style={style.playerName}>
                    {game.get('players').find(player => player.get('id') === i).get('name')}
                  </Text>
                </Col>
                <Col size={5}>
                  <Text style={style.playerTeam}>
                    {game.get(game.get('players').find(player => player.get('id') === i).get('team')).get('name')}
                  </Text>
                </Col>
                <Col size={4}>
                  <Text style={style.playerScore}>{player} goals</Text>
                </Col>
              </Row>)}
              </Grid>
            </CardItem>
            {isExpanded && <GameLog game={game}/>}
            {isExpanded && <CardItem button style={style.removeCard}>
              <Button block transparent onPress={() => removeFromHistory(game.get('id'))}>
                <Text style={style.remove}>Remove this record</Text>
              </Button>
            </CardItem>}
          </Card>);
        })}
      </View>
    );
  }
}

const greyColor = '#b5b5b5';

const style = {
  score: {
    width: 80
  },
  removeCard: {
    paddingTop: 0,
    paddingBottom: 3
  },
  // Header
  header: {
    paddingBottom: 0
  },
  playerIcon: {
    fontSize: 15
  },
  winner: {
    fontWeight: 'bold',
    color: Theme.brandSuccess
  },
  date: {
    color: greyColor,
    fontSize: 10,
    lineHeight: 18,
    alignSelf: 'flex-start'
  },
  result: {
    alignSelf: 'flex-end',
    fontSize: 27,
    lineHeight: 40
  },
  playerTeam: {
    color: greyColor
  },

  // Columns
  iconCol: {
    width: 18
  },

  // Player score
  playerScore: {
    alignSelf: 'flex-end',
  },

  remove: {
    color: Theme.brandDanger
  }
};

Results.propTypes = {
  data: React.PropTypes.object,
  removeFromHistory: React.PropTypes.func.isRequired
};
Results.defaultProps = {};

export default Results;
