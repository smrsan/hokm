import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useStateRef from "../hooks/useStateRef";
import { Pagination } from "swiper/modules";
import PlayingCard from "./PlayingCard/PlayingCard";

import "swiper/css";
import "swiper/css/pagination";

const _initCards = [1, 21, 32, 4, 40, 52, 7, 16, 46, 31, 23, 50, 11];

const YourHand = ({ initCards = _initCards }) => {
    const [cards, setCards] = useStateRef({});

    useEffect(() => {
        const cards = {};

        for (let i = 0; i < initCards.length; i++) {
            const num = initCards[i];
            cards[num] = {
                isDrawn: false,
                index: i,
                num,
                drawnIndex: 0,
            };
        }

        setCards(cards);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCards]);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 8,
                top: "auto",
                left: 0,
                right: 0,
            }}
        >
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={8}
                grabCursor={true}
                modules={[Pagination]}
                pagination={{ enabled: false }}
            >
                {Object.entries(cards)
                    .sort(([, a], [, b]) => a.index - b.index)
                    .map(([cardNum]) => (
                        <SwiperSlide key={cardNum}>
                            <PlayingCard cardNum={cardNum} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </Box>
    );
};

export default YourHand;
