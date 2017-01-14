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

  removeResult(id) {
    const expandedCards = this.state.expandedCards;
    const cardIndex = expandedCards.indexOf(id);

    if (cardIndex != -1) {
      this.setState({expandedCards: expandedCards.delete(cardIndex)});
    }

    this.props.removeFromHistory(id);
  }

  render() {
    const {data} = this.props;

    const getPlayerIcon = (player) => {
      return player.get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball';
    }

    return (
      <View padder>
        {data.reverse().map((game, i) => {
          const score = game.get('score');
          const scoreHome = score.get('teams').get('home');
          const scoreGuest = score.get('teams').get('guest');
          const victoryTeam = scoreHome > scoreGuest ? 'home' : 'guest';
          const isExpanded = this.state.expandedCards.includes(game.get('id'));
          const homeTeam = game.get('teams').get('home');
          const guestTeam = game.get('teams').get('guest');

          return (<Card key={i}>
            <CardItem button header
              onPress={() => this.expandCard(game.get('id'))}>
              <Grid>
                <Row>
                  <Col>
                    <Text>
                      <Text style={victoryTeam == 'home' ? style.winner : null}>{homeTeam.get('name')}</Text> vs. <Text style={victoryTeam == 'guest' ? style.winner : null}>{guestTeam.get('name')}</Text>
                    </Text>
                    <Text style={style.date}>{dateFormat(game.get('startDate'))} - {dateFormat(game.get('endDate'), 'HH:MM:ss')}</Text>
                  </Col>
                  <Col style={style.score}>
                    <Text style={style.result}>
                      {scoreHome} - {scoreGuest}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
            {isExpanded && <CardItem style={style.playersInfo}>
              <Grid>
              {score.get('players').map((goals, i) => {
                const player = game.get('players').find(player => player.get('id') === i);
                return <Row key={i}>
                  <Col style={style.iconCol}>
                    <Text style={style.playerIconText}>
                      <Icon
                        name={getPlayerIcon(player)}
                        style={style.playerIcon}/>{/*Center icon hack*/' '}
                    </Text>
                  </Col>
                  <Col size={5}>
                    <Text style={style.playerName}>
                      {player.get('name')}
                    </Text>
                  </Col>
                  <Col size={5}>
                    <Text style={style.playerTeam}>
                      {game.get('teams').get(player.get('team')).get('name')}
                    </Text>
                  </Col>
                  <Col size={4}>
                    <Text style={style.playerScore}>{goals} goals</Text>
                  </Col>
                </Row>
              })}
              </Grid>
            </CardItem>}
            {isExpanded && <GameLog game={game}/>}
            {isExpanded && <CardItem button style={style.removeCard}>
              <Button block transparent onPress={() => this.removeResult(game.get('id'))}>
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
  playersInfo: {
    paddingTop: 0
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
