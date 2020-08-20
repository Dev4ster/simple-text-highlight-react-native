import React, {useEffect, useState, useMemo} from 'react';

import TextHighlight from './TextHighlight';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  ListContainer: {
    borderWidth: 1,
    flex: 0.5,
  },
  list: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 10,
  },
  highlight: {
    color: 'red',
  },
});

const HighlightText = ({children}) => (
  <Text style={styles.highlight}>{children}</Text>
);

const App = () => {
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const userListFiltered = useMemo(() => {
    if (userList.length > 0) {
      if (searchValue) {
        return userList
          .filter((user) =>
            user.login.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map((user) => ({
            ...user,
            login: TextHighlight(user.login, searchValue, HighlightText),
          }));
      }

      return userList;
    }

    return [];
  }, [searchValue, userList]);

  useEffect(() => {
    fetch('https://api.github.com/search/users?q=location:brazil')
      .then((response) => response.json())
      .then((data) => setUserList(data.items));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="nome do usuário"
        onChangeText={setSearchValue}
      />
      <View style={styles.ListContainer}>
        <FlatList
          data={userListFiltered}
          keyExtractor={(item) => String(item.id)}
          style={styles.list}
          renderItem={({item: user}) => (
            <View style={styles.item}>
              <Text>{user.login}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
