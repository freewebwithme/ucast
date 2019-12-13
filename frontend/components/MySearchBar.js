import React from 'react';
import { SearchBar } from 'react-native-elements';


export default class MySearchBar extends React.Component {
  
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state

    return (
      <SearchBar
	placeholder="Type here..."
	onChangeText={this.updateSearch}
	value={search}
      />
    )
  }
}
