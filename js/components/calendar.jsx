import React from 'react';
import { getStartTime } from '../utilities/schedule-utilities';

export class Calendar extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
            schedules: [
				[
	                ['08:00', '09:30'], ['11:00', '13:00'], ['14:00', '15:30']
	            ],
				[
	                ['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']
	            ],
	            [
	                ['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']
	            ]
			]
        };
	}

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			duration: value
		});
	}

	getTime = () => {
		const earliest = getStartTime(this.state.schedules, this.state.duration);

		this.setState({
			earliest
		});
	}

	render () {
		const { shedules } = this.props;

		return (
			<article className="calendar">
				<section className="utility-input">
					<div>
						<code>
						   {this.state.schedules}
						</code>
					</div>
					<div>
						<label htmlFor="eventDuration">Set Duration in minutes</label>
						<input type="number" id="eventDuration" onChange={this.handleInputChange} />
						<button onClick={this.getTime}>
							Check Earliest Availability
						</button>
						{this.state.earliest}
					</div>
				</section>
			</article>
		);
	}
}

Calendar.displayName = 'Calendar';

export default Calendar;
