'use strict';

import React from 'react';
import { Row, Col } from 'antd';


const Heading = (props) => {

	return (
		<Row>
		<Col span={14} offset={5}>
			<div className="heading">
				{ props.title }
				{ props.subtitle &&
					<div className="subtitle">{ props.subtitle }</div>
				}
			</div>
		</Col>
		</Row>
	);

}

const HomeHeading = (props) => {

	return (
		<Row>
		<Col span={20} offset={2}>
			<div className="discription">{ props.description }</div>
			<div className="discription"><span className="forsale"> Now for sale! </span> <span className="price"> { props.price } </span></div>
		</Col>
		</Row>
	);

}


const URL = (props) => {
	return (
		<a href={props.to} target="_blank" rel="nofollow">{ props.title ? props.title : props.to }</a>
	)
}


export {
	Heading,
	HomeHeading,
	URL,
};

