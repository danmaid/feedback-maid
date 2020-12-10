import FeedbackMaid from './FeedbackMaid.vue'

export default FeedbackMaid

export type Target = {
    selector: string;
    offsetX: number;
    offsetY: number;
}

export interface Feedback {
    readonly id?: number;
    url: string;
    target: Target;
    comments?: string[];
}
