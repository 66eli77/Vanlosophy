'use strict';

import React from 'react';
import DefaultLayout from 'app/layouts/Default';
import { Row, Col, Carousel } from 'antd';
import SEO from 'app/components/SEO';


const Home = (props) => {

	return (
		<DefaultLayout>
			<div className="image"></div>

			<SEO url="home" />

		</DefaultLayout>
	);

}

export default Home;
