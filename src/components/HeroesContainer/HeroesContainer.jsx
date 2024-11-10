import { Card, Image, ScrollShadow, Spinner, Tooltip } from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { useGetCharacterName } from '@/hooks/useGetCharacterName'
import { HeroesInfo, SearchHero } from '@/components'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionCard = motion.create(Card)

const cardVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
}

function HeroesContainer() {
    const { heroesData, error, isLoading, AVATAR_URL } = useGetCharacterName()
    const [itemToShow, setItemToShow] = useState(10)
    const [searchHeroes, setSearchHeroes] = useState('')
    const [showHeroesInfo, setShowHeroesInfo] = useState(false)
    const [selectedHero, setSelectedHero] = useState(null)

    const handleShowHeroesInfo = (hero) => {
        console.log('Selected hero:', hero)
        setSelectedHero(hero)
        setShowHeroesInfo(true)
    }
    const handleCloseHeroesInfo = () => {
        setShowHeroesInfo(false)
    }

    const filteredHeros =
        heroesData?.filter((hero) =>
            hero?.name?.toLowerCase().includes(searchHeroes.toLowerCase())
        ) || []

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }

    const hasMore = itemToShow < filteredHeros.length

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main className="relative w-full">
            <SearchHero value={searchHeroes} changeValue={setSearchHeroes} />
            <ScrollShadow
                className="h-[calc(85vh-32px)] overflow-auto p-12 gap-4"
                ref={scrollerRef}
            >
                <div className="grid grid-cols-3 gap-4 p-2 mb-4 lg:grid-cols-6">
                    {filteredHeros.slice(0, itemToShow).map((hero) => (
                        <AnimatePresence key={hero.id}>
                            <Tooltip color="secondary" content={hero.name}>
                                <MotionCard
                                    isHoverable
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.2, delay: hero.id * 0.1 }}
                                    shadow="md"
                                    key={hero.id}
                                    onPress={() => handleShowHeroesInfo(hero)}
                                    isPressable
                                    className="items-center content-center justify-center"
                                >
                                    <Image
                                        isZoomed
                                        radius="none"
                                        width="100%"
                                        height="100%"
                                        alt={hero.name}
                                        src={AVATAR_URL + hero.image || 'fallback.jpg'}
                                        className="object-cover w-full h-full max-w-[200px] max-h-[200px]"
                                    />
                                </MotionCard>
                            </Tooltip>
                        </AnimatePresence>
                    ))}
                </div>
                {hasMore && (
                    <div className="flex justify-center w-full">
                        <Spinner ref={loaderRef} color="white" />
                    </div>
                )}
            </ScrollShadow>
            {showHeroesInfo && selectedHero && (
                <HeroesInfo
                    hero={selectedHero}
                    onClose={handleCloseHeroesInfo}
                    avatar={AVATAR_URL}
                />
            )}
        </main>
    )
}

export default HeroesContainer
