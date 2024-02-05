"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({ children }) {
  const path = usePathname();

  return (
    <motion.div
      key={path}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
