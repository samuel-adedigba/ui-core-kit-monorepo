import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import useColorLevel from '../hooks/useColorLevel'
import { CONTROL_SIZES, SIZES } from '../utils/constants'
import type { CommonProps, TypeAttributes, ColorLevel } from '../@types/common'
import type { ReactNode, ComponentPropsWithRef, MouseEvent } from 'react'
import Spinner from '../Spinner'
//import "./../../../assets/styles/app.css";


export interface ButtonProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
    active?: boolean
    block?: boolean
    color?: string
    disabled?: boolean
    icon?: string | ReactNode
    loading?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    shape?: TypeAttributes.Shape
    size?: TypeAttributes.Size
    variant?: 'solid' | 'twoTone' | 'plain' | 'default'
}

type ButtonColor = {
    bgColor: string
    hoverColor: string
    activeColor: string
    textColor: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        active = false,
        block = false,
        children,
        className,
        color = '',
        disabled,
        icon,
        loading = false,
        shape = 'round',
        size,
        variant = 'default',
        ...rest
    } = props
    const { themeColor, controlSize, primaryColorLevel } = useConfig()
    // Safe config read — if ConfigProvider is not present, fall back to defaults
// let themeColor = 'blue'
// let controlSize: any = undefined
// let primaryColorLevel: any = '500'

// try {
//   const cfg = useConfig?.()
//   if (cfg) {
//     themeColor = cfg.themeColor ?? themeColor
//     controlSize = cfg.controlSize ?? controlSize
//     primaryColorLevel = cfg.primaryColorLevel ?? primaryColorLevel
//   }
// } catch (err) {
//   // If useConfig throws, ignore and keep defaults
//   console.warn('useConfig not available in demo:', err)
// }

    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size
    const defaultClass = 'button'
    const sizeIconClass = 'inline-flex items-center justify-center'

    const splitedColor = color?.split('-') || []

    const buttonSize = size || inputGroupSize || formControlSize || controlSize
    const buttonColor = splitedColor[0] || themeColor
    const buttonColorLevel = splitedColor[1] || primaryColorLevel

    const [increaseLevel, decreaseLevel] = useColorLevel(
        buttonColorLevel as ColorLevel
    )

    const getButtonSize = () => {
        let sizeClass = ''
        switch (buttonSize) {
            case SIZES.LG:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.lg}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
                        : 'px-8 py-2 text-base'
                )
                break
            case SIZES.SM:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.sm}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
                        : 'px-3 py-2 text-sm'
                )
                break
            case SIZES.XS:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.xs}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
                        : 'px-3 py-1 text-xs'
                )
                break
            default:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.md}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl`
                        : 'px-8 py-2'
                )
                break
        }
        return sizeClass
    }

    const disabledClass = 'opacity-50 cursor-not-allowed'

    const solidColor = () => {
        const btn = {
            bgColor: active
                ? `bg-${buttonColor}-${increaseLevel}`
                : `bg-${buttonColor}-${buttonColorLevel}`,
            textColor: 'text-white',
            hoverColor: active
                ? ''
                : `hover:bg-${buttonColor}-${decreaseLevel}`,
            activeColor: `active:bg-${buttonColor}-${increaseLevel}`,
        }
        return getBtnColor(btn)
    }

    const twoToneColor = () => {
        const btn = {
            bgColor: active
                ? `bg-${buttonColor}-200 dark:bg-${buttonColor}-50`
                : `bg-${buttonColor}-50 dark:bg-${buttonColor}-500 dark:bg-opacity-20`,
            textColor: `text-${buttonColor}-${buttonColorLevel} dark:text-${buttonColor}-50`,
            hoverColor: active
                ? ''
                : `hover:bg-${buttonColor}-100 dark:hover:bg-${buttonColor}-500 dark:hover:bg-opacity-30`,
            activeColor: `active:bg-${buttonColor}-200 dark:active:bg-${buttonColor}-500 dark:active:bg-opacity-40`,
        }
        return getBtnColor(btn)
    }

    const defaultColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
                : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
            activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
        }
        return getBtnColor(btn)
    }

    const plainColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 dark:bg-gray-500`
                : 'bg-transparent border border-transparent',
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
            activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
        }
        return getBtnColor(btn)
    }

    const getBtnColor = ({
        bgColor,
        hoverColor,
        activeColor,
        textColor,
    }: ButtonColor) => {
        return `${bgColor} ${
            disabled || loading ? disabledClass : hoverColor + ' ' + activeColor
        } ${textColor}`
    }

    const btnColor = () => {
        switch (variant) {
            case 'solid':
                return solidColor()
            case 'twoTone':
                return twoToneColor()
            case 'plain':
                return plainColor()
            case 'default':
                return defaultColor()
            default:
                return defaultColor()
        }
    }

    const classes = classNames(
        defaultClass,
        btnColor(),
        `radius-${shape}`,
        getButtonSize(),
        className,
        block ? 'w-full' : ''
    )

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { onClick } = props
        if (disabled || loading) {
            e.preventDefault()
            return
        }
        onClick?.(e)
    }

    const renderChildren = () => {
        if (loading && children) {
            return (
                <span className="flex items-center justify-center">
                    <Spinner enableTheme={false} className="mr-1" />
                    {children}
                </span>
            )
        }

        if (icon && !children && loading) {
            return <Spinner enableTheme={false} />
        }

        if (icon && !children && !loading) {
            return <>{icon}</>
        }

        if (icon && children && !loading) {
            return (
                <span className="flex items-center justify-center">
                    <span className="text-lg">{icon}</span>
                    <span className="ltr:ml-1 rtl:mr-1">{children}</span>
                </span>
            )
        }

        return <>{children}</>
    }

    return (
        <button ref={ref} className={classes} {...rest} onClick={handleClick}>
            {renderChildren()}
        </button>
    )
})

