import React, { useState } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'
import { ReactComponent as BugIcon } from 'src/assets/icons/bug.svg'
import { ReactComponent as DarkIcon } from 'src/assets/icons/dark.svg'
import { ReactComponent as DragonIcon } from 'src/assets/icons/dragon.svg'
import { ReactComponent as ElectricIcon } from 'src/assets/icons/electric.svg'
import { ReactComponent as FairyIcon } from 'src/assets/icons/fairy.svg'
import { ReactComponent as FightingIcon } from 'src/assets/icons/fighting.svg'
import { ReactComponent as FireIcon } from 'src/assets/icons/fire.svg'
import { ReactComponent as FlyingIcon } from 'src/assets/icons/flying.svg'
import { ReactComponent as GhostIcon } from 'src/assets/icons/ghost.svg'
import { ReactComponent as GrassIcon } from 'src/assets/icons/grass.svg'
import { ReactComponent as GroundIcon } from 'src/assets/icons/ground.svg'
import { ReactComponent as IceIcon } from 'src/assets/icons/ice.svg'
import { ReactComponent as NormalIcon } from 'src/assets/icons/normal.svg'
import { ReactComponent as PoisonIcon } from 'src/assets/icons/poison.svg'
import { ReactComponent as PsychicIcon } from 'src/assets/icons/psychic.svg'
import { ReactComponent as RockIcon } from 'src/assets/icons/rock.svg'
import { ReactComponent as SteelIcon } from 'src/assets/icons/steel.svg'
import { ReactComponent as WaterIcon } from 'src/assets/icons/water.svg'

import { PokemonType } from 'src/features/pokemons/types/pokemon'

interface PokemonTypeIconProps extends SvgIconProps {
  type: PokemonType
}

function getIcon(type: PokemonType) {
  switch (type) {
    case 'bug':
      return BugIcon
    case 'dark':
      return DarkIcon
    case 'dragon':
      return DragonIcon
    case 'electric':
      return ElectricIcon
    case 'fairy':
      return FairyIcon
    case 'fighting':
      return FightingIcon
    case 'fire':
      return FireIcon
    case 'flying':
      return FlyingIcon
    case 'ghost':
      return GhostIcon
    case 'grass':
      return GrassIcon
    case 'ground':
      return GroundIcon
    case 'ice':
      return IceIcon
    case 'poison':
      return PoisonIcon
    case 'psychic':
      return PsychicIcon
    case 'rock':
      return RockIcon
    case 'steel':
      return SteelIcon
    case 'water':
      return WaterIcon
    case 'normal':
    default:
      return NormalIcon
  }
}

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = ({ type, ...props }) => {
  const [icon] = useState<React.FC>(getIcon(type))

  return <SvgIcon component={icon} inheritViewBox {...props} />
}

export default PokemonTypeIcon
