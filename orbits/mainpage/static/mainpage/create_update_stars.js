import { Vector, CelestialBodyTraced,StarTraced, sun_force } from "./classes.js";

export function create_star_html(center, scaling_factor) {
    const r = new Vector(center * 0.5, center);
    const v = new Vector(0, 0);
    const star = new StarTraced(r, v, 1000, 2, "star_name")
    const color = "#2A27F5";
    return [star, color]
}

