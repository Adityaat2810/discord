import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import ServerHeader from './server-header';
import { ScrollArea } from '../ui/scroll-area';
import { ServerSearch } from './server-search';
import { channel } from 'diagnostics_channel';
import { ChannelType, MemeberRole } from "@prisma/client";
import { Divide, Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { SelectSeparator } from '../ui/select';
import { Separator } from '../ui/separator';
import ServerSection from './server-section';
import ServerChannel from './server-channel';
import ServerMember from './server-member';

interface ServerSidebarProps{
    serverId:string;
}

const iconMap={
    [ChannelType.TEXT]:<Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]:<Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]:<Video className="mr-2 h-4 w-4"/>

}

const roleIconMap={
    [MemeberRole.GUEST]:null,
    [MemeberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
    [MemeberRole.ADMIN]:<ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>,


}

const ServerSideBar=async({
    serverId
}:ServerSidebarProps)=> {

    const profile = await currentProfile()
    if(!profile){
        redirect('/');
    }

    
    const server = await db.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channels:{
               orderBy:{
                createdAt:"asc"
               } 
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"asc"
                }
            }
        }
    });

    const textChannels =server?.channels.filter(
        (channel)=>channel.type===ChannelType.TEXT
    )

    const audioChannels =server?.channels.filter(
        (channel)=>channel.type===ChannelType.AUDIO
    )

    const videoChannels =server?.channels.filter(
        (channel)=>channel.type===ChannelType.VIDEO
    )

      // excluding ourself from memebers
    const memebers = server?.members.filter((member)=>member.profileId !== profile.id)

    if(!server){
        redirect('/')
    }
    const role = server.members.find((member)=>member.profileId === profile.id)?.role

    

  
    return (
        <div className='flex flex-col h-full text-primary w-full 
        dark:bg-[#2b2d31] bg-[#f2f3f5]'>
            {/* Server herader */}
           <ServerHeader
             server ={server}
             role={role}
            />

            <ScrollArea className='flex-1 px-3'>
                {/* Server search */}
                <div className='mt-2'>
                    <ServerSearch 
                        data={[
                            {
                                label:"Text Channels",
                                type:"channel",
                                data:textChannels?.map((channel)=>({
                                    id:channel.id,
                                    name:channel.name,
                                    icon:iconMap[channel.type],

                                }))
                            },

                            {
                                label:"Voice Channels",
                                type:"channel",
                                data:audioChannels?.map((channel)=>({
                                    id:channel.id,
                                    name:channel.name,
                                    icon:iconMap[channel.type],
                                    
                                }))
                            },

                            {
                                label:"Video Channels",
                                type:"channel",
                                data:videoChannels?.map((channel)=>({
                                    id:channel.id,
                                    name:channel.name,
                                    icon:iconMap[channel.type],
                                    
                                }))
                            }
                            ,

                            {
                                label:"Members",
                                type:"member",
                                data:memebers?.map((member)=>({
                                    id:member.id,
                                    name:member.profile.name,
                                    icon:roleIconMap[member.role],
                                    
                                }))
                            }
                        ]}
                    />
                </div>

                {/* Render channels */}
                <Separator className='bg-zinc-200 dark:bg-zinc-700  rounded-md my-2'/>
                {/* if lenght is positive number it return true  */}
                {!!textChannels?.length && (
                    <div className='mb-2'>
                        <ServerSection 
                          sectionType='channels'
                          channelType={ChannelType.TEXT}
                          role={role}
                          label="Text Channels"
                        />

                        {textChannels.map((channel)=>(
                            <ServerChannel
                              key ={channel.id}
                              server={server}
                              channel={channel}
                              role={role}
                            />
                        ))}


                    </div>
                )}

                {!!audioChannels?.length && (
                    <div className='mb-2'>
                        <ServerSection 
                          sectionType='channels'
                          channelType={ChannelType.AUDIO}
                          role={role}
                          label="Voice Channels"
                        />

                        {audioChannels.map((channel)=>(
                            <ServerChannel
                              key ={channel.id}
                              server={server}
                              channel={channel}
                              role={role}
                            />
                        ))}


                    </div>
                )}

                {!!videoChannels?.length && (
                    <div className='mb-2'>
                        <ServerSection 
                          sectionType='channels'
                          channelType={ChannelType.VIDEO}
                          role={role}
                          label="Video Channels"
                        />

                        {videoChannels.map((channel)=>(
                            <ServerChannel
                              key ={channel.id}
                              server={server}
                              channel={channel}
                              role={role}
                            />
                        ))}


                    </div>
                )}


                {!!memebers?.length && (
                    <div className='mb-2'>
                        <ServerSection 
                          sectionType='members'
                          role={role}
                          label="Members"
                          server={server}
                        />

                        {memebers.map((member)=>(
                            <ServerMember
                              key={member.id}
                              member={member}
                              server={server}
                            />
                        ))}


                    </div>
                )}

            </ScrollArea>
        </div>
    )
}

export default ServerSideBar