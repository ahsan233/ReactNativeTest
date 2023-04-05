import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar
} from 'react-native';
const App = () => {
  const [initialUsers, setInitialUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoadingdata, setLoadingdata] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    //GET request
    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const json = await response.json();
      console.log('Result=' + JSON.stringify(json));
      setInitialUsers(json?.results);
      setUsers(json?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingdata(false);
    }
  };

  const renderUser = ({item}) => {
    return (
      <View style={styles.itemView}>
        <Image style={styles.itemImage} source={{uri: item?.picture?.large}} />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.textStyle1}>First Name:</Text>
          <Text style={styles.textStyle}>{item?.name?.first}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textStyle1}>Last Name:</Text>
          <Text style={styles.textStyle}>{item?.name?.last}</Text>
        </View>
      </View>
    );
  };

  const searchUser = text => {
    setSearch(text);
    if (text === '') {
      setUsers(initialUsers);
    } else {
      const filteredUsers = initialUsers.filter(user =>
        user.name.first.toLowerCase().includes(text.toLowerCase()) || user.name.last.toLowerCase().includes(text.toLowerCase()),
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <View style={styles.container}>
       <StatusBar style="auto" />
      <TextInput
        style={styles.TextInput}
        onChangeText={searchUser}
        value={search}
        placeholder="Search user..."
        placeholderTextColor={'#000000'}
      />
      {isLoadingdata ? (
          <ActivityIndicator size={'large'} />
      ) : (
      <View style={styles.listview}>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  itemView: {
    width: 170,
    height: 170,
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 3,
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
  },
  textStyle1: {
    color: '#000000',
    fontWeight: 'normal',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  listview: {
    flex: 1,
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
});

export default App;
