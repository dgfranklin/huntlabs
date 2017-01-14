import { Course } from './types/course';
import { ScheduleDay } from './types/schedule';
import * as CalendarTypes from './types/Calendar';

/** 
  * Statically initializes a matrix such that result[period][cycleNumber] corresponds to
  * course id. (Sometimes referred to as a "block" like "a block") 
  *
  * The values of these IDs are pretty arbitrary and are only valuable in so
  * far as given a course, period, and cycleNumber, we can determine all the
  * other periods and cyclesNumbers that course appears at.
  */
const cyclePermutation: number[][] = (() => {
    // Day One serves as a base case, providing the starting indices that 
    // subsequent cycle days modify.
    let dayOneCourseIndices = [0,3,6,4,7,2];
    // Generate the full 6 by 8 matrix map to courses. For a fixed period, the
    // course index increases by one for each day.
    return dayOneCourseIndices.map((startCourseIndex) => {
        let courseRow: number[] = [];
        for (let i = 0; i < 8; i++) {
            courseRow[i] = (i + startCourseIndex) % 8;
        }
        return courseRow;
    });
    /* TODO: Drops here? Or below. */
})();


/** 
 * Return a mapping from a cycle day to the courses. 
 * @param courses A length 8 array providing the period four course for each
 * day.
 */
function makeCycleMapping(courses: Course[]): Course[][] {
    // Creates array such that courseIdMap[courseId] = course;
    const courseIdMap: Course[] = [];
    cyclePermutation[4].map((id, index) => courseIdMap[id] = courses[index]);
    // TODO: We probably want some sanity check to ensure that there are no holes. 
    return cyclePermutation.map(row => row.map(courseId => courseIdMap[courseId]));
}

// function makeSchedule(cycleMapping: CycleMapping, schedule: CalendarTypes.Calendar): ScheduleDay[] {
//     return []
// }