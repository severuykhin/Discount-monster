import React, { Component } from 'react'
import IconFavorite from '../common/Icon/IconFavorite.jsx'

export default class FavoriteWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.bodyRef = document.body;

  }

  toggleActive = () => {
    this.resolveBodyState();
    this.setState({ active: !this.state.active });
  }

  resolveBodyState() {
    if (!this.state.active) {
      this.bodyRef.classList.add('fixed');
    } else {
      this.bodyRef.classList.remove('fixed');
    }
  }

  render() {
    return (
      <div className="rcl--favoriteWidget">
        <button
          onClick={this.toggleActive} 
          className="rcl--button rcl--favoriteWidget__button">
            <IconFavorite />
            <span className="rcl--favoriteWidget__counter">2</span>
        </button>
      
      { this.state.active 
        &&
        <React.Fragment> 
          <div
            onClick={ this.toggleActive } 
            className="rcl--favoriteWidget__overlay rcl--favoriteWidget__overlay_active">
              <div className="rcl--favoriteWidget__modal">
                <div className="rcl--favoriteWidget__modal-content">lol</div>
              </div>
            </div> 
        </React.Fragment>
      }
      </div>
    )
  }
}
