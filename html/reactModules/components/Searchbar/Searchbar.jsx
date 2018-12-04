import React, { Component } from "react";

class Searchbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

  }

  handleChange = (e) => {
    this.setState({
      query: e.currentTarget.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.query);
  }

  render() {
    return (
      <div className="rcl--searchbar">
        <div className="rcl--searchbar__form">
          <form 
            onSubmit={this.handleSubmit}
            className="rcl--searchbar__base" action="">
            <input 
              onChange={this.handleChange}
              className="rcl--searchbar__input" 
              type="text" 
              placeholder="Поиск"
              name=""
              value={this.state.query} 
              id="" />
            <button
              className="rcl--searchbar__submit" 
              type="submit"></button>
          </form>
        </div>
        <div className="rcl--searchbar__results" />
      </div>
    );
  }
}

export default Searchbar;
