import { motion } from 'framer-motion'
import { HeroesContainer } from '@/components'

function AnimeHub() {
    return (
        <motion.div
            className="grid min-h-[100vh] grid-rows-[auto_1fr_auto] w-screen"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <header></header>
            <div className="flex items-center justify-center w-full h-auto">
                <main className="flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center max-w-[1280px] p-4 text-center ">
                    <HeroesContainer />
                </main>
            </div>
            <footer className="p-0 text-center bg-zinc-900"></footer>
        </motion.div>
    )
}

export default AnimeHub
