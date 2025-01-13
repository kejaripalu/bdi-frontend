export class User {

    constructor(public token: string, public tokenExpirationDate: Date) { };

    getToken(): string {
        if (!this.token || new Date() > this.tokenExpirationDate) {
            return null as any;
        }
        return this.token;
    }

}