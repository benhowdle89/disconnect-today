import React from 'react'

const Loading = ({ children, column = false, style = {} }) => {
    let containerStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        margin: '0 6px',
        ...style
    }
    let childStyle = {}
    if(column){
        containerStyle.display = 'flex'
        containerStyle.flexDirection = 'column'
        childStyle.marginBottom = '1em'
    }
    return (
        <div style={containerStyle}>
            <div className="see-it-in-action__loader" style={childStyle}></div>
            { children }
        </div>
    )
}

export default Loading
