"use client"

import { useActionState, useState } from "react"
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false }
  );

import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from "zod"
import { toast } from "@/components/ui/toast"


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("");
    
    const handleFormSubmit =  async (prevState: any, formData: FormData) => {

        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                pitch,
            }
           

                 await formSchema.parseAsync(formValues)

                console.log(formValues)

                // const result = await createIdea(prevState, formData, pitch)
                // console.log(results)

            
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = z.flattenError(error).fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                return { ...prevState, error: "Validation Failed", status: "ERROR" };
            }

            return {...prevState, error: "An unexpected error has occurred", status: "ERROR"}
                
        } 
        
    }
    const [state, formAction, isPending ] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"})

  return (
    <form action={formAction} className="startup-form">
        <div>
        <label htmlFor="title" className="startup-form_label!">
            Title
        </label>
        <Input
        id="title"
        name="title"
        className="startup-form_input!"
        required
        placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
        <label htmlFor="title" className="startup-form_label!">
            Description
        </label>
        <Textarea
        id="description"
        name="description"
        className="startup-form_textarea!"
        required
        placeholder="Startup Description"
        />
        {errors.description && <p className="startup-form_error!">{errors.description}</p>}
        </div>

        <div>
        <label htmlFor="title" className="startup-form_label!">
            Category
        </label>
        <Input
        id="category"
        name="category"
        className="startup-form_input!"
        required
        placeholder="Startup Category e.g: (Tech, Health, Education)"
        />
        {errors.category && <p className="startup-form_error!">{errors.category}</p>}
        </div>

        <div>
        <label htmlFor="title" className="startup-form_label!">
            Image Url
        </label>
        <Input
        id="link"
        name="link"
        className="startup-form_input!"
        required
        placeholder="Startup Image Url"
        />
        {errors.link && <p className="startup-form_error!">{errors.link}</p>}
        </div>


        <div data-color-mode="light" >
        <label htmlFor="pitch" className="startup-form_label!">
            Pitch
        </label>
        <MarkdownEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        id='pitch'
        height="300px"
        style={{borderRadius: 20, overflow: 'hidden'}}
        placeholder="Brifely descripe your idea and what problem does is solve"
        previewProps={{disallowedElements: ["style"]}}
        />
        {errors.pitch && <p className="startup-form_error!">{errors.pitch}</p>}
        </div>

        <Button 
            type="submit" 
            className="startup-form_btn! cursor-pointer! text-white!" 
            disabled={isPending}
        >
            {isPending ? "Submitting..." : "Submit your pitch"}
            <Send className="size-6 ml-2" />
        </Button>

    </form>
  )
}

export default StartupForm