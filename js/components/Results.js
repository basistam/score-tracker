import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
} from 'native-base';
import dateFormat from 'dateformat';

class Results extends React.Component {
  render() {
    return (
      <View>

      </View>
    );
  }
}

Results.propTypes = {
  data: React.PropTypes.object,
  onDeleteRecord: React.PropTypes.func
};
Results.defaultProps = {};

export default Results;
