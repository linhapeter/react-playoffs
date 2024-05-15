import React, { useState, useEffect } from 'react';
import { View,  Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Image, Modal,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import ApiService from './ApiService';


const logos = {
  BOS: require('./assets/logos/BOS_dark.png'),
  CAR: require('./assets/logos/CAR_dark.png'),
  COL: require('./assets/logos/COL_dark.png'),
  DAL: require('./assets/logos/DAL_dark.png'),
  EDM: require('./assets/logos/EDM_dark.png'),
  FLA: require('./assets/logos/FLA_dark.png'),
  LAK: require('./assets/logos/LAK_dark.png'),
  NSH: require('./assets/logos/NSH_dark.png'),
  NYI: require('./assets/logos/NYI_dark.png'),
  NYR: require('./assets/logos/NYR_dark.png'),
  TBL: require('./assets/logos/TBL_dark.png'),
  TOR: require('./assets/logos/TOR_dark.png'),
  VAN: require('./assets/logos/VAN_dark.png'),
  VGK: require('./assets/logos/VGK_dark.png'),
  WPG: require('./assets/logos/WPG_dark.png'),
  WSH: require('./assets/logos/WSH_dark.png'),
};

const nhlLogo = require('./assets/nhl-logo.png');

const CustomTable = ({ headers, data }) => {
  return (
    <View style={styles.container_table}>
    <View style={styles.table}>
      <View style={[styles.table_row, { borderTopWidth: 0 }]}>
        {headers.map((header, index) => (
          <Text style={[styles.cell, styles.header]} key={index}>{header}</Text>
        ))}
      </View>
      {data.map((row, rowIndex) => (
        <View style={styles.table_row} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Text style={[styles.cell, styles.text]} key={cellIndex}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  </View>
  );
};




const FAB = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const infoText = `PLAYOFF FORMAT\n\nThe Basics\n16 teams will qualify for the Stanley Cup Playoffs.\nThe format is a set bracket that is largely division-based with wild cards.\nThe top three teams in each division will make up the first 12 teams in the playoffs.\nThe remaining four spots will be filled by the next two highest-placed finishers in each conference, based on regular-season record and regardless of division.\nIt is possible for one division in each conference to send five teams to the postseason while the other sends just three.\nHome-ice advantage through the first two rounds goes to the team that placed higher in the regular-season standings.\nEach of the four rounds is a best-of-7; the first team to win four games advances to the next round.\n\nThe First Round\nThe division winner with the best record in each conference will be matched against the wild-card team with the lesser record\nThe wild card team with the better record will play the other division winner.\nThe teams finishing second and third in each division will meet within the bracket headed by their respective division winners.\n\nThe Second Round\nFirst-round winners within each bracket play one another to determine the four participants in the Conference Finals.\n\nConference Finals & Stanley Cup Final\nIn the Conference Finals and Stanley Cup Final, home-ice advantage goes to the team that had the better regular-season record - regardless of the teams' final standing in their respective divisions.`;

  return (
    <View style={styles.FAB_container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.FAB_modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <ScrollView
            style={styles.FAB_modalContent}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Text style={styles.FAB_modalText}>{infoText}</Text>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={styles.FAB_fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.FAB_fabText}>i</Text> 
      </TouchableOpacity>
    </View>
  );
};




const SeriesScreen = ({ navigation, route }) => {
  const { series } = route.params;
  return (
    <ScrollView style={styles.container}>
      {series.map((serie, index) => (
        <TouchableOpacity style={styles.card_container}
          key={index}
          onPress={() => navigation.navigate('SeriesDetailScreen', { 
            seriesLetter: serie.seriesLetter, 
            topId: serie.topId, 
            bottomId: serie.bottomId,
            topLogo: serie.topLogo,
            bottomLogo: serie.bottomLogo
          })}
        >
          <View style={styles.card}>
          
            <View style={styles.row}>
              {serie.topLogo === 'empty' ? 
                <Image source={{uri: 'https://th.bing.com/th/id/R.ab652e76aca2bb1596aceebcf51c0a29?rik=4tKBsuKGse6rSw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-lock-picture-lock-2-icon-1600.png&ehk=5bUCk2gxyyG7Z0k6n3F0YYIRoTDMm5tewPGXcT5Ukmw%3d&risl=&pid=ImgRaw&r=0'}} style={styles.img_logo} />
                : Platform.OS === 'android' ?
                  <Image source={logos[serie.topLogo]} style={styles.img_logo} />
                  : <Image source={{uri:serie.topLogo}} style={styles.img_logo} />
              }
              <Text style={styles.text_left}>{serie.top}</Text>
            </View>
            <Text style={styles.score}>{serie.score}</Text>
            <View style={styles.row}>
              <Text style={styles.text_right}>{serie.bottom}</Text>
              {serie.bottomLogo === 'empty' ? 
                <Image source={{uri: 'https://th.bing.com/th/id/R.ab652e76aca2bb1596aceebcf51c0a29?rik=4tKBsuKGse6rSw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-lock-picture-lock-2-icon-1600.png&ehk=5bUCk2gxyyG7Z0k6n3F0YYIRoTDMm5tewPGXcT5Ukmw%3d&risl=&pid=ImgRaw&r=0'}} style={styles.img_logo} />
                : Platform.OS === 'android' ?
                  <Image source={logos[serie.bottomLogo]} style={styles.img_logo} />
                  : <Image source={{uri: serie.bottomLogo}} style={styles.img_logo} />
              }
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  
    padding: 8,
    backgroundColor: '#282c34',
   width: '100%',
  },
  card_container: {
    alignItems: 'center',
  },
  img_logo: {
    width: 45,
    height: 45,
  },
  card: {
    width: 600,
    backgroundColor: '#333',
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      android: {
        width: 420,
      },
    }),
  },
  expand_arrow: {
    color: '#fff',
    marginLeft: 20,
    marginLeft: 20,
  }, 
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_left: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  text_right: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  score: {
    color: '#fff',
    fontSize: 20,
  },

  tableContainer: {
    alignItems: 'center',
    width: '100%',
  },

  container_table: {
    maxWidth: 600, 
    width: '100%', 
    flex: 1, 
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        maxWidth: 420,
      },

    }), 
  },
  table: {
    backgroundColor: '#333', 
    borderColor: '#fff', 
    borderWidth: 1,
   
  },
  table_row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  cell: {
    flex: 1,
    borderColor: '#fff',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  FAB_container: {
    position: 'absolute', 
    bottom: 20,
    right: 20,
    zIndex: 1000, 
    ...Platform.select({
      android: {
        bottom: 30,
        right: 10,
      }
    }),
  },
  FAB_fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    ...Platform.select({
      android: {
        backgroundColor: 'green',
      },
      windows: {
        backgroundColor: 'blue',
      }
    }),
  },
  FAB_modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  FAB_modalContent: {
    margin: 20,
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    width: '50%',
    ...Platform.select({
      android: {
        width: '80%',
      }
    }),
  },
  FAB_modalText: {
    textAlign: "left",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  FAB_fabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});



const SeriesDetailScreen = ({route}) => {
  const { seriesLetter, topId, bottomId, topLogo, bottomLogo } = route.params;

  const [games, setGames] = useState([]);
  const [expandedGames, setExpandedGames] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const gamesData = await ApiService.fetchGamesAndDetails(seriesLetter);
        setGames(gamesData);
      } catch (error) {
        console.error('Failed to fetch games data:', error);
      }
    }

    fetchData();
  }, [seriesLetter]);

  const toggleExpansion = (index) => {
    const newExpandedGames = new Set(expandedGames);
    if (expandedGames.has(index)) {
      newExpandedGames.delete(index);
    } else {
      newExpandedGames.add(index);
    }
    setExpandedGames(newExpandedGames);
  };

  return (
    <ScrollView style={styles.container}>
      {games.map((game, index) => (
        <View style={styles.tableContainer} key={index}>
          <TouchableOpacity style={styles.card_container} onPress={() => toggleExpansion(index)}>
            <View style={styles.card}>
              <View style={styles.row}>
              {Platform.OS === 'android' ?
                (<Image
                  style={styles.img_logo}
                  source={game.homeId === topId ? logos[topLogo] : logos[bottomLogo]}
              />) :
                (<Image
                  style={styles.img_logo}
                source={{uri: game.homeId === topId ? topLogo : bottomLogo}}/>)
            }
                 
                <Text style={styles.text_left}>{game.home}</Text>
              </View>
              <Text style={styles.score}>{game.score}</Text>
              <View style={styles.row}>
                <Text style={styles.text_right}>{game.away}</Text>
               
                {Platform.OS === 'android' ?
                (<Image
                  style={styles.img_logo}
                source={game.awayId === bottomId ? logos[bottomLogo] : logos[topLogo]}
              />) :
                (<Image
                  style={styles.img_logo}
                source={{uri: game.awayId === bottomId ? bottomLogo : topLogo}}/>)
            }
      
                <Text style={styles.expand_arrow}>{expandedGames.has(index)? '▲' : '▼'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {expandedGames.has(index) && <CustomTable  
          headers={['Stat', 'Home', 'Away']} 
          data={[
                ['SOG', game.details[0].homeValue, game.details[0].awayValue ],
                ['PIM', game.details[4].homeValue, game.details[4].awayValue ],
                ['Hits',game.details[5].homeValue, game.details[5].awayValue ],
                ['BS', game.details[6].homeValue, game.details[6].awayValue ],
              ]} />}
        </View>
      ))}
    </ScrollView>
  );
}


