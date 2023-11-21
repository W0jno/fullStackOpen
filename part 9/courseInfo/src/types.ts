export interface totalExercises {
    totalExercises: number;
}

export interface courseName {
    name: string
}

interface CoursePart {
    name: string,
    exerciseCount: number
}


export interface ContentProps {
    courseParts: CoursePart[];
}