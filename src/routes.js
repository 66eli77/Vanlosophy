'use strict';

import DynamicImport from 'app/components/DynamicImport';

const WebsiteRoutes = {
	childRoutes: [

		{
			path: '/',
			indexRoute: {
				getComponent(location, cb) {
					DynamicImport(
						import(/* webpackChunkName: "api-network" */'app/content/Home'),
						cb,
						'home'
					);
				}
			},
		},
		{
			path: 'features',
			getComponent(location, cb) {
				DynamicImport(
					import(/* webpackChunkName: "features" */'app/content/Features'),
					cb,
					'features'
				);
			}
		},
		{
			path: 'gallery',
			getComponent(location, cb) {
				DynamicImport(
					import(/* webpackChunkName: "contact-us" */'app/content/Gallery'),
					cb,
					'gallery'
				);
			}
		},
		{
			path: '*',
			getComponent(location, cb) {
				DynamicImport(
					import(/* webpackChunkName: "page-not-found" */'app/content/PageNotFound'),
					cb,
					'page-not-found'
				);
			}
		},

	],
};

export default WebsiteRoutes;

