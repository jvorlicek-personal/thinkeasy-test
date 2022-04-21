export interface question {
    id: number,
    label: string,
    question: string,
    position: Number,
}

export interface answer {
    questionId: number,
    answer: string,
    position: number,
}