import React from 'react';
import dateFormat from 'dateformat';
import {
  Row,
  CardItem,
  Icon,
  Col,
  Grid,
  Text
} from 'native-base';

class GameLog extends React.Component {
  render() {
    const {game} = this.props;

    let homeScore = 0;
    let guestScore = 0;

    const getPlayerIcon = (player) => {
      return player.get('position') === 'defense' ? 'ios-hand' : 'ios-tennisball';
    }

    return (
      <CardItem>
        <Grid>
          {game.get('events').map((event, i) => {
            if (event.get('type').get('team') === 'home') {
              homeScore++;
            } else {
              guestScore++;
            }
            return <Row key={i}>
              <Col style={style.dateCol}>
                <Text style={style.dateColText}>{dateFormat(event.get('eventDate'), 'HH:MM:ss')}</Text>
              </Col>
              <Col style={style.iconCol}>
                <Text style={style.logItem}>
                  <Icon
                    name={getPlayerIcon(event.get('player'))}
                    style={style.playerIcon}/>{' '}
                </Text>
              </Col>
              <Col size={4}>
                <Text style={style.logItem}>
                  <Text style={style.logItemBold}>
                    {event.getIn(['player', 'name'])}
                  </Text> goal to <Text style={style.logItemBold}>
                    {game.get(event.get('type').get('team')).get('name')}
                  </Text>
                </Text>
              </Col>
              <Col style={style.scoreCol}>
                <Text style={style.logItemScore}>{homeScore} - {guestScore}</Text>
              </Col>
            </Row>
          }).reverse()}
        </Grid>
      </CardItem>
    );
  }
}


const greyColor = '#b5b5b5';
const logFontSize = 12;

const style = {
    // Game log
    dateColText: {
      fontSize: logFontSize,
      color: greyColor
    },
    logItem: {
      fontSize: logFontSize
    },
    logItemBold: {
      fontSize: logFontSize,
      fontWeight: 'bold'
    },
    logItemScore: {
      fontSize: logFontSize,
      alignSelf: 'center'
    },

    iconCol: {
      width: 18
    },

    playerIcon: {
      fontSize: 15
    },



    // Columns
    dateCol: {
      width: 55
    },
    scoreCol: {
      width: 40
    },
}

GameLog.propTypes = {
  game: React.PropTypes.object.isRequired
};
GameLog.defaultProps = {};

export default GameLog;
