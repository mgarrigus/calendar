import React from 'react';
import { getStartTime } from '../utilities/schedule-utilities';

export class Calendar extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
            schedules: [
				[['06:45', '09:30'], ['12:00', '13:00'], ['17:00', '20:00']],
				[['07:00', '10:00'], ['12:00', '14:00'], ['19:00', '20:00']],
	            [['11:00', '13:15'], ['15:00', '15:30'], ['18:30', '19:00']]
			],
			duration: 0,
			earliest: 'Please submit a duration.',
			windowStart: '06:00',
			windowEnd: '20:00'
        };
	}

	handleWindowEnd = (event) => {
		const value = event.target.value;
		this.setState({
			windowStart: value
		});
	}

	handleWindowStart = (event) => {
		const value = event.target.value;
		this.setState({
			windowStart: value
		});
	}

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			duration: value
		});
	}

	getTime = () => {
		const earliest = getStartTime(this.state.schedules, this.state.duration);

		if  (!earliest) {
			this.setState({
				earliest: 'No avaialable times found.'
			});
		} else {
			this.setState({
				earliest
			});
		}
	}

	render () {
		const { shedules } = this.props;

		return (
			<article className="calendar">
				<header>
					<h1>Calendar Availability</h1>
				</header>
				<aside>
					<code>
					   schedule 1: {JSON.stringify(this.state.schedules[0])} <br />
					   schedule 2: {JSON.stringify(this.state.schedules[1])} <br />
					   schedule 3: {JSON.stringify(this.state.schedules[2])} <br />
					</code>
					<div>
						<p>Earliest availability is <span>{this.state.earliest}.</span></p>
					</div>

				</aside>
				<section className="utility-input">
					<h2>Simple UI to test calendar utilities in <pre>/utilities/schedule-utilities.js</pre></h2>
					<p>Finding earliest available start time based on mulitple schedules and meeting duration.</p>
					<p>Availability Window (default 6:00-20:00)</p>

					<div>
						<label htmlFor="windowStart">Availability Start</label>
						<select defaultValue={this.state.windowStart} disabled id="windowStart" onChange={this.handleWindowStart}>
							<option value="6:00">6:00</option>
							<option value="6:30">6:30</option>
							<option value="7:00">7:00</option>
							<option value="7:30">7:30</option>
							<option value="8:00">8:00</option>
							<option value="8:30">8:30</option>
							<option value="9:00">9:00</option>
							<option value="9:30">9:30</option>
							<option value="10:00">10:00</option>
							<option value="10:30">10:30</option>
							<option value="11:00">11:00</option>
						</select>
					</div>

					<div>
						<label htmlFor="windowEnd">Availability End</label>
						<select defaultValue={this.state.windowEnd} disabled id="windowEnd" onChange={this.handleWindowEnd}>
							<option value="16:00">16:00</option>
							<option value="16:30">16:30</option>
							<option value="17:00">17:00</option>
							<option value="17:30">17:30</option>
							<option value="18:00">18:00</option>
							<option value="18:30">18:30</option>
							<option value="19:00">19:00</option>
							<option value="19:30">19:30</option>
							<option value="20:00">20:00</option>
							<option value="20:30">20:30</option>
							<option value="21:00">21:00</option>
						</select>
					</div>

					<div>
						<label htmlFor="eventDuration">Set duration of event in minutes</label>
						<input min="0" max='1440' type="number" id="eventDuration" onChange={this.handleInputChange} />
						<button onClick={this.getTime}>
							Check Earliest Availability
						</button>
					</div>
				</section>
			</article>
		);
	}
}

Calendar.displayName = 'Calendar';

export default Calendar;
