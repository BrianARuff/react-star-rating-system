/// <reference types="react" />
interface StarRatingSystemProps {
    clickColor?: string;
    defaultColor?: string;
    hoverColor?: string;
    defaultRating?: number;
    numberOfStars?: number;
    isCustomSubmit?: boolean;
    shouldResetWhenNotClicked?: boolean;
    shouldResetWhenNotHovered?: boolean;
    shouldShowDebugState?: boolean;
    svg?: Record<string, any>;
    container?: React.FunctionComponent<any> | any;
    customClick?: (...rest: any) => any;
    customHover?: (...rest: any) => any;
    customSubmit?: (...rest: any) => any;
}

declare const StarRatingSystem: ({ hoverColor, clickColor, defaultColor, numberOfStars, svg, container, customClick, customHover, customSubmit, shouldResetWhenNotClicked, shouldResetWhenNotHovered, shouldShowDebugState, isCustomSubmit, defaultRating, }: StarRatingSystemProps) => JSX.Element;

export { StarRatingSystem };
