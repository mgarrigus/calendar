// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
let output = {
	log () {},
	error () {}
};

if (process.env.NODE_ENV !== 'production') {
	if (console) {
		output = console;
	}
}

module.exports = output;
