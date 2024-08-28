import { Container } from "@/components/ui"
import { useArtist } from "@/hooks/api/artists"

export const Home = () => {
  const { data } = useArtist("0TnOYISbd1XYRBk9myaseg")

  console.log(data)

  return (
    <Container className="h-full divide-y p-0">
      <div className="flex h-full flex-col items-center justify-center gap-16 px-6 py-4">
        <img src="/logo.webp" width={260} height={101} alt="Pergam.in logo" />
      </div>
    </Container>
  )
}
