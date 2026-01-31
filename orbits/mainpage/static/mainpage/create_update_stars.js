import { Vector, CelestialBodyTraced,StarTraced, sun_force } from "./classes.js";
import { drawArrow } from "./sol_sys_setup.js";


export function create_star_html(center, scaling_factor) {
    const r = new Vector(center * 0.5, center);
    const v = new Vector(0, 0);
    const star = new StarTraced(r, v, 1000, 2, "star_name")
    const color = "#2A27F5";
    return [star, color]
}

export function draw_new_star(ctx, center, new_star, new_color) {
    ctx.beginPath();
    ctx.fillStyle = new_color;
    ctx.arc(new_star.get_position()[0], new_star.get_position()[1], 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    drawArrow(ctx, new_star, new_color);
}