import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/layout';

const MotionBox = motion(Box);

const color1 = '#710193'; //main
const color2 = '#AB52CC'; //second

const svgVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.5 },
    },
};
const gVariatns = {
    hidden: {
        opacity: 0,
        y: -100,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function About1() {
    return (
        <MotionBox w={['100%', '100%', '50%']} variants={svgVariants}>
            <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 690 400'
            >
                <g id='land' stroke='black'>
                    <path
                        id='side'
                        d='M258.67,20.9,253,22.39V15.73Zm55.91-4.7v5.1l.65-.05Zm-58.1,11.39-3.54-2.05L250.18,24l0,7.74,2.77-1.79Zm97.93,6-1.8,2.93,1.79,1.2Zm45.36,29.7L399,67.74l.77.6Zm-161,24.25,11.17,4.34L259.09,96l5.3,6.58,9.35,3.28,5.67-.7L284,108H284l4.14-.14.18-4.35L284,98.74l7.21-4,2.89-1.62-2.87-5.4-11.8-7.51-5.67.7-9.34-3.28L259.15,71l-6.22-2.8L250,66.92l-6.43-2.5-4.74-1.84,2.4-5.17,2.36.15,9,.56.38-4.7-9.35-4.93-23.34-4.35-.07,25,18.59,3.47Zm230.62,28.58-2.82,2.82,2.81.95ZM144.08,152.27l-2.44-2.35v5.77l1.66-.13Zm381.14,16,5,8,0-13.48-7.89,2.22-1.2,2.59,1.2.21ZM98.39,172.7v4.43l5.1-.8Zm438.86,8.1-1,9.51.93.3ZM49.08,233.86l.39-3.28-2-2.35,0,5.82Zm551.35-2.15-3.89,3.68,3.87,2.63Zm-546.34-9,1.24-1.91,4.18-6.42L55.38,201,39.52,191.6l-.07,25L52,224Zm595.37,54-8.1.47-8.06,8.93-45-4-22.71-.94-33.69-7.75L516.06,269l-24.72.7-5.26,3.05-12.56,1.18-50.64,4.46-30.36,7.28L384.08,299l2.51,14.56L384,316.79l-.25.31-22.72-1.88L340,311.94l-9.71,3.28-25.12,3.29-9.7,5.64-18.26-4.47L267,313.81l-28.58.12-14.16,4.7L206,319.1l-2.26-6.46L195,307.83l-10.53,1.41-6.11-4.7-3.06-3.64-12.2-7.51-7.1-.59-3.89-6L147.26,284l-24.2-13.27-11.14.35L108.26,269l-6.08.94-5.28-3.06-.83-2.11-16.44-4.81-14.78,2.46-6.49-.7-4,2.35-9.16-3.14-.79-.27.8-2.82-3.47-4.1-.43-4.7L38,246.66l-.07,25L41.19,274l.43,4.7,2.68,3.17v3.75l10,3.41,4-2.35,6.49.7,14.78-2.46L96,289.69l.82,2.11,5.29,3.06,6.08-.94,3.66,2.11,11.14-.35L147.19,309l4.87,2.81,3.89,6,7.1.59,12.2,7.51,3.06,3.64,6.11,4.7L195,332.77l8.74,4.82,2.27,6.46,18.24-.47,14.16-4.7,28.58-.12,10.17,5.87,18.26,4.47,9.7-5.64,25.11-3.29,9.71-3.28,21.1,3.28,22.71,1.88,2.82-3.52.05-18.63,5.87-9.31,30.36-7.28,50.65-4.46L486,297.67l5.25-3.05,24.73-.7,15.83,4.46,33.69,7.75,22.7.93,45,4,8.06-8.93,8.1-.47,2.61-5.28.07-24.95ZM544.17,343.89l.15.33,0-9.81L533.69,337l1.8,3.92Zm-109.1-4-5.53,7.94-2.47-1.42-1-.56L422.88,344l-.06,24.95,6.65,3.85,5.53-7.95L449.31,363l11-2.88.07-24.95-11,2.88Zm-8.93-6.55,0,7.7,1-.89Zm109.3,19.21-1.79.22-24.75,3.07-4.54-6.45-3.18-1.73L496.27,345l4.94-7-10.69-3.43-.07,24.95,5.78,1.85,0,8.58,8.09,4.4,4.54,6.45,26.54-3.29,10-5.84.07-24.95-1.18.68Zm44.3,13.34-6.33-11.16-6-4.88-.07,25,6.05,4.88,6.33,11.16,8.17-1.12,1.39-10.59.07-25-1.39,10.6Z'
                        fill='#d8d8d8'
                    />
                    <path
                        id='top'
                        d='M652.07,271.43l-2.61,5.28-8.1.47-8.06,8.93-45-4-22.71-.94-33.69-7.75L516.06,269l-24.73.7-5.25,3.05-12.56,1.18-50.65,4.46-30.35,7.28L384.07,299l2.52,14.56L384,316.79l-.25.31-22.71-1.88L340,311.94l-9.71,3.28-25.12,3.29-9.7,5.64-18.26-4.47L267,313.81l-28.58.12-14.16,4.7L206,319.1l-2.27-6.46L195,307.83l-10.53,1.41-6.11-4.7-3.06-3.64-12.2-7.51-7.1-.59-3.89-6L147.26,284l-24.2-13.27-11.15.35L108.26,269l-6.08.94-5.29-3.06-.82-2.11-16.44-4.81-14.79,2.46-6.49-.7-4,2.35-9.16-3.14-.79-.27.8-2.82-3.47-4.1-.43-4.7L38,246.66l4.6-12.09,4.8-.52,1.67-.18.39-3.29-2-2.35,3.43-3.64,1.09-.63,2.14-1.24,1.24-1.91,4.18-6.43L55.37,201l-15.86-9.39,11.3-8.93,1.61-2.58,8.5-1.64,14.38-1.3,8.91-2.11L92.94,178l5.43-.85,5.1-.8-5.09-3.64,3.59-9.86,9.52-3.4,6.86-3.53,14.81,1.53,2.63-1.29,5.83-.45,1.66-.13.79-3.29-2.44-2.35,2-4.25,3.17-6.55,3.64-.47,4.4-11.27,6.7,2.47,10,7.63,9.31-1.17,14.37-4.11,1.79-7.63,7.09.11,5.27,1.42,4.05-1.65,23.24-11.86,3.62-5.4,4.06-.7,3,2,10.93-1.64,4.88,1.88,11.55-.36,9.19-.32H284l4.13-.14.18-4.35L284,98.75l7.21-4,2.88-1.61-2.87-5.4L279.47,80.2l-5.67.7-9.35-3.28L259.15,71l-6.22-2.8L250,66.93l-6.43-2.5-4.74-1.84,2.4-5.17,2.36.15,9,.56.37-4.7-9.35-4.93-23.33-4.35,7.06-6,13.59,1,1.6-2.58,7.61-4.94,2.77-1.79,3.56-2.31-3.55-2.05L250.17,24l2.63-1.52.14,0,5.73-1.49L253,15.74l7.68-4.46,18.64-2.11,12,1.29L295.12,15l9.75,3.29,2.85,3.52,6.85-.54.65,0-.63-5.05,16,1.3L343,20.68l11.42,12.91-1.8,2.94,1.79,1.19L389.23,61l10.55,2.34L399,67.76l.78.59,11,8.56.43,4.23,23.41,18.2L455,105.91l3.26,4,7.92,2,3.26,4.22-2.82,2.82,2.81,1,4.1,1.39,3.07,6.22,11.36,1.87,9,9.16,5.71,6.34,19.29,6,.85,5.16,6.3,3.64,1.23,3.06L522.37,165l-1.2,2.59,1.19.21,2.87.5,5,8,.53.84,6.5,3.76-1,9.51.93.3,12.07,3.92,1.64,3.52,0,5.64,9.95,3.63,13.36,9.44,7.54-4.39,3.13,2,10.19,10.73,5.29,3.68,0,3-3.9,3.68,3.88,2.62,5.48,3.71,6.12,9.63,12.61,7.28,23.15,7.28ZM440.57,326.7l-13,.18-1.47,6.46.95,6.81-1,.88-3.23,3,3.22,1.86,1,.55,2.47,1.43,5.53-7.95,14.31-1.83,11-2.88-5-5.85Zm103.6,17.19-8.68-2.95-1.8-3.92,10.66-2.62-4.76-2.74-28.71-3.16-18.74-1-1.62,7L501.21,338l-4.94,7,4.91,2.67,3.18,1.73,4.53,6.45,24.75-3.07,1.79-.22,8.88-5.16,1.17-.68-1.16-2.48Zm23.19,5.95,6,4.88,6.32,11.16,8.18-1.12,1.39-10.6-17.14-7.11Z'
                        fill='#fff'
                    />
                </g>
                <motion.g id='sot' variants={gVariatns}>
                    <g id='holo_lights' data-name='holo lights' opacity='0.4'>
                        <path
                            id='holo_2'
                            data-name='holo 2'
                            d='M196.54,237.77a1.5,1.5,0,0,1-.91-.32L152.5,203.6a1.48,1.48,0,0,1-.25-2.07h0a1.47,1.47,0,0,1,2.07-.25h0l42.22,33.13,42.22-33.13a1.48,1.48,0,1,1,1.83,2.32h0l-43.14,33.85A1.5,1.5,0,0,1,196.54,237.77Z'
                            fill={color2}
                        />
                        <path
                            id='holo_1'
                            data-name='holo 1'
                            d='M242.19,188.69l-45.65,43.69-45.65-43.69a1.63,1.63,0,0,1,0-2.31,1.61,1.61,0,0,1,1.17-.5h89a1.63,1.63,0,0,1,1.13,2.81Z'
                            fill={color2}
                        />
                    </g>
                    <g id='device'>
                        <g id='base'>
                            <path
                                id='base_2'
                                data-name='base 2'
                                fill={color1}
                                d='M226.87,245.16h-6.43v-9.07a5.76,5.76,0,0,0-5.76-5.77H178.41a5.77,5.77,0,0,0-5.77,5.77v9.07h-6.43c-.59,0-1.06.73-1.06,1.64s.47,1.65,1.06,1.65h60.66c.59,0,1.07-.74,1.07-1.65S227.46,245.16,226.87,245.16Z'
                            />
                            <path
                                id='base_1'
                                data-name='base 1'
                                d='M175.94,245.16h41.21V236a2.41,2.41,0,0,0-2.42-2.41H178.35a2.41,2.41,0,0,0-2.41,2.41h0Z'
                                fill={color2}
                            />
                        </g>
                        <g id='door'>
                            <path
                                id='door_2'
                                fill={color1}
                                data-name='door 2'
                                d='M191.88,238.56h9.32a7.71,7.71,0,0,1,7.7,7.7v.54a1.64,1.64,0,0,1-1.64,1.65H185.82a1.64,1.64,0,0,1-1.65-1.64h0v-.54A7.72,7.72,0,0,1,191.88,238.56Z'
                            />
                            <path
                                id='door_1'
                                data-name='door 1'
                                d='M205.46,245.16a4.4,4.4,0,0,0-4.26-3.3h-9.32a4.42,4.42,0,0,0-4.27,3.3Z'
                                fill='#fff'
                            />
                        </g>
                    </g>
                    <g id='screen'>
                        <path
                            fill={color1}
                            d='M208.5,221.67H184.59a7,7,0,0,1-7-7V165.11a7,7,0,0,1,7-7H208.5a7,7,0,0,1,7,7v49.56A7,7,0,0,1,208.5,221.67Z'
                        />
                        <path
                            d='M184.59,162.45a2.67,2.67,0,0,0-2.66,2.66v49.56a2.66,2.66,0,0,0,2.66,2.66H208.5a2.67,2.67,0,0,0,2.66-2.66V165.11a2.68,2.68,0,0,0-2.66-2.66Z'
                            fill='#fff'
                        />
                    </g>
                </motion.g>
                <motion.g id='sot-2' data-name='sot' variants={gVariatns}>
                    <g id='holo_lights-2' data-name='holo lights' opacity='0.4'>
                        <path
                            id='holo_2-2'
                            data-name='holo 2'
                            d='M331.88,150.59a1.49,1.49,0,0,1-.91-.31l-43.13-33.85a1.48,1.48,0,0,1-.25-2.07h0a1.47,1.47,0,0,1,2.07-.25h0l42.23,33.13,42.22-33.13a1.47,1.47,0,1,1,1.82,2.32h0L332.8,150.28A1.5,1.5,0,0,1,331.88,150.59Z'
                            fill={color2}
                        />
                        <path
                            id='holo_1-2'
                            data-name='holo 1'
                            d='M377.53,101.52l-45.65,43.69-45.64-43.69a1.63,1.63,0,0,1,1.13-2.81h89a1.63,1.63,0,0,1,1.13,2.81Z'
                            fill={color2}
                        />
                    </g>
                    <g id='device-2' data-name='device'>
                        <g id='base-2' data-name='base'>
                            <path
                                id='base_2-2'
                                data-name='base 2'
                                fill={color1}
                                d='M362.21,158h-6.42v-9.06a5.77,5.77,0,0,0-5.77-5.77H313.75a5.77,5.77,0,0,0-5.77,5.77V158h-6.43c-.59,0-1.06.74-1.06,1.65s.47,1.65,1.06,1.65h60.66c.59,0,1.07-.74,1.07-1.65S362.8,158,362.21,158Z'
                            />
                            <path
                                id='base_1-2'
                                data-name='base 1'
                                d='M311.28,158h41.21v-9.12a2.41,2.41,0,0,0-2.41-2.41H313.69a2.41,2.41,0,0,0-2.41,2.41h0Z'
                                fill={color2}
                            />
                        </g>
                        <g id='door-2' data-name='door'>
                            <path
                                id='door_2-2'
                                fill={color1}
                                data-name='door 2'
                                d='M327.22,151.39h9.32a7.72,7.72,0,0,1,7.71,7.7v.54a1.65,1.65,0,0,1-1.65,1.65H321.17a1.65,1.65,0,0,1-1.65-1.65h0v-.54A7.71,7.71,0,0,1,327.22,151.39Z'
                            />
                            <path
                                id='door_1-2'
                                data-name='door 1'
                                d='M340.81,158a4.41,4.41,0,0,0-4.27-3.29h-9.32A4.39,4.39,0,0,0,323,158Z'
                                fill='#fff'
                            />
                        </g>
                    </g>
                    <g id='screen-2' fill={color1} data-name='screen'>
                        <path
                            fill={color1}
                            d='M343.84,134.5H319.93a7,7,0,0,1-7-7V77.94a7,7,0,0,1,7-7h23.91a7,7,0,0,1,7,7V127.5A7,7,0,0,1,343.84,134.5Z'
                        />
                        <path
                            d='M319.93,75.28a2.67,2.67,0,0,0-2.66,2.66V127.5a2.66,2.66,0,0,0,2.66,2.66h23.91a2.66,2.66,0,0,0,2.66-2.66V77.94a2.67,2.67,0,0,0-2.66-2.66Z'
                            fill='#fff'
                        />
                    </g>
                </motion.g>
                <motion.g id='sot-3' data-name='sot' variants={gVariatns}>
                    <g id='holo_lights-3' data-name='holo lights' opacity='0.4'>
                        <path
                            id='holo_2-3'
                            data-name='holo 2'
                            d='M472.75,221.08a1.44,1.44,0,0,1-.91-.32l-43.13-33.85a1.48,1.48,0,0,1-.25-2.07h0a1.48,1.48,0,0,1,2.07-.25h0l42.23,33.13L515,184.59a1.47,1.47,0,1,1,1.82,2.32h0l-43.13,33.85A1.45,1.45,0,0,1,472.75,221.08Z'
                            fill={color2}
                        />
                        <path
                            id='holo_1-3'
                            data-name='holo 1'
                            d='M518.4,172l-45.65,43.68L427.11,172a1.62,1.62,0,0,1-.05-2.31,1.6,1.6,0,0,1,1.18-.51h89a1.63,1.63,0,0,1,1.63,1.64A1.65,1.65,0,0,1,518.4,172Z'
                            fill={color2}
                        />
                    </g>
                    <g id='device-3' data-name='device'>
                        <g id='base-3' data-name='base'>
                            <path
                                id='base_2-3'
                                data-name='base 2'
                                fill={color1}
                                d='M503.08,228.47h-6.42V219.4a5.78,5.78,0,0,0-5.77-5.77H454.62a5.77,5.77,0,0,0-5.77,5.77v9.07h-6.43c-.59,0-1.06.74-1.06,1.65s.47,1.64,1.06,1.64h60.66c.59,0,1.07-.73,1.07-1.64S503.67,228.47,503.08,228.47Z'
                            />
                            <path
                                id='base_1-3'
                                data-name='base 1'
                                d='M452.15,228.47h41.21v-9.13a2.41,2.41,0,0,0-2.41-2.41H454.56a2.41,2.41,0,0,0-2.41,2.41h0Z'
                                fill={color2}
                            />
                        </g>
                        <g id='door-3' data-name='door'>
                            <path
                                id='door_2-3'
                                fill={color1}
                                data-name='door 2'
                                d='M468.09,221.87h9.32a7.71,7.71,0,0,1,7.7,7.71v.54a1.64,1.64,0,0,1-1.64,1.65H462a1.65,1.65,0,0,1-1.65-1.65h0v-.54A7.71,7.71,0,0,1,468.09,221.87Z'
                            />
                            <path
                                id='door_1-3'
                                data-name='door 1'
                                d='M481.68,228.47a4.42,4.42,0,0,0-4.27-3.3h-9.32a4.42,4.42,0,0,0-4.27,3.3Z'
                                fill='#fff'
                            />
                        </g>
                    </g>
                    <g id='screen-3' fill={color1} data-name='screen'>
                        <path
                            fill={color1}
                            d='M484.71,205H460.8a7,7,0,0,1-7-7V148.42a7,7,0,0,1,7-7h23.91a7,7,0,0,1,7,7V198A7,7,0,0,1,484.71,205Z'
                        />
                        <path
                            d='M460.8,145.77a2.66,2.66,0,0,0-2.66,2.65V198a2.66,2.66,0,0,0,2.66,2.66h23.91a2.66,2.66,0,0,0,2.66-2.66V148.42a2.66,2.66,0,0,0-2.66-2.65Z'
                            fill='#fff'
                        />
                    </g>
                </motion.g>
            </motion.svg>
        </MotionBox>
    );
}
