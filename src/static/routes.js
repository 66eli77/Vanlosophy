'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from 'app/content/Home';
import Features from 'app/content/Features';
import Gallery from 'app/content/Gallery';
import PageNotFound from 'app/content/PageNotFound';


const routes = (
    <Route path='/'> {/* current the root page is pre-render by Harp.js not React.js */}
    	<IndexRoute component={ Home } />
        <Route path='features' component={ Features } />
        <Route path='gallery' component={ Gallery } />
        <Route path='*' exact={true} component={ PageNotFound } />
    </Route>
);

export default routes;
