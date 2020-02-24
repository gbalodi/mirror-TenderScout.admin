export interface IChatMessage {
    id: number;
    body: string;
    created_at: string;
    user: any;
    attachments: Array<any>;
    replier: boolean;
}