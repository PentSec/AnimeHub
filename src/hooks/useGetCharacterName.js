import { useState, useEffect } from 'react'

const DRAGONBALL_API_URL = 'https://dragonball-api-two.vercel.app/api/filter'

const useGetCharacterName = () => {
    const AVATAR_URL = 'https://dragonball-api-two.vercel.app/'
    const [heroesData, setHerosData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let fetchCount = 0

        const fetchData = async () => {
            try {
                fetchCount++
                console.log(`Fetch count: ${fetchCount}`)
                setIsLoading(true)
                const response = await fetch(DRAGONBALL_API_URL)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data?.message || 'Error al obtener los datos')
                }
                setHerosData(mapCharacterData(data))
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return { heroesData, error, isLoading, AVATAR_URL }
}

function mapCharacterData(apiData) {
    return apiData.map((character) => ({
        id: character.id,
        name: character.name,
        category: character.category,
        deathDate: character.death_date,
        debut: {
            manga: character.debut?.manga,
            volume: character.debut?.volume,
            anime: character.debut?.anime,
            arc: character.debut?.arc,
            saga: character.debut?.saga
        },
        family: character.family,
        gender: character.gender,
        japaneseName: character.names?.japanese,
        latinName: character.names?.latin,
        otherNames: character.names?.other_names,
        occupation: character.occupation,
        origin: character.origin,
        residence: character.residence,
        species: character.species,
        image: character.image,
        url: character.url
    }))
}

export { useGetCharacterName }
