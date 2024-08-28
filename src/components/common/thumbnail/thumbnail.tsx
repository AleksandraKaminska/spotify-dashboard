import { Image } from "lucide-react"

interface ThumbnailProps {
  src?: string | null
  alt?: string
}

export const Thumbnail = ({ src, alt }: ThumbnailProps) => {
  return (
    <div className="flex h-8 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-ui-bg-component">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Image className="text-ui-fg-subtle" />
      )}
    </div>
  )
}
