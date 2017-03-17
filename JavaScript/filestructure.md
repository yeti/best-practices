# JavaScript app recommended file structure

.
├── bin                      			# Build/Start scripts
├── config                   			# Project and build configurations
├── public                   			# Static public assets (not imported anywhere in source code)
├── server                   			# Express application that provides webpack middleware
│   └── main.js              			# Server application entry point
├── src                      			# Application source code
│   ├── index.html           			# Main HTML page container for app
│   ├── main.js              			# Application bootstrap and rendering
│   ├── constants.js              		# (Optional) if you need constants (outside of Redux)
│   ├── components           			# Global Reusable Presentational Components
│   │   ├── <A Component>    			# Use domain based structure when creating new components
│   │   │   └── <A Component>.js    	# Component
│   │   │   └── <A Component>.js    	# Component Container
│   │   │   └── <A Component>.spec.js   # Tests for Component
│   │   │   └── <A Component>.scss  	# CSS for Component
│   │   │   └── index.js         		# Package
│   ├── containers           			# Global Reusable Container Components (meh?)
│   ├── routes               			# Main route definitions and async split points
│   │   ├── index.js         			# Bootstrap main application routes with store
│   │   ├── Home             			# Fractal route
│   │   │   ├── index.js     			# Route definitions and async split points
│   │   │   ├── assets       			# Assets required to render components
│   │   │   ├── components   			# Presentational React Components
│   │   │   └── routes **    			# Fractal sub-routes (** optional)
│   │   └── Counter          			# Fractal route
│   │       ├── index.js     			# Counter route definition
│   │       ├── container    			# Connect components to actions and store
│   │       ├── modules      			# Collections of reducers/constants/actions
│   │       └── routes **    			# Fractal sub-routes (** optional)
│   ├── store                			# Redux-specific pieces
│   │   ├── createStore.js   			# Create and instrument redux store
│   │   └── reducers.js      			# Reducer registry and injection
│   └── styles               			# Application-wide styles (generally settings)
└── tests                    			# Unit tests
