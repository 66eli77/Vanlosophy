'use strict';

import React from 'react';
import DefaultLayout from 'app/layouts/Default';
import { Heading } from 'app/components/UI';
import { Row, Col, Icon } from 'antd';
import SEO from 'app/components/SEO';


const Features = (props) => {

	const APPLICATION_FEATURES = [
		{ status: true, title: 'Solor System', description: '3 x 160W solar panels capable of producing 3kWh eneger every sunny day.', },
		{ status: true, title: 'Fridge', description: '65 Liter 12v/110v two way energy efficient Fridge with a removable freezer', },
		{ status: true, title: 'Lights', description: 'LED light straps', },
		{ status: true, title: 'Van Theater', description: '48 inch screen with Sony laser technology pico projector', },
		{ status: true, title: 'Fresh Water System', description: '12v powered pump and 16 gal of fresh water capacity.', },
		{ status: true, title: 'Grey Water System', description: 'Under chassis mounted water tank array that holds 20 gal grey waters with easy to operate valves.', },
		{ status: true, title: 'Floor', description: 'Carbonized bamboo floor.', },
		{ status: true, title: 'Venting system', description: 'MaxxFan 7600 with remote control and thermal control', },
		{ status: true, title: 'House Battery', description: '1.6 kWh LiFePO4 lithium ion battery', },
		{ status: true, title: 'Inverter', description: "One Xantrex 2000w pure sine wave inverter and one Samlex 160w pure sine wave inverter.", },
	];


	return (
		<DefaultLayout>

			<Heading
				title="Some of the Features of this Campervan."
				subtitle="Click on them to see the pictures."
			/>
	

			<Row type="flex" className="component--features">
				{ APPLICATION_FEATURES.map( (feature,index) => {
					return (
						<Col key={index} xs={24} sm={12} md={8} className="feature-container">
						<div className="feature">
							<div className="title">
								<div className="status">{ feature.status ? <Icon type="check-circle-o" /> : <Icon type="close-circle-o" /> }</div>
								{ feature.title }
							</div>
							<div className="description">{ feature.description }</div>
						</div>
						</Col>
					);
				}) }
			</Row>

			<SEO url="features" />

		</DefaultLayout>
	);

}

export default Features;

