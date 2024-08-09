"use client"

import { Member, Profile } from "@prisma/client"

interface ChatItemProps{
    id:string ;
    content:string ;
    member:Member & {
        profile:Profile
    };
    timestamp:string;
    fileurl:string | null;
    deleted:boolean;
    currentMember:Member;
    isUpdated:boolean;
    socketUrl:string ;
    socketQuery:Record<string ,string>;

}
export const ChatItem = ({
    id ,content ,member, timestamp,
    fileurl, deleted , currentMember,
    isUpdated ,socketQuery,socketUrl
}:ChatItemProps)=>{
    
    return (
    <div>

    </div>
    )
}