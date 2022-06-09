import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  cloneElement,
  Children,
  ReactElement,
} from 'react'
import type { VariantProps, CSS } from '@stitches/react'
import { styled } from './theme'
import { GetRenderAsProps, RenderAsType } from './types'

const StyledButton = styled('button', {
  $$textColor: '$textColors$primary',
  $$iconColor: '$iconColors$primary',

  $$backgroundColor: '$colors$dark10',
  $$backgroundColorOnHover: '$colors$dark20',
  $$backgroundColorOnActive: '$colors$dark5',

  $$borderColorOnFocus: '$borderColors$selected',

  fontFamily: '$primary',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'pre',

  color: '$$textColor',
  fontSize: '$8',
  lineHeight: '$3',
  fontWeight: '$bold',
  borderRadius: '$3',

  backgroundColor: '$$backgroundColor',

  transition: 'background 0.15s ease-out',

  '&:hover': {
    backgroundColor: '$$backgroundColorOnHover',
  },
  '&:active': {
    backgroundColor: '$$backgroundColorOnActive',
  },
  '&:focus.focus-visible': {
    boxShadow: '0 0 0 2px $$borderColorOnFocus',
  },

  '& svg': {
    color: '$$iconColor',
  },

  variants: {
    variant: {
      primary: {
        $$textColor: '$colors$white',
        $$iconColor: '$colors$white',

        $$backgroundColor: '$colors$dark95',
        $$backgroundColorOnHover: '$colors$black',
        $$backgroundColorOnActive: '$colors$dark85',

        $$borderColorOnFocus: '$borderColors$selected',
      },
      secondary: {
        $$textColor: '$textColors$primary',
        $$iconColor: '$iconColors$primary',

        $$backgroundColor: '$colors$dark10',
        $$backgroundColorOnHover: '$colors$dark20',
        $$backgroundColorOnActive: '$colors$dark5',

        $$borderColorOnFocus: '$borderColors$selected',
      },
      ghost: {
        $$textColor: '$textColors$secondary',
        $$iconColor: '$iconColors$primary',

        $$backgroundColor: '$colors$dark0',
        $$backgroundColorOnHover: '$colors$dark10',
        $$backgroundColorOnActive: '$colors$dark5',

        $$borderColorOnFocus: '$borderColors$selected',
      },
    },

    icon: {
      left: {
        display: 'grid',
        gridTemplateAreas: '"a b"',
        columnGap: '2px',
        justifyContent: 'start',
      },
      right: {
        display: 'grid',
        columnGap: '2px',
        gridTemplateAreas: '"a b"',
        justifyContent: 'space-between',
      },
      both: {
        display: 'grid',
        columnGap: '2px',
        gridTemplateAreas: '"a b c"',
        justifyContent: 'space-between',
      },
      only: {},
    },
    size: {
      large: {
        padding: '$8 $16',
      },
      medium: {
        padding: '$4 $8',
      },
      small: {
        padding: '$2 $4',
      },
    },

    disabled: {
      true: {
        pointerEvents: 'none',
        cursor: 'not-allowed',
        opacity: '0.3',
      },
      false: {},
    },
    allowInteractivity: {
      true: {
        pointerEvents: 'unset',
        cursor: 'pointer',
      },
    },
  },

  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      css: {
        $$backgroundColor: '$colors$dark30',
        $$textColor: '$colors$light95',
      },
    },
    {
      variant: 'secondary',
      disabled: true,
      css: {
        $$backgroundColor: '$colors$dark5',
        $$textColor: '$textColors$disabled',
      },
    },
    {
      variant: 'ghost',
      disabled: true,
      css: {
        $$textColor: '$textColors$disabled',
      },
    },
    {
      size: 'medium',
      icon: 'left',
      css: {
        paddingLeft: 6,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    {
      size: 'medium',
      icon: 'right',
      css: {
        paddingRight: 6,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    {
      size: 'medium',
      icon: 'both',
      css: {
        padding: '4px 6px',
      },
    },
    {
      size: 'large',
      icon: 'left',
      css: {
        padding: '0.7rem 3rem',
      },
    },
    {
      size: 'large',
      icon: 'right',
      css: {
        padding: '0.7rem 3rem',
      },
    },
    {
      size: 'large',
      icon: 'both',
      css: {
        padding: '0.7rem 3rem',
      },
    },

    {
      size: 'medium',
      icon: 'only',
      css: {
        padding: '$2 $3',
      },
    },
    {
      size: 'small',
      icon: 'only',
      css: {
        padding: '0',
      },
    },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
})

type ButtonProps<T extends RenderAsType = 'button'> = Omit<
  Omit<VariantProps<typeof StyledButton>, 'icon'> & GetRenderAsProps<T>,
  'iconLeft' | 'iconRight' | 'icon' | 'iconCenter'
> & { as?: T; css?: CSS } & (
    | {
        children?: ReactNode
        iconLeft?: ReactElement
        iconRight?: ReactElement
        iconCenter?: ReactElement
        icon?: never
      }
    | {
        children?: never
        iconLeft?: never
        iconRight?: never
        iconCenter?: never
        icon?: ReactElement
      }
  )

function ButtonComponent<T extends RenderAsType = 'button'>(
  { children, as, icon, iconLeft, iconRight, iconCenter, ...props }: ButtonProps<T>,
  ref?: ForwardedRef<any>
) {
  return (
    <StyledButton
      icon={mapIconVariant({ iconLeft, icon, iconRight, iconCenter })}
      ref={ref}
      {...props}
      as={as as any}
    >
      {icon ? (
        cloneElement(Children.only(icon), {
          color: 'inherit',
          size: '24px',
        })
      ) : (
        <>
          {iconLeft &&
            cloneElement(Children.only(iconLeft), {
              color: 'inherit',
              size: '24px',
            })}
          {iconCenter &&
            cloneElement(Children.only(iconCenter), {
              color: 'inherit',
              size: '24px',
            })}
          {children}
          {iconRight &&
            cloneElement(Children.only(iconRight), {
              color: 'inherit',
              size: '24px',
            })}
        </>
      )}
    </StyledButton>
  )
}

const mapIconVariant = ({
  iconRight,
  iconLeft,
  icon,
  iconCenter,
}): VariantProps<typeof StyledButton>['icon'] => {
  if (iconLeft && iconRight) return 'both'
  if (iconLeft) return 'left'
  if (iconRight) return 'right'
  if (icon) return 'only'
  return undefined
}

export const Button = forwardRef(ButtonComponent) as typeof ButtonComponent
