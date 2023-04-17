// For `type` badge

interface TypeColorMap {
    [key: string]: string
}

export const typeColorMap: TypeColorMap = {
    movie: "lightYellow",
    series: "lightPink",
    episode: "lightPurple"
}

// To define badge color, check whether the movie/series is rated or not.
export function isNotRated(value: string): boolean {
    return value === "N/A" || value === "Not Rated"
}