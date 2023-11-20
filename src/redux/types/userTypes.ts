export interface UserStateI {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    photo: string;
    token: string;
    loggedIn: boolean;
    loading: boolean;
    discount: number;
}
