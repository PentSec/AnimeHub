import { createRoot } from 'react-dom/client'
import '@/assets/css/tailwind.css'
import AnimeHub from '@/AnimeHub'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <AnimeHub />
    </NextUIProvider>
)
