import React from 'react'

export default () => {
    return (
        <div className="py2 mt4 footer">
            <p className="left"><a className="button" href="mailto:hello@disconnect.today">Support</a></p>
            <p className="right">{ new Date().getFullYear() }</p>
        </div>
    )
}
