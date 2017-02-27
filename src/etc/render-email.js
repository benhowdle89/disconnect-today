import React from 'react'
import ReactHTMLEmail, { Email, Box, Item, Span, A, Image, renderEmail } from 'react-html-email'

ReactHTMLEmail.injectReactEmailAttributes()

const textStyles = {
    fontSize: 16
}

const styles = {
    lineHeight: '1.65',
    fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
    color: 'rgb(85,85,86)'
}

const titleStyle = {
    color: '#DA4177',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold',
    paddingTop: '20px'
}

const css = `
    body { line-height: 1.65; }
    a { font-family: sans-serif; color: #DA4177; font-weight: bold; }
    hr { background-color: #FFE952; height: 3px; border: none; margin: 40px 0; }
`.trim()

const emailHTML = ({ mentions, dms, frequency }) => {
    const title = 'New Twitter digest from Disconnect Today'
    return renderEmail(
            <Email title={title} headCSS={css}>
                <Item>
                    <Span style={{
                        ...titleStyle,
                        lineHeight: '1.8'
                    }}>{ title }</Span>
                    {
                        !!(dms.length) && (
                            <Span>
                                <Span>Direct messages</Span>
                                {
                                    dms.map(dm => {
                                        return <Span>
                                            { dm.text }
                                        </Span>
                                    })
                                }
                            </Span>
                        )
                    }
                    {
                        !!(mentions.length) && (
                            <Span>Mentions</Span>
                        )
                    }
            </Item>
        </Email>
    )
}

export default emailHTML
