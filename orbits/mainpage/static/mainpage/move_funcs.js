import { Vector, CelestialBodyTraced, StarTraced, sun_force } from "./classes.js";


export function update_planets(ctx, planets, stars, colors, scaling_factor, dt){
    planets.forEach((object, i) => {
        let [a, _] = combined_force(object.get_pos_vector(), stars, scaling_factor);
        if (a == null){
            planets = collision_planet(object, planets)
            colors = colors.filter((c, index) => index !== i);
        } else {
            object.upd_vel(a, dt);
            object.upd_pos(dt);

            ctx.beginPath();
            ctx.fillStyle = colors[i];
            ctx.arc(object.get_position()[0], object.get_position()[1], 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors[i];

            const trace = object.trace.trace;
            ctx.moveTo(trace[0][0], trace[0][1]);

            for (let j = 1; j < trace.length; j++) {
                ctx.lineTo(trace[j][0], trace[j][1]);
            }

            ctx.stroke();
            ctx.closePath();
        }
    })
    return [planets, colors]
}

export function update_stars(ctx, stars, colors, scaling_factor, dt){
    if (stars.length > 1){
        stars.forEach((object, i) => {
            const otherStars = stars.filter((_, index) => index !== i);
            let [a, star_collided] = combined_force(object.get_pos_vector(), otherStars, scaling_factor);
            if (a == null){
                [stars, colors] = collision_stars(object, star_collided, stars, colors);
                var new_star_color = colors[i];
                colors = colors.filter((_, index) => index !== i || stars[index] !== star_collided);
                colors.push(new_star_color);

            } else {
                object.upd_vel(a, dt);
                object.upd_pos(dt);

                ctx.beginPath();
                ctx.fillStyle = colors[i];
                ctx.arc(object.get_position()[0], object.get_position()[1], 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = colors[i];

                const trace = object.trace.trace;
                ctx.moveTo(trace[0][0], trace[0][1]);

                for (let j = 1; j < trace.length; j++) {
                    ctx.lineTo(trace[j][0], trace[j][1]);
                }

                ctx.stroke();
                ctx.closePath();
            }
        })
    }
    else {
        ctx.beginPath();
        ctx.fillStyle = colors[0];
        ctx.arc(stars[0].get_position()[0], stars[0].get_position()[1], 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    return [stars, colors]
}

function combined_force(r_obj, stars, sc_fac) {
    // sum of forces that act on the given object
    var a = new Vector(0, 0);
    for (var star of stars){
        var r_s = star.get_pos_vector()
        var a_s = sun_force(r_obj, r_s, sc_fac);
        if (a_s == null){
            return [null, star]
        }
        a = a.add(a_s.mul(star.mass));
    }
    return [a, null]
}

function collision_stars(star1, star2, stars, colors){
    // defines collision of stars. a rule for detecting one is in sun_force function
    // deletes two collided stars and adds the result of their merge
    // velocity of new star is given by conservation of momentum, mass: M = M1 + M2
    // position of new star given by position of the first argument star

    const idx1 = stars.indexOf(star1);
    const idx2 = stars.indexOf(star2);
    const indicesToRemove = [idx1, idx2];
    const new_star_color = colors[idx1];

    const M = star1.mass + star2.mass
    const p1 = star1.get_vel_vector().mul(star1.mass)
    const p2 = star2.get_vel_vector().mul(star2.mass)
    const v = p1.add(p2).div(M);

    const star = new StarTraced(star1.position, v, 1000, M)

    const new_stars = stars.filter((_, index) => !indicesToRemove.includes(index));
    const new_colors = colors.filter((_, index) => !indicesToRemove.includes(index));
    stars = new_stars;
    colors = new_colors;

    stars.push(star);
    colors.push(new_star_color);
    return [stars, colors]
}

function collision_planet(planet, planets){
    // defines collision of a star and a planet. a rule for detecting one is in sun_force function
    // since M_star >> M_planet we can assume that star absorbs planet and doesn't change its properties

    var new_planets = planets.filter((obj) => obj !== planet)
    return new_planets
}