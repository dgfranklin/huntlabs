/**
 * Created by dgfranklin on 8/15/16.
 */

export enum CourseKind {
  Normal,
  Science,
}

export enum CourseLunchBlock {
  AB,
  BC,
}

export class Course {
  constructor(
    public dayNumber: number,
    public name: string,
    public kind: CourseKind,
    public lunch: CourseLunchBlock
  ) {}
}
