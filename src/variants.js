const pageVariant = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,

    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 100,

    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};
const containerVariant = {
  enter: {
    transition: { staggerChildren: 1, delayChildren: 0.5 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const cardVariant = {
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 100,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
};
const InViewRow = {
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 100,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.1,
    },
  },
};
const rowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index * 0.1,
    },
  }),
  exit: (index) => ({
    opacity: 0,
    scale: 0,

    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index * 0.1,
    },
  }),
};
const loaderVariant = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};
const loadingVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1, delay: 1 } },
};

export {
  loaderVariant,
  pageVariant,
  containerVariant,
  cardVariant,
  loadingVariant,
  InViewRow,
  rowVariants,
};
