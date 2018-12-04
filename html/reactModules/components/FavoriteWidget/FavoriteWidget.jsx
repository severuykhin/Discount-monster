import React, { Component } from 'react'
import IconFavorite from '../common/Icon/IconFavorite.jsx'

export default class FavoriteWidget extends Component {
  render() {
    return (
      <div className="rcl--favoriteWidget">
        <button className="rcl--button rcl--favoriteWidget__button">
            <IconFavorite />
            <span className="rcl--favoriteWidget__counter">2</span>
        </button>
      </div>
    )
  }
}
