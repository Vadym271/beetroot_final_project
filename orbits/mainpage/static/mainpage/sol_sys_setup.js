import { Vector, CelestialBodyTraced,StarTraced, sun_force } from "./classes.js";

export function inner_solar_system_setup(center, scaling_factor){

    const k = 0.000576 // 1 km/s = 0.000576 AU/day

    const r_s = new Vector(center, center);
    const v_s = new Vector(0, 0);
    const sun = new StarTraced(r_s, v_s, 1000, 1);
    sun.trace.update_trace(r_s.get_coordinates());

    var r_e = new Vector(0.387 * scaling_factor + center, center);
    var v_e = new Vector(0, - 47.36 * k * scaling_factor);
    const mercury = new CelestialBodyTraced(r_e, v_e, 1000);
    mercury.trace.update_trace(r_e.get_coordinates());

    var r_e = new Vector(0.723 * scaling_factor + center, center);
    var v_e = new Vector(0, - 0.02016 * scaling_factor);
    const venus = new CelestialBodyTraced(r_e, v_e, 1000);
    venus.trace.update_trace(r_e.get_coordinates());

    var r_e = new Vector(1 * scaling_factor + center, center);
    var v_e = new Vector(0, - 0.01728 * scaling_factor);
    const earth = new CelestialBodyTraced(r_e, v_e, 1000);
    earth.trace.update_trace(r_e.get_coordinates());

    var r_e = new Vector(1.523 * scaling_factor + center, center);
    var v_e = new Vector(0, - 24.08 * k * scaling_factor);
    const mars = new CelestialBodyTraced(r_e, v_e, 1000);
    mars.trace.update_trace(r_e.get_coordinates());

    const objects = [sun, mercury, venus, earth, mars];
    const colors_objects = ["#F5EE27", "#635F5E", "#A8651D" ,"#2787F5", "#E52612"];

    return [objects, colors_objects]
}

export function draw_setup(ctx, stars, colors_stars, planets, colors_planets){
    planets.forEach((object, i) => {
        ctx.beginPath();
        ctx.fillStyle = colors_planets[i];
        ctx.arc(object.get_position()[0], object.get_position()[1], 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });

    stars.forEach((object, i) => {
        ctx.beginPath();
        ctx.fillStyle = colors_stars[i];
        ctx.arc(object.get_position()[0], object.get_position()[1], 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
}