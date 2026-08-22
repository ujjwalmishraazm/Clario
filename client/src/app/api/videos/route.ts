import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { videoSchema } from "@/lib/zod/videoSchema";
import { createvideo, getVideo } from "@/services/video.service";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    console.log(user)

    const data = await request.json();
    console.log(data)

    const validatedData = videoSchema.safeParse(data);

    if (!validatedData.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid video data",
        },
        { status: 400 }
      );
    }

    const video = await createvideo({
      userId: user.id,
      youtubeUrl: validatedData.data.youtubeUrl,
    });

    return Response.json(
      {
        success: true,
        data: video,
      },
      { status: 201 }
    );
  } catch (error) {
      console.error("POST /api/videos error:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}


export async function GET(request:NextRequest){
try {
      const user = getAuthenticatedUser(request)
      if(!user){
            return Response.json({success:false,message:"not autheticted"},{status:401})
      }
      const userId = user.id
      const videos = await getVideo(userId)
     
      return Response.json({success:true,videos},{status:200})
} catch (error) {
      return Response.json({success:false,message:"internal server error"},{status:500})
}
}



