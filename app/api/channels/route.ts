import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { MemeberRole } from "@prisma/client";
import { NextResponse } from "next/server"
export const runtime = 'experimental-edge'

export async function POST(
    req:Request
){
    try{
        const profile = await currentProfile();
        const {name ,type}=  await req.json()
        const {searchParams}=new URL(req.url)

        const serverId = searchParams.get("serverId")
        if(!profile){
            return new NextResponse("Unauthorized ",{status:401})
        }

        if(!serverId){
            return new NextResponse("Server Id missing", {status:400})
        }

        if( name ==="general"){
            return new NextResponse("Name cannot be general ",{status:400})

        }

        const server = await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemeberRole.ADMIN,MemeberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
              channels:{
                create:{
                    profileId:profile.id,
                    name,
                    type
                }
              }  
            }
        })

        return NextResponse.json(server)

    }catch(error){
        console.log("[POST_CHANNEL]",error)
        return new NextResponse("Internal Error ",{status:500})
    }
}