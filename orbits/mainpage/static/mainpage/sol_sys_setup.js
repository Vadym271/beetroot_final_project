import { Vector, CelestialBodyTraced,StarTraced, sun_force } from "./classes.js";

export function inner_solar_system_setup(center, scaling_factor){

    const k = 0.000576 // 1 km/s = 0.000576 AU/day

    const r_s = new Vector(center, center);
    const v_s = new Vector(0, 0);
    const sun = new StarTraced(r_s, v_s, 1000, 1, "Sun");
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

export function draw_setup(ctx, half_width, stars, colors_stars, planets, colors_planets){
    ctx.clearRect(0, 0, half_width * 2, half_width * 2);
    planets.forEach((object, i) => {
        ctx.beginPath();
        ctx.fillStyle = colors_planets[i];
        ctx.arc(object.get_position()[0], object.get_position()[1], 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        if (object.trace.length !== 0){
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors_planets[i];

            const trace = planets[i].trace.trace;
            ctx.moveTo(trace[0][0], trace[0][1]);

            for (let j = 1; j < trace.length; j++) {
                ctx.lineTo(trace[j][0], trace[j][1]);
            }

            ctx.stroke();
            ctx.closePath();
        }

        drawArrow(ctx, object, colors_planets[i]);
    });

    stars.forEach((object, i) => {
        ctx.beginPath();
        ctx.fillStyle = colors_stars[i];
        ctx.arc(object.get_position()[0], object.get_position()[1], 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if (object.trace.length !== 0){
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors_stars[i];

            const trace = stars[i].trace.trace;
            ctx.moveTo(trace[0][0], trace[0][1]);

            for (let j = 1; j < trace.length; j++) {
                ctx.lineTo(trace[j][0], trace[j][1]);
            }

            ctx.stroke();
            ctx.closePath();
        }
        drawArrow(ctx, object, colors_stars[i]);
    });
}

export function drawArrow(ctx, star, color){
    if (star.get_vel_vector().module() === 0){
        return
    }
    let fromx, fromy, tox, toy;
    [fromx, fromy] = star.get_position();
    [tox, toy] = star.get_pos_vector().add(star.get_vel_vector().mul(100)).get_coordinates();
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    ctx.save();
    ctx.strokeStyle = color;

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = 2;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}