export enum CourseKind {
  Normal,
  Science,
}

export enum CourseLunchBlock {
  AB,
  BC,
}

export interface Course {
    cycleNumber: number,
    name: string,
    kind: CourseKind,
    lunch: CourseLunchBlock
}