const Stack = createStackNavigator();
const RoundNavigator = ({ route }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: Platform.OS === 'android', 
          headerTitle: 'Playoffs', 
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={nhlLogo} style={{ width: 45, height: 45 , marginLeft: 10}} />
              <Text style={{ color: 'white', marginLeft: 10, fontSize: 25, }}>PLAYOFFS</Text>
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="series"
          component={SeriesScreen}
          initialParams={{ series: route.params.series }}
        />
        <Stack.Screen name="SeriesDetailScreen" component={SeriesDetailScreen}  />
      </Stack.Navigator>
    );
}


const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
export default function App() {
  const [series, setseries] = useState({});
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    ApiService.fetchSeries()
      .then(data => {
  
        const r1Series = data.filter(s => s.seriesAbbrev === 'R1');
        const r2Series = data.filter(s => s.seriesAbbrev === 'R2');
        const cfSeries = data.filter(s => s.seriesAbbrev === 'ECF' || s.seriesAbbrev === 'WCF');
        const scfSeries = data.filter(s => s.seriesAbbrev === 'SCF');
   
        setseries({ r1: r1Series, r2: r2Series, cf: cfSeries, scf: scfSeries });
        setLoading(false);  
      })
      .catch(error => {
        console.error(error);
        setLoading(false);  
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;  
  }
  if (Platform.OS === 'android') {
    return (
      <NavigationContainer>
       <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarActiveBackgroundColor: 'black',
          tabBarInactiveBackgroundColor: 'black',
          tabBarLabelStyle: {
            textAlign: 'center',
            padding: 10,
            fontSize: 20,
          },
          tabBarStyle: [
            {
              display: 'flex',
              justifyContent: 'center',
            },
            null,
          ],
        }}
      >
          <Tab.Screen
            name="R1"
            component={RoundNavigator}
            initialParams={{ series: series.r1 }}
            options={{
              tabBarIcon: () => null,
              headerShown: false,
               
            }}
          />
          <Tab.Screen
            name="R2"
            component={RoundNavigator}
            initialParams={{ series: series.r2 }}
            options={{
              tabBarIcon: () => null,
              headerShown: false, 
            }}
          />
          <Tab.Screen
            name="CF"
            component={RoundNavigator}
            initialParams={{ series: series.cf }}
            options={{
              tabBarIcon: () => null,
              headerShown: false, 
            }}
          />
          <Tab.Screen
            name="SCF"
            component={RoundNavigator}
            initialParams={{ series: series.scf }}
            options={{
              tabBarIcon: () => null,
              headerShown: false, 
            }}
          />
          
        </Tab.Navigator>
        <View style={styles.FAB_container}>
      <FAB />  
    </View>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
     <TopTab.Navigator
     screenOptions={{
      unmountOnBlur: true,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: 'black',
      },
      tabBarLabelStyle: {
        fontSize: 20,
      },
      tabBarIndicatorStyle: {
        backgroundColor: 'transparent', 
      },
      
    }}
    tabBar={props => (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'black' }}>
        {Platform.OS === 'web' ?
          <Image source={{uri: 'https://media.d3.nhle.com/image/private/t_q-best/prd/assets/nhl/logos/nhl_shield_on_dark_kl1omz'}} style={{ width: 45, height: 45 , marginLeft: 10  }} /> :
          <Image source={nhlLogo} style={{ width: 45, height: 45 , marginLeft: 10}} />
        }
        
        <Text style={{ color: 'white', marginLeft: 10, fontSize: 25, }}>PLAYOFFS</Text>
        <View style={{ flex: 1 }}>
          <MaterialTopTabBar {...props} />
        </View>
      </View>
    )}
  >
      
        <TopTab.Screen
          name="R1"
          component={RoundNavigator}
          initialParams={{ series: series.r1 }}
          options={{
            tabBarIcon: () => null,
            headerShown: false,
             
          }}
        />
        <TopTab.Screen
          name="R2"
          component={RoundNavigator}
          initialParams={{ series: series.r2 }}
          options={{
            tabBarIcon: () => null,
            headerShown: false, 
          }}
        />
        <TopTab.Screen
          name="CF"
          component={RoundNavigator}
          initialParams={{ series: series.cf }}
          options={{
            tabBarIcon: () => null,
            headerShown: false, 
          }}
        />
        <TopTab.Screen
          name="SCF"
          component={RoundNavigator}
          initialParams={{ series: series.scf }}
          options={{
            tabBarIcon: () => null,
            headerShown: false, 
          }}
        />
       
      </TopTab.Navigator>
      <View style={styles.FAB_container}>
      <FAB />  
    </View>
    </NavigationContainer>
  );
}