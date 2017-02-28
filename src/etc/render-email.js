import React from 'react'
import moment from 'moment'
import ReactHTMLEmail, { Email, Box, Item, Span, A, Image, renderEmail } from 'react-html-email'
import Linkify from 'react-linkify'

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

const subtitleStyle = {
    color: '#222',
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '30px'
}

const css = `
    body { line-height: 1.65; }
    a { font-family: sans-serif; color: #DA4177; font-weight: bold; }
    hr { background-color: #FFE952; height: 3px; border: none; margin: 40px 0; }
    span { line-height: 1.65 !important; }
`.trim()

const emailHTML = ({ mentions, dms, frequency }) => {
    const title = 'New Twitter digest from Disconnect Today'
    return renderEmail(
            <Email title={title} headCSS={css}>
                <Item>
                    <Box>
                        <Item>
                            <Span style={{
                                ...titleStyle,
                                lineHeight: '1.8'
                            }}>{ title }</Span>
                        </Item>
                    </Box>
                    <Box>
                        <Item>
                            {
                                !!(dms.length) && (
                                    <Span>
                                        <Span style={{
                                            ...subtitleStyle
                                        }}>Direct messages</Span>
                                        <A style={{
                                            display: 'block',
                                            marginBottom: '20px'
                                        }} href="https://twitter.com/direct_messages">View DMs</A>
                                        <Box>
                                            {
                                                dms.map(dm => {
                                                    return <Item style={{
                                                        padding: '20px 0'
                                                    }}>
                                                        <Span>
                                                            <Image src={ dm.from.avatar } width="48" height="48" style={{
                                                                display: 'block',
                                                                marginBottom: '10px'
                                                            }} />
                                                            <Span style={{
                                                                display: 'block',
                                                                marginBottom: '10px'
                                                            }}>From <A href={`https://twitter.com/@${ dm.from.name }`}>@{ dm.from.name }</A></Span>
                                                            <Span style={{
                                                                fontStyle: 'italic'
                                                            }}><Linkify>{ dm.text }</Linkify></Span>
                                                            <Span style={{
                                                                display: 'block',
                                                                marginTop: '5px',
                                                                fontSize: '12px'
                                                            }}>Sent { moment(dm.created_at).fromNow() }</Span>
                                                        </Span>
                                                    </Item>
                                                })
                                            }
                                        </Box>
                                    </Span>
                                )
                            }
                        </Item>
                    </Box>
                    <Box>
                        <Item>
                            {
                                !!(mentions.length) && (
                                    <Span>
                                        <Span style={{
                                            ...subtitleStyle
                                        }}>Mentions</Span>
                                        <Box>
                                            {
                                                mentions.map(mention => {
                                                    return <Item key={ mention.id } style={{
                                                        padding: '20px 0'
                                                    }}>
                                                        <Span>
                                                            <Image src={ mention.from.avatar } width="48" height="48" style={{
                                                                display: 'block',
                                                                marginBottom: '10px'
                                                            }} />
                                                            <Span style={{
                                                                display: 'block',
                                                                marginBottom: '10px'
                                                            }}>From <A href={`https://twitter.com/@${ mention.from.name }`}>@{ mention.from.name }</A></Span>
                                                            <Span style={{
                                                                fontStyle: 'italic'
                                                            }}><Linkify>{ mention.text }</Linkify></Span>
                                                            <Span style={{
                                                                display: 'block',
                                                                marginTop: '5px',
                                                                fontSize: '12px'
                                                            }}>Sent { moment(mention.created_at).fromNow() }</Span>
                                                            <A style={{
                                                                display: 'block',
                                                                marginTop: '10px'
                                                            }} href={`https://twitter.com/${mention.from.name}/status/${mention.id}`}>Reply</A>
                                                        </Span>
                                                    </Item>
                                                })
                                            }
                                        </Box>
                                    </Span>
                                )
                            }
                        </Item>
                    </Box>
            </Item>
        </Email>
    )
}

export default emailHTML
