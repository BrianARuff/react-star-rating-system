import React, { useEffect, useState } from 'react';
import { StarProps } from './StarProps';

export const Star = ({
    mouseOverColor,
    defaultColor,
    isHovered,
    getStarId,
    starId,
    hasClicked,
    clickColor,
    svg,
    container: Container,
    defaultRating,
}: StarProps) => {
    const [clickedStarColor, setClickedStarColor] = useState(
        clickColor ? clickColor : "gold"
    );
    const [hoveredStarColor, setHoveredStarColor] = useState(
        mouseOverColor ? mouseOverColor : "yellow"
    );
    const [defaultStarColor, setDefaultStarColor] = useState(
        defaultColor ? defaultColor : "lightGray"
    );

    const [fill, setFill] = useState(defaultStarColor);

    const changeFill = () => {
        if (defaultRating) return;

        if (hasClicked) return;

        if (!starId) return;

        setFill(defaultStarColor || "lightGray");
        if (getStarId) getStarId(starId);
    };

    const handleClick = () => {
        if (!starId) return;

        setFill(defaultStarColor);

        if (getStarId) getStarId(starId, true, hasClicked);

    };

    useEffect(() => {
        if (!defaultRating) {
            setClickedStarColor(clickedStarColor);
            setHoveredStarColor(hoveredStarColor);
            setDefaultStarColor(defaultStarColor);
        }
    }, [
        clickColor,
        defaultColor,
        mouseOverColor,
        hasClicked,
        isHovered,
        clickedStarColor,
        hoveredStarColor,
        defaultStarColor,
        defaultRating,
    ]);

    if (Container) {
        return (
            <Container id="star-container">
                <svg
                    onMouseLeave={changeFill}
                    onMouseEnter={changeFill}
                    onClick={handleClick}
                    width={svg?.width || "45"}
                    height={svg?.height || "45"}
                    viewBox={svg?.viewBox || "0 0 24 24"}
                    id="star-svg"
                    style={{ display: "inline" }}
                    {...svg?.svgProps}
                >
                    <path
                        id="star-path"
                        fill={
                            !isHovered && !defaultRating
                                ? fill
                                : hasClicked && isHovered
                                    ? clickColor || "rgb(255,215,0)"
                                    : isHovered
                                        ? mouseOverColor || "rgba(255,215,0, 0.5)"
                                        : (defaultRating && starId && defaultRating >= starId)
                                            ? clickColor || "gold"
                                            : fill
                        }
                        d={
                            svg?.d ||
                            "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                        }
                        {...svg?.pathProps}
                    />
                </svg>
            </Container>
        );
    }

    return (
        <div style={{ display: "inline" }}>
            <svg
                onMouseLeave={changeFill}
                onMouseEnter={changeFill}
                onClick={handleClick}
                width={svg?.width || "45"}
                height={svg?.height || "45"}
                viewBox={svg?.viewBox || "0 0 24 24"}
                id="star-svg"
                style={{ display: "inline" }}
                {...svg?.svgProps}
            >
                <path
                    id="star-path"
                    fill={
                        !isHovered && !defaultRating
                            ? fill
                            : hasClicked && isHovered
                                ? clickColor || "rgb(255,215,0)"
                                : isHovered
                                    ? mouseOverColor || "rgba(255,215,0, 0.5)"
                                    : (defaultRating && starId && defaultRating >= starId)
                                        ? clickColor || "gold"
                                        : fill
                    }
                    d={
                        svg?.d ||
                        "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                    }
                    {...svg?.pathProps}
                />
            </svg>
        </div>
    );
};