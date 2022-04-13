/* global window document */
import React from 'react';
import ReactDOM from 'react-dom';
import CalendarUtilities from '../components/calendar';

export default class App extends React.Component {
	constructor (props) {
		super(props);

		this.render();
	}

	render = () => <CalendarUtilities />
}
