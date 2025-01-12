export class User {

    constructor(public token: string) { };

    getToken(): string {
        if (!this.token) {
            return null as any;
        }
        return this.token;
    }

}