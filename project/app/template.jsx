"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({ children }) {
  const path = usePathname();

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "linear", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