Button.displayName = 'Button'

export default Button

// import { forwardRef } from 'react'
// import type { ReactNode, ComponentPropsWithRef, MouseEvent } from 'react'

// export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
//     active?: boolean
//     block?: boolean
//     color?: string
//     disabled?: boolean
//     icon?: string | ReactNode
//     loading?: boolean
//     onClick?: (e: MouseEvent<HTMLButtonElement>) => void
//     shape?: 'round' | 'circle' | 'none'
//     size?: 'xs' | 'sm' | 'md' | 'lg'
//     variant?: 'solid' | 'twoTone' | 'plain' | 'default'
//     themeColor?: string
// }

// // Internal constants - no external dependencies
// const CONTROL_SIZES = {
//     xs: '8',
//     sm: '9',
//     md: '10',
//     lg: '11'
// }

// const SHAPE_CLASSES = {
//     round: 'rounded-md',
//     circle: 'rounded-full',
//     none: 'rounded-none'
// }

// // Simple spinner component
// const Spinner = ({ className = '' }: { className?: string }) => (
//     <svg
//         className={`animate-spin h-4 w-4 ${className}`}
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//     >
//         <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//         />
//         <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//         />
//     </svg>
// )

// // Color level utilities
// const getColorLevel = (level: string | number): [string, string] => {
//     const numLevel = typeof level === 'string' ? parseInt(level) : level
//     const increaseLevel = Math.min(numLevel + 100, 900).toString()
//     const decreaseLevel = Math.max(numLevel - 100, 50).toString()
//     return [increaseLevel, decreaseLevel]
// }

// // Parse color string (e.g., "blue-500" -> ["blue", "500"])
// const parseColor = (color: string): [string, string] => {
//     const parts = color.split('-')
//     if (parts.length >= 2) {
//         return [parts[0], parts[1]]
//     }
//     return [color, '500'] // default level
// }

// const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
//     const {
//         active = false,
//         block = false,
//         children,
//         className = '',
//         color,
//         disabled = false,
//         icon,
//         loading = false,
//         shape = 'round',
//         size = 'md',
//         variant = 'default',
//         themeColor = 'blue',
//         onClick,
//         ...rest
//     } = props

//     // Determine the actual color to use
//     const actualColor = color || `${themeColor}-500`
//     const [colorName, colorLevel] = parseColor(actualColor)
//     const [increaseLevel, decreaseLevel] = getColorLevel(colorLevel)

//     // Size classes
//     const getSizeClasses = (): string => {
//         const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
        
