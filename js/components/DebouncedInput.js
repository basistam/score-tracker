import React from 'react';
import _ from 'underscore';
import {Input, InputGroup, ListItem} from 'native-base';

class DebouncedInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    }
  }

  componentWillMount() {
    this.onChangeDebounced = _.debounce(() => {
      this.props.onChangeText(this.state.value);
    }, 500);
  }

  onChange(value) {
    this.setState({value: value});
    this.onChangeDebounced();
  }

  render() {
    const {placeholder, ...otherProps} = this.props;
    return (
      <ListItem>
        <InputGroup>
        <Input
          inlineLabel
          {...otherProps}
          placeholder={placeholder}
          value={this.state.value}
          onChangeText={(value) => this.onChange(value)}/>
        </InputGroup>
      </ListItem>
    );
  }
}

DebouncedInput.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  onChangeText: React.PropTypes.func,
};
DebouncedInput.defaultProps = {};

export default DebouncedInput;
