import { animate } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { StatNumber } from '@chakra-ui/stat';

export default function Counter({ from = 0, to }) {
    const nodeRef = useRef();
    const [inViewRef, inView] = useInView({ triggerOnce: true });

    const setRefs = useCallback(
        (node) => {
            nodeRef.current = node;
            inViewRef(node);
        },
        [inViewRef]
    );

    useEffect(() => {
        const node = nodeRef.current;
        if (inView) {
            const controls = animate(from, to, {
                duration: 2,
                ease: 'easeOut',
                onUpdate(value) {
                    node.textContent = value.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                    });
                },
            });

            return () => controls.stop();
        }
    }, [from, to, inView]);

    return <StatNumber fontWeight='bold' ref={setRefs} fontSize='xx-large' />;
}
