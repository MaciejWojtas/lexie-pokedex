import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Fade,
  Skeleton,
  ThemeProvider,
} from '@mui/material'
import PokeAPI, { IChainLink, INamedApiResource, IPokemon } from 'pokeapi-typescript'
import PokemonModal from 'src/features/pokemons/components/PokemonModal'
import { PokemonStat, PokemonType } from 'src/features/pokemons/contexts/PokemonProvider'
import { baseTheme, getTheme } from 'src/theme'
import { getIdFromUrl, isOG } from 'src/utils'

import populateEvolution from '../utils/populateEvolution'

interface PokemonCardProps {
  pokemon: INamedApiResource<IPokemon>
  isFavourite: boolean
  onAddFavourite: () => void
  onRemoveFavourite: () => void
}

const DURATION = 1000

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}) => {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(baseTheme)
  const [isVisible, setIsVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [types, setTypes] = useState<PokemonType[]>([])
  const [experience, setExperience] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [weight, setWeight] = useState<number>()
  const [moves, setMoves] = useState<any>()
  const [abilities, setAbilities] = useState<string[]>()
  const [hp, setHp] = useState<number>()
  const [attack, setAttack] = useState<number>()
  const [defense, setDefense] = useState<number>()
  const [specialAttack, setSpecialAttack] = useState<number>()
  const [specialDefense, setSpecialDefense] = useState<number>()
  const [speed, setSpeed] = useState<number>()
  const [description, setDescription] = useState<string>()
  const [evolutions, setEvolutions] = useState<IChainLink[]>()
  const ref = useRef<HTMLDivElement>(null)

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = getIdFromUrl(pokemon.url)
  const number = `#${`000${id}`.slice(-3)}`
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))

    observer.observe(ref.current)
  }, [ref])

  useEffect(() => {
    // only fetch data for pokemon in view
    if (!isVisible) {
      return
    }

    PokeAPI.Pokemon.resolve(name)
      .then((pokemon) => {
        const types = pokemon.types.map((type) => type.type.name)
        const abilities = pokemon.abilities.map((ability) => ability.ability.name.replace('-', ' '))
        const theme = getTheme(types[0] as PokemonType)

        setTypes(types as PokemonType[])
        setTheme(theme)
        setExperience(pokemon.base_experience)
        setHeight(pokemon.height)
        setWeight(pokemon.weight)
        setAbilities(abilities)

        pokemon.stats.forEach((stat) => {
          switch (stat.stat.name) {
            case PokemonStat.hp:
              setHp(stat.base_stat)
              break

            case PokemonStat.attack:
              setAttack(stat.base_stat)
              break

            case PokemonStat.defense:
              setDefense(stat.base_stat)
              break

            case PokemonStat.specialAttack:
              setSpecialAttack(stat.base_stat)
              break

            case PokemonStat.specialDefense:
              setSpecialDefense(stat.base_stat)
              break

            case PokemonStat.speed:
              setSpeed(stat.base_stat)
              break
            default:
              break
          }
        })

        const moves = pokemon.moves
          .filter((resource) =>
            resource.version_group_details.some(
              (version) => version.version_group.name === 'emerald'
            )
          )
          .map((resource) => {
            const version = resource.version_group_details.find(
              (version) => version.version_group.name === 'emerald'
            )

            return {
              name: resource.move.name.replace('-', ' '),
              level: version!.level_learned_at,
            }
          })
          .sort((a, b) => {
            if (a.level === b.level) {
              return 0
            }
            if (a.level > b.level) {
              return 1
            }
            return -1
          })

        setMoves(moves)

        return PokeAPI.PokemonSpecies.resolve(pokemon.species.name)
      })
      .then((species) => {
        const description = species.flavor_text_entries.find(
          (flavor) => flavor.language.name === 'en' && flavor.version.name === 'emerald'
        )
        setDescription(description?.flavor_text)

        const id = getIdFromUrl(species.evolution_chain.url)

        return PokeAPI.EvolutionChain.resolve(id)
      })
      .then((evolutions) => {
        const chain: IChainLink[] = []
        const link: IChainLink | undefined = evolutions.chain
        console.log({ link })
        function recurse(link: IChainLink) {
          // only respect the OG pokemon
          if (!link.evolves_to.length) {
            return
          }
          // eslint-disable-next-line
          link.evolves_to = link.evolves_to.filter((link) => isOG(link.species.url))

          // in some cases, non-OG pokemon evolve into OG pokemon (like Pichu)
          // don't include non-OG pokemon in our chain, but still process
          // their evolutions
          if (isOG(link.species.url)) {
            chain.push(link)
          }
          // eslint-disable-next-line
          for (const child of link.evolves_to) {
            recurse(child)
          }
        }
        recurse(link)

        setEvolutions(chain)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [isVisible, pokemon.url])

  function handleToggleFavourite() {
    if (isFavourite) {
      onRemoveFavourite()
    } else {
      onAddFavourite()
    }
  }

  function handleCardClick() {
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Card ref={ref}>
        <Fade in={loading} timeout={{ enter: 0, exit: DURATION }}>
          <Skeleton
            animation="wave"
            height="100%"
            sx={{ position: 'absolute', backgroundColor: '#dde4e4' }}
            variant="rectangular"
            width="100%"
          />
        </Fade>

        <CardActionArea onClick={handleCardClick}>
          <CardHeader subheader={number} title={name} />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'url("/pokeball.svg")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '15rem',
                  width: '75%',
                }}
              >
                <Fade in={!loading} timeout={DURATION}>
                  <CardMedia component="img" height="250" image={imageUrl} />
                </Fade>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        fullWidth
        maxWidth="sm"
        onBackdropClick={handleCloseDialog}
        onClose={handleCloseDialog}
        open={isDialogOpen}
        scroll="body"
      >
        {loading ? (
          <div />
        ) : (
          <PokemonModal
            abilities={abilities!}
            attack={attack!}
            defense={defense!}
            description={description!}
            evolutions={evolutions!}
            experience={experience!}
            height={height!}
            hp={hp!}
            imageUrl={imageUrl}
            isFavourite={isFavourite}
            moves={moves!}
            name={name}
            onClose={handleCloseDialog}
            onToggleFavourite={handleToggleFavourite}
            specialAttack={specialAttack!}
            specialDefense={specialDefense!}
            speed={speed!}
            types={types}
            weight={weight!}
          />
        )}
      </Dialog>
    </ThemeProvider>
  )
}

export default PokemonCard
