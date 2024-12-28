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
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

const childrenVariant = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
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
  childrenVariant,
  loadingVariant,
};
