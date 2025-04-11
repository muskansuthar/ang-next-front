import { delay } from "framer-motion"

export const containerVariants = (delay = 0) => ({
    "offscreen": {
        opacity  : 0,
        y : 30
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 2,
            delay
        }
    }
})

export const togVariants = {
    "offscreen": {
        opacity  : 0,
        y : 10
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 3,
            delay: .8
        }
    }
}

export const titleVariants = {
    "offscreen": {
        opacity  : 0,
        y : 30
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 2.2
        }
    }
}

export const desVariants = {
    "offscreen": {
        opacity  : 0,
        y : 20
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 2.1,
            delay: 1.2
        }
    }
}

export const headVariants = {
    "offscreen": {
        opacity  : 0,
        y : -20
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 2.1,
            delay: 0.6
        }
    }
}

export const yearVariants = {
    "offscreen": {
        opacity  : 0,
        y : 20
    },

    "onscreen":{
        opacity : 1,
        y: 0,
        transition: {
            type: "spring",
            duration : 2.1,
            delay: 2.0
        }
    }
}

export const slideInRight = {
  offscreen: { opacity: 0, x: 100 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, delay: 0.2 },
  },
};
export const slideIn = {
  offscreen: { opacity: 0, x: -70 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, delay: 0.2 },
  },
};
export const slideUp = {
  offscreen: { opacity: 0, y: 70 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 2, delay: 0.2 },
  },
};

export const buttonHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};


export const textContainerVariants = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each letter
    },
  },
};

export const letterVariants = {
  offscreen: { opacity: 0, y: 20 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};