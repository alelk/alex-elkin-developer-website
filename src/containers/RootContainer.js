/**
 * Root Container
 *
 * Created by Alex Elkin on 22.11.2017.
 */

import AppContainer from './AppContainer'

import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import { ConnectedRouter} from 'react-router-redux'

const RootContainer = ({store, history}) => (
    <Provider store={store}>
        <IntlProvider>
            <ConnectedRouter history={history}>
                <div style={{height: '100%', width: '100%'}}>
                    <AppContainer/>
                </div>
            </ConnectedRouter>
        </IntlProvider>
    </Provider>
);

RootContainer.propTypes = {
    store : PropTypes.object.isRequired,
    history : PropTypes.object.isRequired
};

export default RootContainer;