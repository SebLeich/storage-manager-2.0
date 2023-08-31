export interface IConfirmationInput {
    headline: string;
    closeStatus: 'CLOSABLE' | 'DISABLED' | 'HIDDEN';
    html: string;
    maxWidth: number;
}