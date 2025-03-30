import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    const isDarkTheme = false; // We can implement theme detection later

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${
            isDarkTheme
              ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
              : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
          } to-transparent rounded-3xl z-0 pointer-events-none`}
          variants={navGlowVariants}
        />
        <ul className="flex items-center justify-between gap-1 relative z-10">
          {items.map((item) => {
            const isActive = activeItem === item.label
            const Icon = item.icon

            return (
              <motion.li
                key={item.label}
                className="relative"
                whileHover="hover"
                initial="initial"
              >
                <button
                  onClick={() => onItemClick?.(item.label)}
                  className={cn(
                    "group flex flex-col items-center justify-center w-16 h-16 rounded-xl relative overflow-hidden",
                    isActive ? "pointer-events-none" : "pointer-events-auto",
                  )}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 1 : 0,
                    }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    variants={glowVariants}
                    style={{ background: item.gradient }}
                  />

                  <motion.div className="relative z-10 perspective-600">
                    <motion.div
                      className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>

                    <motion.div
                      className="flex flex-col items-center justify-center gap-1 text-xs font-medium absolute inset-0"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar" 