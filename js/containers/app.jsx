/* global window document */
import React from 'react';
import ReactDOM from 'react-dom';
import CalendarUtilities from '../components/calendar';

import "../styles/app.css";

export default class App extends React.Component {
	constructor (props) {
		super(props);

		this.render();
	}

	render = () => <CalendarUtilities />
}
