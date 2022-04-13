import {
    findAvailability,
    getEventDuration,
    intersectSchedules,
    findIntersection,
    removeConflicts,
    getStartTime
} from '../schedule-utilities.js';

let mockSchedules = [];

describe('Schedule utilities', () => {
    beforeEach(() => {
        mockSchedules = [
            [
                ['08:00', '09:30'], ['11:00', '13:00'], ['14:00', '15:30']
            ],
            [
                ['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']
            ],
            [
                ['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']
            ]
        ];
    });

	describe('findAvailability()', () => {
		it('should return available times from a given schedule', () => {
            const result = findAvailability(mockSchedules[0]);
            const availability = [["06:00", "08:00"], ["09:30", "11:00"], ["13:00", "14:00"], ["15:30", "20:00"]];

            expect(result).toEqual(availability);
		});
	});

    describe('getEventDuration()', () => {
		it('should return event length in minutes', () => {
            const result = getEventDuration(mockSchedules[1][1]); // ['14:00', '16:30']
            const expected = 150;

            expect(result).toEqual(expected);
		});
	});

    describe('intersectSchedules()', () => {
		it('should return times available from 2 availability schedules', () => {
            const availability1 = [["07:00", "08:00"], ["09:30", "11:00"], ["13:00", "14:00"], ["15:30", "20:00"]];
            const availability2 = [["07:00", "10:00"], ["13:00", "15:00"]];
            const result = intersectSchedules(availability1, availability2);
            const expected = [["07:00", "08:00"], ["09:30","10:00"], ["13:00", "14:00"]];

            expect(result).toEqual(expected);
		});
	});

    describe('findIntersection()', () => {
		it('find conflicts', () => {
            const result = findIntersection(["07:00", "07:30"], ["07:00", '08:00']);
            const expected = ["07:00", "07:30"];

            expect(result).toEqual(expected);
		});
	});

    describe('removeConflicts()', () => {
		it('should return times available across multiple schedules', () => {
            const result = removeConflicts(mockSchedules);
            const expected =  [["06:00", "08:00"], ["13:00", "14:00"], ["16:30", "17:00"], ["17:30", "17:45"], ["19:00", "20:00"]];

            expect(result).toEqual(expected);
		});
	});

    describe('getStartTime()', () => {
		it('should return null if start time is not available across all schedules', () => {
            const result = getStartTime(mockSchedules, "10:00");
            const expected =  null;

            expect(result).toEqual(expected);
		});

        it('should return earliest start time available across all schedules', () => {
            const result = getStartTime(mockSchedules, 45);
            const expected =  "06:00";

            expect(result).toEqual(expected);
		});
	});
});
