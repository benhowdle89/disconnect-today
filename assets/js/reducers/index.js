import authState from './auth'
import pageState from './page'
import themesState from './theme'
import formsState from './form'
import billingState from './billing'
import domainState from './domain'

const reducers = {
    authState,
    pageState,
    themesState,
    billingState,
    domainState,
    ...formsState
}

export default reducers
