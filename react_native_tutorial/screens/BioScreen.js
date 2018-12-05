import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class BioScreen extends React.Component {
  static navigationOptions = {
    title: 'Bio',
  };

  render() {
    const pic = {
      uri: 'https://avatars2.githubusercontent.com/u/38709589?s=460&v=4'
    };
    return (
      <View style={styles.container}>

        {/* Content Container */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          {/* Bio Container */}
          <View style={styles.bioContainer}>
            <Image 
              source={pic}
              style={{ width: 200, height: 200 }}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.red}>2016 Summer Vacation</Text> 
              <Text style={styles.bigblue}>at Hong Kong</Text>
              <Text style={[styles.bigblue, styles.red]}>Viel Spaß!</Text>
            </View>
            
            {/* Flex Dimensions boxes */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, height: 10, backgroundColor: 'powderblue' }} />
              <View style={{ flex: 2, height: 10, backgroundColor: 'skyblue' }} />
              <View style={{ flex: 3, height: 10, backgroundColor: 'steelblue' }} />
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  loadingContainer: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
  },
  bioContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
