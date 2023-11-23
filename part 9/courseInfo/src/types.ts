export interface totalExercises {
    totalExercises: number;
}

export interface courseName {
    name: string
}


interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description? :string
}


interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

export interface ContentProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    part:CoursePart;
}