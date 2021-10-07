import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SlideAnim({ from = 'left', children }) {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial='hidden'
            variants={{
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        when: 'beforeChildren',
                    },
                },
                hidden: { x: from === 'left' ? -100 : 100, opacity: 0 },
            }}
        >
            {children}
        </motion.div>
    );
}
