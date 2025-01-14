export class User {

    constructor(public token: string, public tokenExpirationDate: Date, public username: string) { };

    getToken(): string {
        if (!this.token || new Date() > this.tokenExpirationDate) {
            return null as any;
        }
        return this.token;
    }

}