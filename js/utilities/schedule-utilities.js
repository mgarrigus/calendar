export function findAvailability (schedule = []) {
    const availability = [];
    const begin = schedule[0] && schedule[0][0];
    const end = schedule[schedule.length - 1] && schedule[schedule.length - 1][1];

    if (schedule.length <= 1) {
      return schedule;
    }

    if (begin !== '06:00') {
      availability.push(['06:00', begin]);
    }

    schedule.forEach((curr, i) => {
      const prev = schedule[i - 1];
      const isTimeBetween = prev && prev[1] !== curr[0];

      if (i > 0 && isTimeBetween) {
       availability.push([prev[1], curr[0]]);
      }
    });

    if (end !== '20:00') {
      availability.push([end, '20:00']);
    }

    return availability;
}


export function findIntersection (a, b) {
  const min = (a[0] < b[0]) ? a : b;
  const max = (min === a) ? b : a;

  if (min[1] < max[0]) return null;

  return [max[0], (min[1] < max[1]) ? min[1] : max[1]];
}


export function intersectSchedules (schedule1, schedule2) {
  const result = [];

  schedule1.forEach(event1 => {
    schedule2.forEach(event2 => {
      const intersection = findIntersection(event1, event2);

      if (intersection) {
        result.push(intersection);
      }
    });
  });

  return result;
}


export function removeConflicts (schedules) {
  const res = [];

  return schedules.reduce((openSlots, schedule) => {
    const open = findAvailability(schedule);

    return intersectSchedules(openSlots, open);
}, [['06:00', '20:00']]);

  return res;
}


export function getEventDuration (range) {
  let minutes = 0;

  const start = range[0];
  const end = range[1];
  const startParts = start.split(':');
  const endParts = end.split(':');
  const startHour = +startParts[0];
  const endHour = +endParts[0];
  const startMins = +startParts[1];
  const endMins = +endParts[1];

  if (startHour !== endHour) {
    const hrMins = (endHour - startHour) * 60;
    minutes += hrMins;
  }

  if (startMins !== endMins) {
    minutes += (endMins - startMins)
  }

  return minutes;
}


export function getStartTime (schedules, duration) {
  const overlapRanges = removeConflicts(schedules);
  const available = overlapRanges.find(range => getEventDuration(range) >= duration);

  return available && available[0] || null;
}
