import React,{Component} from 'react';
import { StyleSheet, Text, View,ActivityIndicator,FlatList } from 'react-native';
import FeedItem from './component/FeedItem';

export default class App extends Component {
  state={
    isLoading: true,
    isRefreshing:false,
    listArticles:[],
    totalResults:0,
    page:1,
  };

  componentDidMount = async () =>{
    const {page} = this.state;
    this.setState({isLoading:true});
    this.callApi(page);
    
  };

  callApi = async page =>{
    const {listArticles} = this.state;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=791658331da2441c91f308276fee4fb9&page=${page}`
    )
    const dataJson = await response.json();
    this.setState({
      page: page,
      isLoading: false,
      isRefreshing:false,
      listArticles: listArticles.concat(dataJson.articles),
      totalResults: response.totalResults
    })
  };

  onEndReached = async() =>{
    const {page} = this.state;
    const newPage = page + 1;
    this.callApi(newPage);
  };

  onRefresh =() =>{
    const newPage =1;
    this.setState({ isRefreshing:true,listArticles :[], page:newPage});
    setTimeout(() => {
      this.callApi(newPage);
    }, 2000);
  }

  renderItem =(item) =>{
    return (
      <FeedItem item={item.item}/>
    )
  };

  renderFooter = () =>{
    const {isRefreshing} = this.state;
    if(!isRefreshing){
      return <ActivityIndicator size='large' animating={true}></ActivityIndicator>
    }
  };


  render() {
    const { isLoading, listArticles,isRefreshing} = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' animating={isLoading} color='red'></ActivityIndicator>
        </View>
      )
    } return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>20</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={listArticles}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter()}
          onRefresh={this.onRefresh}
          refreshing={isRefreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
  },
  flatList:{
    paddingHorizontal:10,
    paddingVertical:10,
  },
   row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 20,
    color: 'grey',
    fontWeight:'bold'
  }
});
