'use strict';

import React from 'react';
import DefaultLayout from 'app/layouts/Default';
import { Row, Col, Carousel } from 'antd';
import SEO from 'app/components/SEO';
import Lightbox from 'react-images';


const Gallery = (props) => {

	this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = closeLightbox.bind(this);

		function closeLightbox() {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: true,
		});
	}

	return (
		<DefaultLayout>
			<Lightbox
		        images={[{ src: '/images/m1.jpg' }, { src: '/images/m2.jpg' }]}
		        isOpen={false}
		        onClose={this.closeLightbox}
		    />

			<SEO url="gallery" />

		</DefaultLayout>
	);

}

export default Gallery;
