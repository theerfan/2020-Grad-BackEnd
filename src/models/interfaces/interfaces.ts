
export interface AutUserCond {
    studentNumber?: string,
    autMail?: string
}

export interface TarinCategoryCond {
    title?: string
}

export interface QuestionCond {
    phrase?: string
}

export interface VoteCond {
    category?: string,
    caster?: string,
    target?: string
}

export interface CommentCond {
    a: string;
}