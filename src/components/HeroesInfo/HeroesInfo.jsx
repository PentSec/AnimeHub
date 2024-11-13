import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ModalContent,
    Link,
    Image,
    Card,
    CardBody,
    Divider
} from '@nextui-org/react'

function HeroesInfo({ onClose, hero, avatar }) {
    if (!hero) return null

    const processDebutField = (fieldValue) => {
        if (!fieldValue) return []

        const labels = [
            'Película',
            'Anime',
            'Manga',
            'Videojuego',
            'Novela ligera',
            'Arc',
            'Volume'
        ]
        const regex = new RegExp(`(${labels.join('|')})\\s*:\\s*`, 'g')

        if (!regex.test(fieldValue)) {
            return [
                {
                    label: null,
                    value: fieldValue.trim()
                }
            ]
        }

        const formattedField = fieldValue.replace(regex, '\n$1: ').trim()

        return formattedField.split('\n').map((line) => {
            const [label, ...rest] = line.split(':')
            return {
                label: label.trim(),
                value: rest.join(':').trim()
            }
        })
    }

    const processFamilyField = (familyValue) => {
        if (!familyValue) return []

        const familyMembers = familyValue.split(/\)\s*/g).map((member) => member.trim())

        return familyMembers
            .filter((member) => member)
            .map((member) => {
                const match = member.match(/^(.*?)\s*(\((.*?)\))?$/)
                return {
                    name: match ? match[1].trim() : member.trim(),
                    details: match && match[3] ? match[3].trim() : null
                }
            })
    }

    return (
        <Modal
            scrollBehavior="inside"
            backdrop="blur"
            size="5xl"
            isOpen={true}
            onClose={onClose}
            classNames={{
                body: 'py-6',
                base: 'bg-[#19172c] dark:bg-[#0d1117] text-[#a8b0d3]',
                header: 'border-b-[1px]',
                footer: 'border-t-[1px]',
                closeButton: 'hover:bg-white/5 active:bg-white/10'
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center justify-center gap-1">
                            {hero.name && <h1 className="text-2xl font-bold">{hero.name}</h1>}
                        </ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                                <Card>
                                    <CardBody>
                                        <div className="text-tiny lg:text-medium">
                                            <p className="">NOMBRES</p>
                                            <Divider />
                                            <ul>
                                                {[
                                                    {
                                                        label: 'Categoría',
                                                        value: hero.category
                                                    },
                                                    {
                                                        label: 'Japones',
                                                        value: hero.japaneseName
                                                    },
                                                    {
                                                        label: 'Japones Latino',
                                                        value: hero.latinName
                                                    },
                                                    {
                                                        label: 'Otros Nombres',
                                                        value: hero.otherNames
                                                    }
                                                ].filter((field) => field.value).length > 0 ? (
                                                    [
                                                        {
                                                            label: 'Categoría',
                                                            value: hero.category
                                                        },
                                                        {
                                                            label: 'Japones',
                                                            value: hero.japaneseName
                                                        },
                                                        {
                                                            label: 'Japones Latino',
                                                            value: hero.latinName
                                                        },
                                                        {
                                                            label: 'Otros Nombres',
                                                            value: hero.otherNames
                                                        }
                                                    ]
                                                        .filter((field) => field.value)
                                                        .map((field, idx) => (
                                                            <li key={`${field.label}-${idx}`}>
                                                                <strong>{field.label}:</strong>{' '}
                                                                <span className="text-default-500">
                                                                    {' '}
                                                                    {field.value}{' '}
                                                                </span>
                                                            </li>
                                                        ))
                                                ) : (
                                                    <li>
                                                        <strong>Sin detalles</strong>
                                                    </li>
                                                )}
                                            </ul>

                                            <p className="mt-4">INFORMACIÓN</p>
                                            <Divider />
                                            {[
                                                { label: 'Sexo', value: hero.gender },
                                                { label: 'Especie', value: hero.species },
                                                { label: 'Ocupación', value: hero.occupation },
                                                { label: 'Origen', value: hero.origin },
                                                { label: 'Residencia', value: hero.residence },
                                                { label: 'Fecha de muerte', value: hero.deathDate }
                                            ].filter((field) => field.value).length > 0 ? (
                                                [
                                                    { label: 'Sexo', value: hero.gender },
                                                    { label: 'Especie', value: hero.species },
                                                    { label: 'Ocupación', value: hero.occupation },
                                                    { label: 'Origen', value: hero.origin },
                                                    { label: 'Residencia', value: hero.residence },
                                                    {
                                                        label: 'Fecha de muerte',
                                                        value: hero.deathDate
                                                    }
                                                ]
                                                    .filter((field) => field.value)
                                                    .map((field, idx) => (
                                                        <p key={`${field.label}-${idx}`}>
                                                            <strong>{field.label}:</strong>{' '}
                                                            <span className="text-default-500">
                                                                {field.value}
                                                            </span>
                                                        </p>
                                                    ))
                                            ) : (
                                                <p>
                                                    <strong>Sin detalles</strong>
                                                </p>
                                            )}

                                            <p className="mt-4">FAMILIA</p>
                                            <Divider />
                                            <ul className="pl-4">
                                                {processFamilyField(
                                                    hero.family || 'Sin detalles'
                                                ).map((member, idx) => (
                                                    <li key={idx}>
                                                        <p className="text-default-500">
                                                            {member.name}
                                                        </p>
                                                        {member.details && ` (${member.details})`}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="mt-4">DEBUT</p>
                                            <Divider />
                                            <ul>
                                                {[
                                                    { label: 'Saga', value: hero.debut?.saga },
                                                    { label: 'Manga', value: hero.debut?.manga },
                                                    { label: 'Volume', value: hero.debut?.volume },
                                                    { label: 'Anime', value: hero.debut?.anime },
                                                    { label: 'Arco', value: hero.debut?.arc }
                                                ].filter((field) => field.value).length > 0 ? (
                                                    [
                                                        { label: 'Saga', value: hero.debut?.saga },
                                                        {
                                                            label: 'Manga',
                                                            value: hero.debut?.manga
                                                        },
                                                        {
                                                            label: 'Volume',
                                                            value: hero.debut?.volume
                                                        },
                                                        {
                                                            label: 'Anime',
                                                            value: hero.debut?.anime
                                                        },
                                                        { label: 'Arco', value: hero.debut?.arc }
                                                    ]
                                                        .filter((field) => field.value)
                                                        .map((field, idx) => {
                                                            const processedField =
                                                                processDebutField(field.value)
                                                            return (
                                                                <p key={`${field.label}-${idx}`}>
                                                                    <strong>{field.label}:</strong>{' '}
                                                                    {processedField.map(
                                                                        (segment, subIdx) => (
                                                                            <span
                                                                                key={`${segment.label}-${subIdx}`}
                                                                            >
                                                                                <strong>
                                                                                    {segment.label}{' '}
                                                                                </strong>
                                                                                <span>
                                                                                    {segment.value}
                                                                                </span>
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </p>
                                                            )
                                                        })
                                                ) : (
                                                    <li>
                                                        <strong>Sin detalles</strong>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="content-center overflow-auto">
                                    <Image
                                        isZoomed
                                        radius="sm"
                                        width="100%"
                                        height="100%"
                                        alt={hero.name}
                                        src={avatar + hero.image || 'fallback.jpg'}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {hero.url && (
                                <Link target="_blank" showAnchorIcon href={hero.url}>
                                    Fandom
                                </Link>
                            )}
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default HeroesInfo
