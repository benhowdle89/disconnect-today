import React from 'react'

import { Link } from 'react-router'

export default () => {
    return (
        <div className="center my4">
            <h1 className="logo"><Link to="/"><span className="first">Disconnect</span> <span className="second">Today</span></Link></h1>
            <p style={{
                color: 'rgba(34, 34, 34, 0.7)'
            }}>Twitter digest emails without the distraction</p>
        </div>
    )
}
