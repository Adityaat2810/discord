import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
export const runtime = 'experimental-edge'


interface serverIdPageProps{
  params:{
    serverId:string
  }
}

const ServerIdPage = async({params}:serverIdPageProps) => {
  const profile = await currentProfile()

  if(!profile){
    return auth().redirectToSignIn()
  }
  // we will redirect the user to general channel of first 
  //server of which he is a part 

  const server = await db.server.findUnique({
    where:{
      id:params.serverId,
      members:{
        some:{
          profileId:profile.id
        }
      }
    },
    include:{
      channels:{
        where:{
          name:"general"
        },
        orderBy:{
          createdAt:"asc"
        }
      }
    }
  });

  const initalChannel = server?.channels[0]
  if(initalChannel?.name != "general"){
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initalChannel?.id}`)

}

export default ServerIdPage