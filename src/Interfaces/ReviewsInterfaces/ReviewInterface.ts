export interface ReviewInterface{
    id: string;
    score: number;
    text: string;
    userName: string;
    targetType: string;
    targetTitle: string;
    createdAt: string;
    isEdited: boolean;
}