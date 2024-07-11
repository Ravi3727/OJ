import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        username?:string;
        isProblemSetter?:boolean;
        Admin?:boolean;
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            username?:string;
            isProblemSetter?:boolean;
            Admin?:boolean;
        } & DefaultSession['user']
    }
}



declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        isVerified?:boolean;
        username?:string;
        isProblemSetter?:boolean;
    }
}