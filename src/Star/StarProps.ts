export interface StarProps {
    mouseOverColor?: string;
    defaultColor?: string;
    isHovered?: boolean;
    getStarId?: (...rest: any) => any;
    clickedStarId: number;
    starId?: number;
    hasClicked?: boolean;
    clickColor?: string;
    svg?: Record<string, any>;
    container?: React.FunctionComponent<any> | any;
    defaultRating?: number;
}