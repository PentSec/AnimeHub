import { Input } from "@heroui/react"

function SearchHero({ value, changeValue }) {
    return (
        <Input
            label="Buscar personaje"
            variant="underlined"
            color="primary"
            radius="lg"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
        />
    )
}

export default SearchHero
