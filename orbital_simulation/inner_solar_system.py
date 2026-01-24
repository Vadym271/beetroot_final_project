"""
    Dimensions: [a] = AU/day^2, [r] = AU, [dt] = days
    when using:
    dt should be measured in days,
    1 grid unit = 1 AU
    central body - Sun, planet interaction are not considered

    1 km/s = 0.000576 AU/day <- k
"""
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from  vector_class import Vector, CelestialBody, sun_force

def update_pos(object: CelestialBody, dt):
    r = object.get_pos_vector()
    a = sun_force(r)
    object.upd_vel(a, dt)
    object.upd_pos(dt)


def update_graph(frame):
    dt = 1 # days
    for object in objects:
        if object is not central:
            update_pos(object, dt)
    coords = [objects[i].get_position() for i in range(len(objects))]
    plot.set_offsets(coords)

    return plot,

def update_trace(object: CelestialBody):
    pass
k = 0.000576

# sun
pos_central = Vector(0, 0)
vel_central = Vector(0, 0)
mass_central = 2 * 10 ** 30
central = CelestialBody(pos_central, vel_central, mass_central)

# earth
pos_earth = Vector(1, 0)
vel_earth = Vector(0, 0.01728)
earth = CelestialBody(pos_earth, vel_earth, 0)


# venus
pos_venus = Vector(0.723, 0)
vel_venus = Vector(0, 0.02016)
venus = CelestialBody(pos_venus, vel_venus, 0)

# mercury
pos_mercury = Vector(0.387, 0)
vel_mercury = Vector(0, k * 47.36)
mercury = CelestialBody(pos_mercury, vel_mercury, 0)

# mars
pos_mars = Vector(1.523, 0)
vel_mars = Vector(0, k * 24.08)
mars = CelestialBody(pos_mars, vel_mars, 0)

# NEED TO UPDATE WHEN OBJECT ADDED
objects = [central, mercury, venus, earth, mars]
colors = ["yellow", "grey", "brown", "blue", "red"]
sizes = [80, 10, 10, 10, 10]

coords = [objects[i].get_position() for i in range(len(objects))]
coords = np.array(coords).T

fig, ax = plt.subplots()
ax.set(xlim=[-6,6], ylim=[-6,6])
ax.grid(zorder = 1)
ax.set_aspect(1.0)
fig.set_figwidth(8)
fig.set_figheight(8)

plot = plt.scatter(coords[0], coords[1], color=colors, zorder = 2, s=sizes)

ani = animation.FuncAnimation(fig=fig, func=update_graph, frames=1000, interval=10, blit=True)
plt.show()