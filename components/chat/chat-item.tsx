"use client"

import { Member, MemeberRole, Profile } from "@prisma/client"
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { FileIcon, ShieldAlert, ShieldCheck } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const RoleIconMap={
    "GUEST":null,
    "MODERATOR":<ShieldCheck className="w-4 h-4 ml-2 text-indigo-500"/>,
    "ADMIN":<ShieldAlert className="w-4 h-4 ml-2 text-rose-500"/>,
}

export const ChatItem = ({
    id ,content ,member, timestamp,
    fileurl, deleted , currentMember,
    isUpdated ,socketQuery,socketUrl
}:ChatItemProps)=>{

    const [isEditing , setIsEditing]= useState(false)
    const [isDleteing, setIsDeleteing ]= useState(false)

    const fileType = fileurl?.split(".").pop();

    const isAdmin = currentMember.role === MemeberRole.ADMIN;
    const isModerator = currentMember.role === MemeberRole.MODERATOR;
    const isOwner = currentMember.id === member.id ;
    const canDeleteMessage = !deleted && ( isAdmin || isModerator
        || isOwner
    )
    const canEditMessage = !deleted && isOwner && !fileurl
    const isPdf = fileType==="pdf" && fileurl

    const isImage = !isPdf &&  fileurl;


    return (
        <div className="relative group flex items-center
        hover:bg-black/5 p-4 trasition w-full ">
            <div className="group flex gap-x-2 items-start
            w-full ">
                <div className="cursor-pointer hover:drop-sgadow-md 
                transition ">
                    <UserAvatar src={member.profile.imageUrl}/>
                </div>

                <div className="flex flex-col w-full ">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline
                            cursor-pointer">
                                {member.profile.name}
                            </p>

                            <ActionTooltip label={member.role}>
                               {RoleIconMap[member.role]}
                            </ActionTooltip>

                            <span className="text-xs text-zinc-500
                            dark:text-zinc-400 ">
                                {timestamp}
                            </span>
                        </div>

                      

                    </div>
                    {
                          isImage && (
                            <a 
                             href={fileurl}
                             target="_blank"
                             rel="noopener noreferer"
                             className="relative aspect-square rounded-md
                             mt-2 overflow-hidden border flex items-center
                             bg-secondary h-48 w-48"
                            >
                                <Image 
                                   src={fileurl} 
                                   alt={content}
                                   fill
                                   className="object-cover"
                                />

                            </a>
                            )
                        }

                        {isPdf && (
                             <div className="relative flex items-center
                             p-2 mt-2 rounded-md bg-background/10 ">
                                 <FileIcon className="h-10 w-10 fill-indigo-200
                                 stroke-indigo-400 "/>
                                 <a 
                                   href={fileurl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="ml-2 text-sm text-indigo-500
                                   dark:text-indigo-400 hover:underline"
                                 >
                                     PDF FILE
                                 </a>
                 
                                
                 
                             </div>
                        )}

                        {!fileurl && !isEditing &&(
                            <p className= {cn(
                                "text-sm text-zinc-600 dark:text-zinc-300",
                                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                            )}
                            >
                               {content} 
                               {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500
                                 dark:text-zinc-400">
                                    (edited)
                                </span>
                               )}
                            </p>
                        )}
                </div>
            </div>

        </div>
    )
}