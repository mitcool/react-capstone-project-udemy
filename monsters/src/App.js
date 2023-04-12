import React from 'react'
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css'

class App extends React.Component {

  constructor(){
    super();

    this.state = {
        monsters:[],
        searchString:''
    }
  };

  componentDidMount(){
    let endpoint = `https://jsonplaceholder.typicode.com/users`;

    fetch(endpoint)
      .then((response)=>response.json())
      .then((users) => this.setState(() => {
          return {monsters:users};
      },() => {
        //console.log(users)
      }))
  }

  onSearchChange = (e) =>{
      const searchString = e.target.value.toLocaleLowerCase();
      this.setState({searchString})
  }

  render(){
    const { monsters,searchString } = this.state;
    const { onSearchChange } = this;
    const fillteredMonsters = monsters.filter((m) => {
      return m.name.toLocaleLowerCase().includes(searchString)
   });
    return (
        <div className="App">
          <h1 class="app-title">Monster App</h1>
          <SearchBox onChangeHandler={onSearchChange}  placeholder="Search monster" className="search-box"/>
          <CardList monsters={fillteredMonsters} />
        </div>
      )
    }
}

export default App;

