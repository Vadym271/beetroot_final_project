import { inner_solar_system_setup, draw_setup } from "./sol_sys_setup.js";


export function getCheckboxInfo(document, ctx, half_w, stars, colors_stars, planets, colors_planets){
    const allBoxes = document.querySelectorAll("input[name='planet']");
    const states = Array.from(allBoxes).map(box => box.checked);
    planets = planets.filter((_, i) => states[i] === true);
    colors_planets = colors_planets.filter((_, i) => states[i] === true);
    draw_setup(ctx, half_w, stars, colors_stars, planets, colors_planets);
    return [planets, colors_planets]
}

export function buildStarCheckboxes(document, stars_data) {
    const container = document.getElementById('stars-container');
    container.innerHTML = "";

    stars_data.forEach(star => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        div.innerHTML = `
            <input type="checkbox" id="${star.name}" name="star" value="${star.name}" checked>
            <label for="${star.name}">${star.name}</label>
        `;
        container.appendChild(div);
    });
}

export function getCheckboxStarInfo(document, ctx, half_w, stars, colors_stars, planets, colors_planets){
    const allBoxes = document.querySelectorAll("input[name='star']");
    const states = Array.from(allBoxes).map(box => box.checked);
    stars = stars.filter((_, i) => states[i] === true);
    colors_stars = colors_stars.filter((_, i) => states[i] === true);
    draw_setup(ctx, half_w, stars, colors_stars, planets, colors_planets);
    return [stars, colors_stars]
}

export function updateDeleteMenu(deleteMenu, document, stars){
    deleteMenu.innerHTML = '<option value="" selected disabled> Choose a star... </option>';

    stars.forEach(star => {
        const option = document.createElement('option');
        option.value = star.name;
        option.textContent = star.name;
        deleteMenu.appendChild(option);
    });
}

export function deleteStar(deleteMenu, stars_const, colors_stars_const, stars, colors_stars, ctx, center, planets, colors_planets){
    deleteMenu.addEventListener('change', (event) => {
        const starName = event.target.value;

        stars_const = stars_const.filter(star => star.name !== starName);
        colors_stars_const = colors_stars_const.filter(star => star.name !== starName);
        stars = stars_const.filter(star => star.name !== starName);
        colors_stars = colors_stars_const.filter(star => star.name !== starName);

        draw_setup(ctx, center, stars, colors_stars, planets, colors_planets);

        return [const_stars, colors_stars_const, stars, colors_stars]
    });
}