import { animate } from 'framer-motion';
import { Text } from '@chakra-ui/layout';
import { useEffect, useRef } from 'react';

export default function Counter({ from = 0, to, dur }) {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(from, to, {
            duration: dur,
            ease: 'easeOut',
            repeat: Infinity,
            onUpdate(value) {
                node.textContent =
                    '$' +
                    value.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                    });
            },
        });

        return () => controls.stop();
    }, [from, to, dur]);

    return <Text fontWeight='bold' ref={nodeRef} fontSize='xx-large' />;
}
