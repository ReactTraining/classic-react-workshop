import React from 'react'
import md5 from 'md5'

const GravatarURL = 'http://gravatar.com/avatar'

const Gravatar = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired
  },
  getDefaultProps() {
    return {
      size: 80
    }
  },
  render() {
    return (
      <img src={GravatarURL + '/' + md5(this.props.email) + '?s=' + this.props.size}/>
    )
  }
})

export default Gravatar
