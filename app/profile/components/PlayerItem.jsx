import React from 'react'
import ListItem from '../../common/components/ListItem'

const LocationItem = ({id, name, email}) => (
    <ListItem title={`${name} <${email}>`}>
        <p>Child content</p>
    </ListItem>
)

export default LocationItem