const loginSectionVariants = {
  initial: {},
  animate: {},
  exit: {
    x: "-50vw",
    transition: {
      duration: 0.4,
    },
  },
};

const fieldsetLoginVariants = {
  initial: {
    opacity: 0,
    x: "-50vw",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
  },
};

const registerSectionVariants = {
  initial: {},
  animate: {},
  exit: {
    x: "50vw",
    transition: {
      duration: 0.4,
    },
  },
};

const fieldsetRegisterVariants = {
  initial: {
    opacity: 0,
    x: "50vw",
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
  },
};

const formVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};
const sideVariants = {
  closed: {},
  open: {},
};
const sidebarVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};
const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

const middleLineVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

export {
  bottomLineVariants,
  fieldsetLoginVariants,
  fieldsetRegisterVariants,
  formVariants,
  itemVariants,
  loginSectionVariants,
  middleLineVariants,
  registerSectionVariants,
  sideVariants,
  sidebarVariants,
  topLineVariants,
};
