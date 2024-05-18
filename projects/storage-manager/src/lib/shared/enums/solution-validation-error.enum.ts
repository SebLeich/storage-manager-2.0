export enum SolutionValidationError {
    NoSolution, 
    NoContainer, 
    GoodBeforeContainerXCoord, 
    GoodOutOfContainerXCoord, 
    GoodBeforeContainerYCoord, 
    GoodOutOfContainerYCoord, 
    GoodBeforeContainerZCoord, 
    GoodOutOfContainerZCoord, 
    GoodOverlap,
    GoodLongerThanContainer,
    GoodWiderThanContainer,
    GoodHigherThanContainer
}