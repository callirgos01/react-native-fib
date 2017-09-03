import React from 'react';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { StyleSheet, Text, View, TouchableHighlight, TextInput, ScrollView } from 'react-native';

const AppContainer = ({solusionFor, current, doTheThing}) => (
  <View style={styles.container}>
    <View  style={{
                  height:40,
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  padding: 0,
                  flexDirection:'row'}}>
      <TextInput  style={{includeFontPadding:false,flex:0.8}}
                  returnKeyType='search'
      />
      <TouchableHighlight onPress={()=>{doTheThing()}} underlayColor="orange" style={{backgroundColor:'rgba(255,255,255,.8)',borderWidth:1,borderRadius:10,flex:0.2}}> 
        <Text style={{flex:1,alignSelf:'stretch', borderWidth:1,borderColor:'#000',textAlignVertical:'center', textAlign:'center',alignContent:'center'}}> 
          click
        </Text>
      </TouchableHighlight>
    </View>
    <ScrollView style={{flex:0.8}}>
        <Text>{solusionFor}:{current} </Text>
    </ScrollView>
  </View>
)
const mapStateToProps =(state) => {
  return {
    solusionFor: state.index,
    current: state.current,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doTheThing: ()=>dispatch({type:'SOMETHING'})
  }
}
AppContainer = connect(mapStateToProps,mapDispatchToProps)(AppContainer);

const configureStore = () => {
  return createStore((state={index: 1, prev:0, current:1},action)=> {
    console.log('callewd');
    return {
      index:state.index+1,
      prev:state.current,
      current:state.prev+state.current,
    };
  }, 
  {
    index:1,
    prev:0,
    current:1,
  }, applyMiddleware(createLogger()))
}
const store = configureStore()
const App = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider > 
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
});


export default App

/*
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {listOfThingsToshow:[]}
  }
  render() {
    return (
    <View style={styles.container}>
        <View  style={{
                      height:40,
                      borderBottomColor: '#000',
                      borderBottomWidth: 1,
                      padding: 0,
                      flexDirection:'row'}}>
          <TextInput  style={{includeFontPadding:false,flex:0.8}}
                      returnKeyType='search'
          />
          <TouchableHighlight onClick={()=>{this.state.listOfThingsToshow.push('thing')}} underlayColor="orange" style={{backgroundColor:'rgba(255,255,255,.8)',borderWidth:1,borderRadius:10,flex:0.2}}> 
            <Text style={{flex:1,alignSelf:'stretch', borderWidth:1,borderColor:'#000',textAlignVertical:'center', textAlign:'center',alignContent:'center'}}> 
                clinking
            </Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={{flex:0.8}}>
            this.state.listOfThingsToshow.map((element=><li>element</li>)
        </ScrollView>
      </View>
    );
  }
}

*/