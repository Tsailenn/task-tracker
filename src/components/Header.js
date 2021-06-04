import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = (props) => {
    const onClick = (e) => {
        console.log(e)
    }

    const location = useLocation()

    return (
        <header className='header'>
            <h1 style={
                headingStyle
            }>
                { props.title }
            </h1>
            {
                location.pathname === '/' ?
                <Button color='green' text='add'
                onClick={ props.toggleShowAdd }
                ></Button>
                :
                <div></div>
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Default'
}

Header.propTypes = {
    title: PropTypes.string
}

const headingStyle = {
    color: 'blue',
}

export default Header
