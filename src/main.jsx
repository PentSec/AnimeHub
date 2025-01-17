import { createRoot } from 'react-dom/client'
import '@/assets/css/tailwind.css'
import AnimeHub from '@/AnimeHub'
import { HeroUIProvider } from "@heroui/react"

createRoot(document.getElementById('root')).render(
    <HeroUIProvider>
        <AnimeHub />
    </HeroUIProvider>
)
