import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';
import Results from './Results';
import Settings from './Settings';
import Tracker from './Tracker';
import Immutable from 'immutable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 'tracker',
      data: defaultState
    };
  }

  componentWillMount() {
    this.loadState();
  }

  async loadState() {
    try {
      const data = await AsyncStorage.getItem('data');
      if (data !== null) {
        // We have data!!
        this.setState({
          data: Immutable.fromJS(JSON.parse(data))
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async storeState(state) {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(state.toJS()));
      this.setState({data: state});
    } catch (error) {
      // Error saving data
    }
  }

  changePage(newPage) {
    this.setState({activePage: newPage});
  }

  onSwapClick(team) {
    let state = this.state.data;
    state = state.updateIn([
      team, 'player1', 'position'
    ], (val) => val === 'front'
      ? 'back'
      : 'front');
    state = state.updateIn([
      team, 'player2', 'position'
    ], (val) => val === 'front'
      ? 'back'
      : 'front');

    this.storeState(state);
  }

  onScore(team, player) {
    let s = this.state.data;
    if (s.get('team1').get('points') >= s.get('setScore') || s.get('team2').get('points') >= s.get('setScore')) {
      return;
    }
    s = s.updateIn([
      team, player, 'points'
    ], (value) => value + 1);
    s = s.updateIn([
      team, 'points'
    ], (value) => value + 1);

    if (s.get(team).get('points') == s.get('setScore')) {
      s = s.update('results', (results) => results.insert(0, Immutable.fromJS({team1: s.get('team1'), team2: s.get('team2'), date: new Date()})));
    }

    this.storeState(s);
  }

  onChangeSetScore(value) {
    let s = this.state.data;

    s = s.set('setScore', value);

    this.storeState(s);
  }

  onReset() {
    let s = this.state.data;

    s = s.setIn([
      'team1', 'points'
    ], 0);
    s = s.setIn([
      'team1', 'player1', 'points'
    ], 0);
    s = s.setIn([
      'team1', 'player2', 'points'
    ], 0);
    s = s.setIn([
      'team2', 'points'
    ], 0);
    s = s.setIn([
      'team2', 'player1', 'points'
    ], 0);
    s = s.setIn([
      'team2', 'player2', 'points'
    ], 0);

    this.storeState(s);
  }

  onChangePlayerName(team, player, name) {
    let s = this.state.data;
    s = s.setIn([
      team, player, 'name'
    ], name);
    this.storeState(s);
  }

  onChangeTeamName(team, name) {
    let s = this.state.data;
    s = s.setIn([
      team, 'name'
    ], name);
    this.storeState(s);
  }

  onDeleteRecord(index) {
    let s = this.state.data;
    s = s.deleteIn(['results', index]);

    this.storeState(s);
  }

  getContent(page) {
    const state = this.state.data;
    switch (page) {
      case 'settings':
        return <Settings onChangePlayerName={this.onChangePlayerName.bind(this)} onChangeTeamName={this.onChangeTeamName.bind(this)} team1={state.get('team1')} team2={state.get('team2')} setScore={state.get('setScore')} onChangeSetScore={this.onChangeSetScore.bind(this)}/>
      case 'results':
        return <Results data={state.get('results')} onDeleteRecord={this.onDeleteRecord.bind(this)}/>
      default:
        return <Tracker team1={state.get('team1')} team2={state.get('team2')} onSwap={this.onSwapClick.bind(this)} onScore={this.onScore.bind(this)} onReset={this.onReset.bind(this)} setScore={state.get('setScore')}/>
    }
  }

  getTitle(page) {
    switch (page) {
      case 'settings':
        return 'Settings'
      case 'results':
        return 'Results'
      default:
        return 'Tracker'
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>{this.getTitle(this.state.activePage)}</Title>
        </Header>

        <Content>
          {this.getContent(this.state.activePage)}
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent onPress={() => this.changePage('tracker')} active={this.state.activePage === 'tracker'}>
              Tracker
              <Icon name='ios-paw'/>
            </Button>

            <Button transparent onPress={() => this.changePage('results')} active={this.state.activePage === 'results'}>
              Results
              <Icon name='ios-list-box'/>
            </Button>

            <Button transparent onPress={() => this.changePage('settings')} active={this.state.activePage === 'settings'}>
              Settings
              <Icon name='ios-settings'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

const defaultState = Immutable.fromJS({
  setScore: 10,
  team1: {
    name: 'Team 1',
    points: 0,
    player1: {
      name: 'Player 1',
      points: 0,
      position: 'front'
    },
    player2: {
      name: 'Player 2',
      points: 0,
      position: 'back'
    }
  },
  team2: {
    name: 'Team 2',
    points: 0,
    player1: {
      name: 'Player 1',
      points: 0,
      position: 'front'
    },
    player2: {
      name: 'Player 2',
      points: 0,
      position: 'back'
    }
  },
  results: []
});

export default App;
