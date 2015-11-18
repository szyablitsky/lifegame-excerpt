import React from 'react'
import UserResource from './resource'
import { connect } from 'react-redux';

const RESOURCES = [
  { key: 'energy', name: 'Энергия' },
  { key: 'money', name: 'Деньги' },
  { key: 'time', name: 'Время' },
]

function select(state) {
  return { resources: state.user.get('resources').toJS() };
}

const UserResources = React.createClass({
  render() {
    const { resources, images } = this.props

    return (
      <div className='user-resuorces'>
        {RESOURCES.map((resource) => {
          const key = resource.key
          return (
            <UserResource key={key} name={resource.name} value={resources[key]}
              icon={images[`resource/${key}.png`]} />
          )
        })}
      </div>
    )
  }
})

export default connect(select)(UserResources);
