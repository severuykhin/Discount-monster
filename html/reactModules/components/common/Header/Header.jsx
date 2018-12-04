import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className="rcl--header rcl--header_main">
        {this.props.children}
      </div>
    )
  }
}

export default Header;
