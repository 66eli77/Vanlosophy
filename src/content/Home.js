'use strict';

import React from 'react';
import DefaultLayout from 'app/layouts/Default';
import { HomeHeading } from 'app/components/UI';
import { Row, Col, Carousel } from 'antd';
import SEO from 'app/components/SEO';


const Home = (props) => {

	return (
		<DefaultLayout>

			<HomeHeading
				description="This is a 2015 Ram Promaster 136 high roof EcoDiesel that can fit into any regular parking spot and has a turning radius of a Honda Pilot. With its solar system setup, it's perfect for boondocking in the city or remote areas. I bought it brand new on December 2015. So far I have put 9,650 miles on it, averaging 20 mpg. First service at 5,500 miles. Have all the original papers for purchase and service."
				price="$82,000"
			/>

			<Col span={24} className="component--slider">
				<div>
					<div className="image">
						<img src="/images/slider/1.jpg" />
					</div>
				</div>
			</Col>

			<SEO url="home" />

		</DefaultLayout>
	);

}

export default Home;
