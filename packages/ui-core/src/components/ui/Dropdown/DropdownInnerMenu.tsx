import { forwardRef, createElement } from 'react'
import { MenuContextProvider } from './context/menuContext'
import useUncertainRef from '../hooks/useUncertainRef'
import {
    useDropdownMenuContext,
    DropdownMenuContextProvider,
} from './context/dropdownMenuContext'
import useUniqueId from '../hooks/useUniqueId'
import { motion, AnimatePresence } from 'framer-motion'
import type { CommonProps } from '../@types/common'
import type { DropdownPlacement } from '../@types/placement'
import type { SyntheticEvent, RefObject, Ref } from 'react'

export interface DropdownInnerMenuProps extends CommonProps {
    activeKey?: string
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
    hidden?: boolean
    placement?: DropdownPlacement
    menuClass?: string
}

// Type-safe wrappers to bypass Framer Motion type issues
const MotionUl = motion.ul as React.ComponentType<React.HTMLAttributes<HTMLUListElement> & {
    initial?: Record<string, unknown>
    animate?: Record<string, unknown>
    exit?: Record<string, unknown>
    transition?: Record<string, unknown>
    ref?: Ref<HTMLUListElement>
}>

const AnimatePresenceWrapper = AnimatePresence as React.ComponentType<{
    mode?: string
    children?: React.ReactNode
}>

const Menu = forwardRef<HTMLElement, DropdownInnerMenuProps>((props, ref) => {
    const {
        children,
        activeKey,
        onSelect,
        hidden,
        placement,
        menuClass,
        ...rest
    } = props

    const menuRef = useUncertainRef<HTMLElement>(ref)
    const menuId = useUniqueId('menu-')
    const menuControl = useDropdownMenuContext<HTMLElement>(
        menuRef as RefObject<HTMLElement>
    )

    const getTransform = (deg: number) => {
        const rotate = `rotateX(${deg}deg)`
        if (placement && placement.includes('center')) {
            return `${rotate} translateX(-50%)`
        }
        return rotate
    }

    const enterStyle = {
        opacity: 1,
        visibility: 'visible' as const,
        transform: getTransform(0),
    }
    const exitStyle = {
        opacity: 0,
        visibility: 'hidden' as const,
        transform: getTransform(40),
    }
    const initialStyle = exitStyle

    return (
        <MenuContextProvider
            value={{
                activeKey,
                onSelect,
            }}
        >
            <DropdownMenuContextProvider value={menuControl}>
                <AnimatePresenceWrapper mode="wait">
                    {!hidden && (
                        <MotionUl
                            ref={menuRef as Ref<HTMLUListElement>}
                            initial={initialStyle}
                            animate={enterStyle}
                            exit={exitStyle}
                            transition={{ duration: 0.15, type: 'tween' }}
                            className={menuClass}
                            id={menuId}
                            {...rest}
                        >
                            {children}
                        </MotionUl>
                    )}
                </AnimatePresenceWrapper>
            </DropdownMenuContextProvider>
        </MenuContextProvider>
    )
})

Menu.displayName = 'DropdownInnerMenu'

export default Menu