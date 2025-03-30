import React from "react"
import { cn } from "@/lib/utils"
import { FaTwitter } from "react-icons/fa"

export function TestimonialCard({ author, text, href, className }) {
  return (
    <div className={cn(
      "flex w-[300px] flex-col gap-4 rounded-xl border p-6 shadow-sm",
      "bg-card text-card-foreground",
      "hover:shadow-md transition-shadow duration-300",
      className
    )}>
      <p className="flex-1 text-sm leading-normal text-muted-foreground">
        "{text}"
      </p>
      
      <div className="flex items-center gap-3">
        <img 
          src={author.avatar} 
          alt={author.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        
        <div className="flex flex-col">
          <p className="text-sm font-medium leading-none">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.handle}</p>
        </div>
        
        {href && (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <FaTwitter className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

export const TestimonialAuthor = {
  name: "",
  handle: "",
  avatar: ""
} 