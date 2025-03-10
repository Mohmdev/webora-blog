import { TbLetterFSmall, TbLetterMSmall } from 'react-icons/tb'

export const unitSymbols: Record<
  string,
  React.ComponentType<{ size?: number }>
> = {
  m: TbLetterMSmall,
  ft: TbLetterFSmall,
}
