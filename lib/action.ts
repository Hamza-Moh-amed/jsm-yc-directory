"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    
    
    const session = await auth()

    if(!session) return parseServerActionResponse({error: "not signed in", status: "ERROR"})

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try {

        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
        }

        const result = await writeClient.create({_type: "startup", ...startup})

        return parseServerActionResponse({...result, error: "", status: "SUCCESS"})
        
    } catch (error) {
        return parseServerActionResponse({error: JSON.stringify(error), stats: "ERROR"})
    }
}



export async function incrementStartupViews(id: string) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid startup ID");
  }

  try {
    const result = await writeClient
      .patch(id)
      .inc({ views: 1 })
      .commit();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error incrementing startup views:", error);

    throw new Error("Failed to increment startup views");
  }
}