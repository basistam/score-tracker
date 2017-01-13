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
import ResultsContainer from '../containers/ResultsContainer';
import SettingsContainer from '../containers/SettingsContainer';
import TrackerContainer from '../containers/TrackerContainer';
import Immutable from 'immutable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 'tracker'
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

  getContent(page) {
    switch (page) {
      case 'settings':
        return <SettingsContainer />
      case 'results':
        return <ResultsContainer />
      default:
        return <TrackerContainer />
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
          <Button transparent><Icon name="ios-refresh"/></Button>
          <Title>{this.getTitle(this.state.activePage)}</Title>
        </Header>

        <Content>{this.getContent(this.state.activePage)}</Content>

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

App.propTypes = {
};
App.defaultProps = {};

export default App;
