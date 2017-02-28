import React from 'react'

export default () => {
    return (
        <div className="py2 mt4 footer flex">
            <p className="flex-auto"><a className="button" href="mailto:hello@disconnect.today">Support</a></p>
            <p>{ new Date().getFullYear() }</p>
        </div>
    )
}
