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

        transition: { delayChildren: 0.2 },
    },
};
const gVariatns = {
    hidden: {
        x: 0,
        y: 0,
    },
    visible: {
        rotate: [0, -40, 0],
        x: [0, -10, 0],
        y: [0, 10, 0],
        transition: { ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 },
    },
};

export default function About1() {
    return (
        <MotionBox w={['100%', '100%', '50%']} variants={svgVariants}>
            <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 690 400'
                variants={svgVariants}
            >
                <g id='pad'>
                    <rect
                        id='outline'
                        x='493.78'
                        y='102.53'
                        width='53.58'
                        height='15.31'
                        rx='4.46'
                        fill={color1}
                    />
                    <rect
                        id='inside'
                        x='497.6'
                        y='106.35'
                        width='45.93'
                        height='7.65'
                        rx='1.49'
                        fill={color2}
                    />
                </g>
                <motion.g
                    id='hammer'
                    style={{ transformOrigin: 'right' }}
                    variants={gVariatns}
                >
                    <path
                        id='outline-2'
                        data-name='outline'
                        d='M583.15,85.54c-2.68-2.35-19.3-15.6-31.26-24.56h0a41.51,41.51,0,0,0,3-4.56,15.28,15.28,0,0,0,1.5-3.54c.23,0,.46,0,.7,0h0A5.71,5.71,0,0,0,561,50.94l2.51-2.86A5.72,5.72,0,0,0,563,40L548.7,27.49a5.71,5.71,0,0,0-8.06.52l-2.51,2.86a5.66,5.66,0,0,0-1.31,4.83,15.52,15.52,0,0,0-3.32,1.94,53.67,53.67,0,0,0-7.92,7.52A53,53,0,0,0,519.17,54a14.86,14.86,0,0,0-1.48,3.51,5.75,5.75,0,0,0-4.63,1.93l-2.51,2.85a5.72,5.72,0,0,0,.52,8.07l14.28,12.53a5.72,5.72,0,0,0,8.07-.52l2.5-2.86a5.7,5.7,0,0,0,1.32-4.83,15.21,15.21,0,0,0,3.29-1.93,39.25,39.25,0,0,0,4.16-3.56c10.4,10.66,25.7,25.44,28.4,27.81s5.37,3.62,7.67,3.47a8.13,8.13,0,0,0,6.81-7.09C587.67,90.83,586.17,88.19,583.15,85.54Zm-.45,9.75c-.94,1-2.51,2.84-7.09-1.19-2.33-2-17.48-16.62-28.23-27.67h0l1.06-1.2c.37-.41.72-.83,1.08-1.24,12.39,9.28,28.78,22.39,31.09,24.43,2.09,1.84,3.18,3.5,3.13,4.81A3.43,3.43,0,0,1,582.7,95.29Z'
                        fill={color1}
                    />
                    <g id='inside-2' data-name='inside'>
                        <path
                            id='Path_90'
                            data-name='Path 90'
                            d='M538.65,38.93c-.67.07-4.71,2.51-10.18,8.73s-7.37,10.56-7.16,11.49L535.4,71.42c.67-.07,4.72-2.51,10.19-8.74,5.26-6,7.21-10.22,7.17-11.37Z'
                            fill={color2}
                        />
                        <path
                            id='Path_92'
                            data-name='Path 92'
                            d='M517.23,61.31a1.87,1.87,0,0,0-1.3.64l-2.5,2.85a1.9,1.9,0,0,0-.47,1.37,1.83,1.83,0,0,0,.64,1.29L527.88,80a1.89,1.89,0,0,0,2.66-.17L533.05,77a1.89,1.89,0,0,0-.17-2.66L518.6,61.77A1.91,1.91,0,0,0,517.23,61.31Z'
                            fill={color2}
                        />
                        <path
                            id='Path_94'
                            data-name='Path 94'
                            d='M544.81,29.9a1.91,1.91,0,0,0-1.3.64L541,33.4a1.88,1.88,0,0,0,.18,2.65l14.27,12.54a1.91,1.91,0,0,0,2.67-.18l2.5-2.85a1.88,1.88,0,0,0-.17-2.66L546.17,30.37A1.88,1.88,0,0,0,544.81,29.9Z'
                            fill={color2}
                        />
                        <path
                            id='Path_96'
                            data-name='Path 96'
                            d='M583.75,93.23a3.37,3.37,0,0,1-1,2c-.94,1.06-2.51,2.85-7.08-1.18-2.33-2-17.48-16.63-28.24-27.68l1.06-1.19L549.52,64c12.4,9.27,28.78,22.38,31.09,24.42C582.71,90.25,583.79,91.92,583.75,93.23Z'
                            fill={color2}
                        />
                    </g>
                </motion.g>
                <g id='furniture group'>
                    <g id='furniture' stroke='black'>
                        <g id='kafedra'>
                            <path
                                id='back'
                                d='M612.75,135.87v-8l-12.59-10.07H448.56v8h12.58V343.23l-29.47,21.06,16.89,9.64H612.75V353.3l-12.59-10.07V135.87Z'
                                fill='#d8d8d8'
                            />
                            <path
                                id='front'
                                d='M600.17,125.8v-8H431.67v8h12.58V343.23H431.67v20.63h168.5V343.23H587.58V125.8Z'
                                fill='#fff'
                            />
                        </g>
                        <g id='lines'>
                            <line
                                id='Line_1'
                                data-name='Line 1'
                                x1='612.75'
                                y1='135.87'
                                x2='600.17'
                                y2='125.8'
                                fill='none'
                            />
                            <line
                                id='Line_2'
                                data-name='Line 2'
                                x1='600.17'
                                y1='135.87'
                                x2='587.58'
                                y2='125.8'
                                fill='none'
                            />
                            <line
                                id='Line_3'
                                data-name='Line 3'
                                x1='612.75'
                                y1='373.93'
                                x2='600.17'
                                y2='363.86'
                                fill='none'
                            />
                        </g>

                        <g
                            transform='translate(465 200) scale(0.8)'
                            stroke='none'
                        >
                            <path
                                d='M540.1,167.81a8.64,8.64,0,0,1-8.64-8.64V114.29a8.65,8.65,0,0,1,17.29,0v44.88a8.64,8.64,0,0,1-8.65,8.64'
                                transform='translate(-475.57 -105.65)'
                                fill={color1}
                            />
                            <path
                                d='M513.63,177.91a8.64,8.64,0,0,1-8.64-8.64V130.34a8.64,8.64,0,1,1,17.28,0v38.93a8.64,8.64,0,0,1-8.64,8.64'
                                transform='translate(-475.57 -105.65)'
                                fill={color1}
                            />
                            <path
                                d='M566.58,177.91a8.64,8.64,0,0,1-8.64-8.64V127.09a8.64,8.64,0,0,1,17.28,0v42.18a8.64,8.64,0,0,1-8.64,8.64'
                                transform='translate(-475.57 -105.65)'
                                fill={color1}
                            />
                            <path
                                d='M593.05,187.47a8.64,8.64,0,0,1-8.64-8.64V150.44a8.64,8.64,0,0,1,17.28,0v28.39a8.64,8.64,0,0,1-8.64,8.64'
                                transform='translate(-475.57 -105.65)'
                                fill={color1}
                            />
                            <path
                                d='M493.4,199.78a8.66,8.66,0,0,1-7.5-4.32l-9.17-15.89a8.64,8.64,0,1,1,15-8.64l9.17,15.89a8.64,8.64,0,0,1-7.47,13'
                                transform='translate(-475.57 -105.65)'
                                fill={color1}
                            />
                        </g>
                    </g>
                    {/* <g id='opensea_logo' data-name='opensea logo'>
                    <path
                        id='Path_151'
                        data-name='Path 151'
                        d='M553.45,230.89a39.65,39.65,0,1,1-39.65-39.65h0A39.65,39.65,0,0,1,553.45,230.89Z'
                        fill='#2081e2'
                    />
                    <path
                        id='Path_152'
                        data-name='Path 152'
                        d='M493.71,232.22l.17-.27,10.32-16.13a.35.35,0,0,1,.49-.11.47.47,0,0,1,.13.15c1.72,3.86,3.21,8.67,2.51,11.66a17.76,17.76,0,0,1-2,4.43,4.4,4.4,0,0,1-.39.66.34.34,0,0,1-.29.16H494a.35.35,0,0,1-.36-.35A.46.46,0,0,1,493.71,232.22Z'
                        fill='#fff'
                    />
                    <path
                        id='Path_153'
                        data-name='Path 153'
                        d='M539.69,235.22v2.56a.37.37,0,0,1-.22.33c-.8.34-3.53,1.6-4.67,3.18-2.9,4-5.12,9.81-10.07,9.81H504.06a13.29,13.29,0,0,1-13.26-13.31h0v-.23a.36.36,0,0,1,.36-.36h11.52a.4.4,0,0,1,.38.41v0a3.94,3.94,0,0,0,.42,2.21,4.05,4.05,0,0,0,3.63,2.26h5.7v-4.46h-5.64a.35.35,0,0,1-.35-.37.36.36,0,0,1,.06-.2l.2-.3a38.69,38.69,0,0,0,2.06-3.28,25.94,25.94,0,0,0,1.42-2.84c.08-.17.15-.35.21-.52s.23-.6.31-.89.14-.5.21-.74a11.43,11.43,0,0,0,.27-2.6,9.65,9.65,0,0,0-.05-1.08,11.11,11.11,0,0,0-.11-1.16c0-.35-.1-.68-.16-1-.08-.52-.19-1-.32-1.55l-.05-.19c-.1-.36-.18-.69-.29-1-.32-1.11-.69-2.19-1.09-3.21-.14-.4-.3-.79-.46-1.18-.24-.58-.49-1.11-.71-1.61-.12-.23-.22-.44-.32-.65l-.33-.71c-.08-.17-.18-.33-.24-.5l-.7-1.28a.23.23,0,0,1,.09-.31.2.2,0,0,1,.17,0l4.36,1.18h0l.57.16.63.18.24.06v-2.58a2.23,2.23,0,0,1,3.82-1.61,2.3,2.3,0,0,1,.65,1.61v3.84l.47.13a.33.33,0,0,1,.1.06l.49.36.55.46c.42.33.92.77,1.47,1.27l.42.39c.71.66,1.5,1.44,2.26,2.29l.63.74c.21.26.44.52.63.78s.54.69.78,1.06c.11.18.24.36.35.53.31.47.58,1,.84,1.44.11.22.23.47.33.71a11.12,11.12,0,0,1,.66,2,2.2,2.2,0,0,1,.09.43v0a3.29,3.29,0,0,1,.08.62,6.59,6.59,0,0,1-.11,2c-.07.29-.15.57-.24.85a8.6,8.6,0,0,1-.33.84,10.08,10.08,0,0,1-.87,1.66c-.11.2-.24.41-.37.6l-.42.6c-.18.24-.37.5-.57.73s-.35.47-.54.69-.54.63-.81.92a6.89,6.89,0,0,1-.52.56c-.17.2-.35.37-.52.54s-.5.48-.69.66l-.45.41a.34.34,0,0,1-.24.09h-3.47v4.45h4.37a4,4,0,0,0,2.66-1,32.26,32.26,0,0,0,2.7-2.66.37.37,0,0,1,.17-.1l12.06-3.48a.35.35,0,0,1,.44.25A.19.19,0,0,1,539.69,235.22Z'
                        fill='#fff'
                    />
                </g> */}
                </g>
                <g id='sot'>
                    <g id='holo_lights' data-name='holo lights' opacity='0.4'>
                        <path
                            id='holo_2'
                            data-name='holo 2'
                            d='M229.82,298.1a4.85,4.85,0,0,1-3-1.05L84.22,185.15a4.88,4.88,0,0,1-.83-6.85h0a4.88,4.88,0,0,1,6.85-.83h0L229.83,287,369.41,177.47a4.88,4.88,0,0,1,6,7.68h0l-142.6,111.9A4.86,4.86,0,0,1,229.82,298.1Z'
                            fill={color2}
                        />
                        <path
                            id='holo_1'
                            data-name='holo 1'
                            d='M380.73,135.87,229.82,280.29,78.91,135.87a5.4,5.4,0,0,1,3.74-9.3H377a5.4,5.4,0,0,1,3.74,9.3Z'
                            fill={color2}
                        />
                    </g>
                    <g id='device'>
                        <g id='base'>
                            <path
                                id='base_2'
                                data-name='base 2'
                                d='M330.09,322.53H308.84v-30a19.07,19.07,0,0,0-19.07-19.07H169.87a19.07,19.07,0,0,0-19.07,19.07v30H129.55c-2,0-3.52,2.44-3.52,5.45s1.57,5.45,3.52,5.45H330.09c2,0,3.52-2.44,3.52-5.45S332,322.53,330.09,322.53Z'
                                fill={color1}
                            />
                            <path
                                id='base_1'
                                data-name='base 1'
                                d='M161.7,322.53H298V292.36a8,8,0,0,0-8-8H169.68a8,8,0,0,0-8,8h0Z'
                                fill={color2}
                            />
                        </g>
                        <g id='door'>
                            <path
                                id='door_2'
                                data-name='door 2'
                                d='M214.4,300.73h30.82a25.5,25.5,0,0,1,25.47,25.47V328a5.45,5.45,0,0,1-5.45,5.45H194.39a5.45,5.45,0,0,1-5.45-5.45h0V326.2A25.5,25.5,0,0,1,214.4,300.73Z'
                                fill={color1}
                            />
                            <path
                                id='door_1'
                                data-name='door 1'
                                d='M259.32,322.53a14.6,14.6,0,0,0-14.1-10.9H214.4a14.6,14.6,0,0,0-14.1,10.9Z'
                                fill='#fff'
                            />
                        </g>
                    </g>
                    <g id='screen'>
                        <path
                            d='M269.35,244.9H190.3a23.17,23.17,0,0,1-23.15-23.15V57.9A23.18,23.18,0,0,1,190.3,34.75h79.05A23.18,23.18,0,0,1,292.5,57.9V221.75A23.17,23.17,0,0,1,269.35,244.9Z'
                            fill={color1}
                        />
                        <path
                            d='M190.3,49.12a8.81,8.81,0,0,0-8.79,8.79V221.75a8.79,8.79,0,0,0,8.79,8.78h79.05a8.78,8.78,0,0,0,8.78-8.78V57.9a8.79,8.79,0,0,0-8.78-8.78Z'
                            fill='#fff'
                        />
                    </g>
                </g>
            </motion.svg>
        </MotionBox>
    );
}
