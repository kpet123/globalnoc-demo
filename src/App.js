
import React from 'react';
import background from "./Subway_Map.jpg";
//We could implement the API call in another file



class Header extends React.Component{
  render(){

    
    return (
      <div className="header-display"  >
            <h1 style={{textAlign: 'center',
            borderStyle: 'solid',
            borderColor: 'white',
                fontFamily: "Times New Roman",
                backgroundColor: "darkblue",
                color:'white',
                padding: 20,
               //margin:8
            }}>{this.props.title}</h1>
      </div>
    )
  }
}

class Review extends React.Component{
  render(){

    console.log(this.props.reviewObject[10])
    return (
      <div style={{fontSize: 15,
          fontFamily: "Times New Roman",
          padding: 4,
          margin:10,
          borderStyle: 'solid',
          borderColor: 'darkblue',
          marginRight:60,
          marginLeft:60,
          backgroundColor: '#f0fff4',}}>
            <h3 style={{textAlign: 'center',}}> {this.props.reviewObject[10]} </h3>

      </div>
    )
  }
}

export default class App extends React.Component {


  state={
    reviewObject:null
  }

  //Call the getWeather function using async keyword
  updateReview = async() =>{
      
    //const response = await fetch("https://api.nytimes.com/svc/topstories/v2/science.json?api-key=G7c4tBnS8xh8WZ3Y5VW04zuf0rcabRf6");
    const response = await fetch("https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json")
    const subway_object = await response.json();
    
    //Sorting adapted from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

    console.log(subway_object)
    var results = subway_object['data'].sort((a, b) => (a[10] > b[10]) ? 1 : -1);
    console.log(results)

    this.setState({reviewObject:results});
  }

  //Call the API function (updateWeather->getWeather) when the compoenents are ready
  componentDidMount(){
    this.updateReview();
  }

  render(){
    //Because when the app initialized, the weatherObject is null so we want to check it before we access it
    //If it has a result (meaning the API result is back), then we show the result
    //If it is still null (which is often the case when initializing the view), then we just don't show the result
    if(this.state.reviewObject){
      return (
              <div style={{ backgroundImage: `url(${background})` ,
                  alignItems: 'center',justifyContent: 'center'}}>

      
            <Header title="NYC Subway Stations"></Header>
            <Review reviewObject={this.state.reviewObject[0]} ></Review>
       
            <Review reviewObject={this.state.reviewObject[1]} ></Review>
     
            <Review reviewObject={this.state.reviewObject[2]} ></Review>
      
            <Review reviewObject={this.state.reviewObject[3]} ></Review>
      
            <Review reviewObject={this.state.reviewObject[4]} ></Review>
 
            <Review reviewObject={this.state.reviewObject[5]} ></Review>
              
            <Review reviewObject={this.state.reviewObject[6]} ></Review>
              
            <Review reviewObject={this.state.reviewObject[7]} ></Review>
              
            <Review reviewObject={this.state.reviewObject[8]} ></Review>
              
            <Review reviewObject={this.state.reviewObject[9]} ></Review>
              

        </div>
      )
    }else{
      return(
             <div style={{backgroundColor: '#f0fff4',alignItems: 'center',justifyContent: 'center'}}>

     
           <Header title="Cannot Connect to Subway API"></Header>
             
             
        </div>
        )
    }
  }
}



