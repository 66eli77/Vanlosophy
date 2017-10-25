'use strict';

import React from 'react';
import Header from 'app/components/Header';


const DefaultLayout = (props) => {

    return (
        <div className="website--layout">

           	<Header />

            <div className="container">
            	{ props.children }
            </div>

        </div>
    );

}

export default DefaultLayout;
