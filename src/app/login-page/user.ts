export class User {
    constructor(
        public username: string,
        public permissions: string[],
        private _authToken: string
    ) { }

    get authToken(){
        return this._authToken;
    }
}

