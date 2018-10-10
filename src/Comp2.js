import  React,{ Component } from 'react';
//mockup data
const users = [
    { name: 'Jerry', age: 11, gender: 'male' },
    { name: 'Tomy', age: 22, gender: 'male' },
    { name: 'Lily', age: 19, gender: 'female' },
    { name: 'Lucy', age: 20, gender: 'female' },
    { name: 'Jack', age: 33, gender: 'female' },
    { name: 'Jack1', age: 44, gender: 'female' },
    { name: 'Jack2', age: 55, gender: 'female' },
    { name: 'Jack3', age: 66, gender: 'female' },
    { name: 'Jack4', age: 77, gender: 'female' }
  ]

var ReviewedUser = [];
class Comp2 extends Component {
    constructor(props){
      super(props);
         //var userinfo = {index:0,
         //            like:false}

         this.state={index:0};
         ReviewedUser.push({index:0,like:false});
         this.getUser(0);
    }
    
    getUser(index){
      fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          var userinfo = {name: result.results[0].name.first + " " + result.results[0].name.last,
          location: result.results[0].location.street + "" + result.results[0].location.city + " " + result.results[0].location.state}
          var temp = ReviewedUser[index];
          ReviewedUser[index]={index: temp.index, like: temp.like, userinfo: userinfo};
          this.setState({userinfo:userinfo, like: temp.like});
        },
        (error) => {}
      
        )
        
    }
    onClickNext(event){
        var updated = this.state.index;
        if(++updated >= users.length){
         updated = updated % users.length;
        }
        var key = this.existInArray(updated);
        if (isNaN(key)){
          var userallinfo = {index:updated,
            like:false}
          ReviewedUser.push(userallinfo);
          this.setState({index:updated});
          this.getUser(updated);
        } else{
          this.setState({index:updated,
            userinfo:ReviewedUser[key].userinfo, 
            like: ReviewedUser[key].like});
        }
        console.log(ReviewedUser);

    }
    onClickPrevious(){
      if (this.state.index > 0 ){
        var preindex = this.state.index - 1;
        this.setState({index:preindex,
              like:ReviewedUser[preindex].like,
              userinfo:ReviewedUser[preindex].userinfo});
      }
      console.log(ReviewedUser);
    }

    //check whether exist in ReviewedUser
    existInArray(index){
      for(var key in ReviewedUser){
        if(ReviewedUser[key].index === index){
             return key;
        }
      }
      return NaN;
    }
    onClickLike(event){
      var key = this.existInArray(this.state.index);

      ReviewedUser[key] = {index: this.state.index,
              like:!ReviewedUser[key].like,
              userinfo:ReviewedUser[key].userinfo};
  
      this.setState({index:this.state.index,
        userinfo:ReviewedUser[key].userinfo, 
        like: ReviewedUser[key].like});

      console.log(ReviewedUser);
    }
    
    render () {    //{users.map((user,i) => <User key={i} user={user} />)}
        return (
            <div>
              <User index={this.state.index} userinfo={this.state.userinfo} like={this.state.like}/>
              <button onClick={this.onClickNext.bind(this)}>Next</button>
              <button onClick={this.onClickLike.bind(this)}>Like</button>
              <button onClick={this.onClickPrevious.bind(this)}>Previous</button>
            </div>
            
          )
      }
}
class User extends Component {
    
    constructor(){
      super();
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    
    // componentWillReceiveProps(nextProps) {
    //    this.getUser(nextProps.index);
    //    console.log("componentWillReceiveProps"+nextProps.index);
    // }
    // getUser(index){
    //   fetch("https://randomuser.me/api/")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       var userinfo = {name: result.results[0].name.first + " " + result.results[0].name.last,
    //       location: result.results[0].location.street + "" + result.results[0].location.city + " " + result.results[0].location.state}
    //       //console.log(userinfo); 
    //       var temp = ReviewedUser[index];
    //       ReviewedUser[index]={index: temp.index, like: temp.like, userinfo: userinfo};
    //     },
    //     (error) => {}
      
    //     )
    //     //console.log(user);
        
    // }

    render () {
      //var user = users[this.props.index];
      var like = this.props.like;
      var user = {name: '',
           position: ''}
      if(this.props.userinfo!==undefined){
         user = this.props.userinfo;
      }

      return (
        <div>
          <div>–’√˚£∫{user.name}</div>
          <div>µÿ÷∑£∫{user.location}</div>
          <div>œ≤ª∂£∫{String(like)}</div>
          <hr />
        </div>
      )
    }
  }
export default Comp2;