//         switch (size) {
//             case 'xs':
//                 return `${baseClasses} h-${CONTROL_SIZES.xs} ${
//                     icon && !children 
//                         ? `w-${CONTROL_SIZES.xs} text-sm` 
//                         : 'px-2.5 py-1.5 text-xs'
//                 }`
//             case 'sm':
//                 return `${baseClasses} h-${CONTROL_SIZES.sm} ${
//                     icon && !children 
//                         ? `w-${CONTROL_SIZES.sm} text-base` 
//                         : 'px-3 py-2 text-sm'
//                 }`
//             case 'lg':
//                 return `${baseClasses} h-${CONTROL_SIZES.lg} ${
//                     icon && !children 
//                         ? `w-${CONTROL_SIZES.lg} text-xl` 
//                         : 'px-4 py-2 text-base'
//                 }`
//             default: // md
//                 return `${baseClasses} h-${CONTROL_SIZES.md} ${
//                     icon && !children 
//                         ? `w-${CONTROL_SIZES.md} text-lg` 
//                         : 'px-4 py-2 text-sm'
//                 }`
//         }
//     }

//     // Variant-specific color classes
//     const getVariantClasses = (): string => {
//         const disabledClasses = 'opacity-50 cursor-not-allowed'
        
//         if (disabled || loading) {
//             return disabledClasses
//         }

//         switch (variant) {
//             case 'solid':
//                 return `
//                     ${active ? `bg-${colorName}-${increaseLevel}` : `bg-${colorName}-${colorLevel}`}
//                     text-white
//                     ${!active ? `hover:bg-${colorName}-${decreaseLevel} active:bg-${colorName}-${increaseLevel}` : ''}
//                     focus:ring-${colorName}-500
//                 `.replace(/\s+/g, ' ').trim()

//             case 'twoTone':
//                 return `
//                     ${active 
//                         ? `bg-${colorName}-200 dark:bg-${colorName}-50` 
//                         : `bg-${colorName}-50 dark:bg-${colorName}-500 dark:bg-opacity-20`
//                     }
//                     text-${colorName}-${colorLevel} dark:text-${colorName}-50
//                     ${!active 
//                         ? `hover:bg-${colorName}-100 dark:hover:bg-${colorName}-500 dark:hover:bg-opacity-30 
//                            active:bg-${colorName}-200 dark:active:bg-${colorName}-500 dark:active:bg-opacity-40` 
//                         : ''
//                     }
//                     focus:ring-${colorName}-500
//                 `.replace(/\s+/g, ' ').trim()

//             case 'plain':
//                 return `
//                     ${active 
//                         ? 'bg-gray-100 dark:bg-gray-500' 
//                         : 'bg-transparent border border-transparent'
//                     }
//                     text-gray-600 dark:text-gray-100
//                     ${!active 
//                         ? 'hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500' 
//                         : ''
//                     }
//                     focus:ring-gray-500
//                 `.replace(/\s+/g, ' ').trim()

//             case 'default':
//             default:
//                 return `
//                     ${active 
//                         ? 'bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500' 
//                         : 'bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700'
//                     }
//                     text-gray-600 dark:text-gray-100
//                     ${!active 
//                         ? 'hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500' 
//                         : ''
//                     }
//                     focus:ring-gray-500
//                 `.replace(/\s+/g, ' ').trim()
//         }
//     }

//     // Combine all classes
//     const buttonClasses = [
//         getSizeClasses(),
//         getVariantClasses(),
//         SHAPE_CLASSES[shape],
//         block ? 'w-full' : '',
//         className
//     ].filter(Boolean).join(' ')

//     // Handle click events
//     const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
//         if (disabled || loading) {
//             e.preventDefault()
//             return
//         }
//         onClick?.(e)
//     }

//     // Render button content
//     const renderContent = () => {
//         if (loading && children) {
//             return (
//                 <span className="flex items-center justify-center">
//                     <Spinner className="mr-2" />
//                     {children}
//                 </span>
//             )
//         }

//         if (loading && icon && !children) {
//             return <Spinner />
//         }

//         if (icon && !children && !loading) {
//             return <span className="flex items-center justify-center">{icon}</span>
//         }

//         if (icon && children && !loading) {
//             return (
//                 <span className="flex items-center justify-center">
//                     <span className="mr-2">{icon}</span>
//                     <span>{children}</span>
//                 </span>
//             )
//         }

//         return children
//     }

//     return (
//         <button
//             ref={ref}
//             className={buttonClasses}
//             disabled={disabled || loading}
//             onClick={handleClick}
//             {...rest}
//         >
//             {renderContent()}
//         </button>
//     )
// })

// Button.displayName = 'Button'

// export default Button