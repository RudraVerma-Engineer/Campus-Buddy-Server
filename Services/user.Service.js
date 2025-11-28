import { User } from "../model/user.model.js";

export async function createUser({
    firstname, lastname, email, username, password
}){
    if(!firstname || !email || !password || !username){
        throw new Error("All Fields required error from service");
    }
    try {
        const user = await User.create({
            fullname:{
                firstname,
                lastname
            },
            username,
            email,
            password
        })
        return user;
        
    } catch (err) {
        return err.message;
    }
}