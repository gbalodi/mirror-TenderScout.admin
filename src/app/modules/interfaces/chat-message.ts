export interface IChatMessage {
    id: number;
    body: string;
    created_at: string;
    admin: boolean;
    user: any;
    attachments: Array<any>;
}