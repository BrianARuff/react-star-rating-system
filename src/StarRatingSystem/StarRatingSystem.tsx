import React, { BaseSyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { Star } from '../Star/Star';
import { StarRatingSystemProps } from './StarRatingSystemProps';

export const StarRatingSystem = ({
    hoverColor,
    clickColor,
    defaultColor,
    numberOfStars = 5,
    svg,
    container,
    customClick = () => { },
    customHover = () => { },
    customSubmit = () => { },
    shouldResetWhenNotClicked = false,
    shouldResetWhenNotHovered = false,
    shouldShowDebugState = false,
    isCustomSubmit = false,
    defaultRating = 0,
}: StarRatingSystemProps) => {
    const initialStars = useMemo(() => {
        let list = [];
        for (let i = 0; i < numberOfStars; i++) {
            list[i] = {
                id: i + 1,
                hoverState: false,
            };
        }
        return list;
    }, [numberOfStars]);

    const [starStates, setStarStates] = useState(initialStars);

    const [hoveredStarId, setHoveredStarId] = useState(0);

    const [clickedStarId, setClickedStarId] = useState(0);

    const [hasClicked, setHasClicked] = useState(false);

    const [rating, setRating] = useState(0);

    const getStarId = (starId: number, isClick: boolean, hasClicked: boolean) => {
        if (hasClicked) {
            setHasClicked(false);
            setDefaultStarsState();
        }

        if (starId === 0) {
            return setDefaultStarsState();
        }

        if (isClick && !hasClicked) {
            setHasClicked(true);
            return setClickedStarId(starId);
        }

        if (hoveredStarId && !hasClicked) {
            setHasClicked(false);
            setStars(hoveredStarId);
            customHover(hoveredStarId);
            setHoveredStarId(0);
        }

        setHoveredStarId(starId);
    };

    const setDefaultStarsState = useCallback(() => {
        setStarStates(initialStars);
    }, [initialStars]);

    const setStars = useCallback(
        (id: number) => {
            const starsToHighlight = starStates
                .slice(0, id)
                .map((star) => ({ ...star, hoverState: true }));
            const starsToNotHighlight = starStates
                .slice(id, starStates.length)
                .map((star) => ({ ...star, hoverState: false }));

            setStarStates([...starsToHighlight, ...starsToNotHighlight]);
        },
        [starStates]
    );

    const fetchHoverData = useCallback(async () => {
        if (hoveredStarId && !hasClicked) {
            await customHover(hoveredStarId); // keep await here
            setHasClicked(false);
            setStars(hoveredStarId);
            setHoveredStarId(0);
        }
    }, [hoveredStarId, hasClicked, customHover, setStars]);

    const fetchSubmitData = useCallback(async () => {
        if (isCustomSubmit && !defaultRating) {
            await customSubmit(rating);
        }
    }, [customSubmit, rating, isCustomSubmit, defaultRating]);

    useEffect(() => {
        !defaultRating && fetchHoverData();
    }, [
        hoveredStarId,
        hasClicked,
        setStars,
        customHover,
        fetchHoverData,
        defaultRating,
    ]);

    const fetchClickData = useCallback(
        async (clickedStarId: number) => {
            await customClick(rating); // keep await here
            setStars(clickedStarId);
            setRating(clickedStarId);
            setClickedStarId(0);
            setHoveredStarId(0);
            setClickedStarId(0);

            return clickedStarId;
        },
        [customClick, setStars, rating]
    );

    useEffect(() => {
        if (clickedStarId && !defaultRating) {
            fetchClickData(clickedStarId);
        }
    }, [clickedStarId, setStars, customClick, fetchClickData, defaultRating]);

    const windowClickAndHoverEvent = useCallback(
        (e: BaseSyntheticEvent | Event, isClick = false) => {
            if (!e.target.id.includes("star-") && !hasClicked && !isClick) {
                setHasClicked(false);
                setClickedStarId(0);
                setRating(0);
                return setDefaultStarsState();
            }
        },
        [setDefaultStarsState, hasClicked]
    );

    useEffect(() => {
        if (!defaultRating) {
            if (shouldResetWhenNotClicked) {
                window.addEventListener("click", windowClickAndHoverEvent);
            }

            if (shouldResetWhenNotHovered) {
                window.addEventListener("mousemove", windowClickAndHoverEvent);
            }

            if (shouldResetWhenNotClicked || shouldResetWhenNotHovered) {
                return () => {
                    window.removeEventListener("click", (e) =>
                        windowClickAndHoverEvent(e, true)
                    );

                    window.removeEventListener("mousemove", windowClickAndHoverEvent);
                };
            }
        }
    }, [
        shouldResetWhenNotClicked,
        shouldResetWhenNotHovered,
        windowClickAndHoverEvent,
        clickedStarId,
        defaultRating,
    ]);

    useEffect(() => {
        fetchSubmitData();
    }, [
        isCustomSubmit,
        customSubmit,
        rating,
        fetchSubmitData,
        hasClicked,
        defaultRating,
    ]);

    return (
        <>
            {shouldShowDebugState && <h1>Rating: {rating || defaultRating}</h1>}
            {starStates.map((star) => {
                return (
                    <Star
                        key={star.id}
                        starId={star.id}
                        isHovered={star.hoverState}
                        mouseOverColor={hoverColor}
                        defaultColor={defaultColor}
                        clickColor={clickColor}
                        clickedStarId={rating}
                        hasClicked={hasClicked || Boolean(defaultRating)}
                        getStarId={getStarId}
                        svg={svg}
                        container={container}
                        defaultRating={defaultRating}
                    />
                );
            })}
        </>
    );
}