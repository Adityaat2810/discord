"use client"
import { ServerWithMembersWithProfiles } from '@/types';
import { ChannelType, MemeberRole } from '@prisma/client';
import React from 'react'
import { ActionTooltip } from '../action-tooltip';
import { Plus, Settings } from 'lucide-react';
import { useModal } from '@/hooks/use-model-state';

interface severSectionProps{
    label:string;
    role?:MemeberRole;
    sectionType:"channels"|"members"
    channelType?:ChannelType
    server?:ServerWithMembersWithProfiles
}

function ServerSection({
    label,
    role,
    sectionType,
    channelType,
    server
}:severSectionProps) {
  
  const {onOpen}=useModal()
  return (
    <div className='flex items-center justify-between py-2'>
        <p className='text-xs uppercase font-semibold text-zinc-500
         dark:text-zinc-400' >
            {label}
        </p>

        {role !== MemeberRole.GUEST && sectionType==="channels" &&(
            <ActionTooltip label='Create channel' side='top'>
                <button 
                onClick={()=>onOpen('createChannel',{channelType})}
                className='text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300
                transition'>
                    <Plus className='h-4 w-4'/>
                </button>
            </ActionTooltip>
        )}


        {role===MemeberRole.ADMIN && sectionType=="members"&&(
            <ActionTooltip label='Manage members' side='top'>
              <button 
              onClick={()=>onOpen('members',{server})}
              className='text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300
              transition'>
                  <Settings className='h-4 w-4'/>
              </button>
            </ActionTooltip>
        )}
       
    </div>
  )
}

export default ServerSection