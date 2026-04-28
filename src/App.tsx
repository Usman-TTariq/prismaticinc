import { motion } from 'framer-motion'
import FinaxisHome from './FinaxisHome'

export default function App() {
  return (
    <div className="min-h-svh overflow-x-auto bg-neutral-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-[1920px] max-w-none"
      >
        <FinaxisHome />
      </motion.div>
    </div>
  )
}
