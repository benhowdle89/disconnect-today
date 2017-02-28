import React from 'react'

import { Link } from 'react-router'

export default () => {
    return (
        <div>
            <h1 className="logo center my4"><Link to="/"><span className="first">Disconnect</span> <span className="second">Today</span></Link></h1>
        </div>
    )
}
