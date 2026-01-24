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
from orbital_simulation.vector_class import Vector, CelestialBody, Trace, CelestialBodyTraced
from orbital_simulation.vector_class import sun_force


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

    # updating graphs
    coords = [objects[i].get_position() for i in range(len(objects))]
    plot.set_offsets(coords)
    for i, graph in enumerate(traces):
        graph.set_data(objects[i + 1].get_xtrace(), objects[i + 1].get_ytrace())
    return plot, traces[0], traces[1], traces[2], traces[3],



k = 0.000576
fig, ax = plt.subplots()

# sun
pos_central = Vector(0, 0)
vel_central = Vector(0, 0)
mass_central = 2 * 10 ** 30
central = CelestialBody(pos_central, vel_central, mass_central)


# earth
pos_earth = Vector(1, 0)
vel_earth = Vector(0, 0.01728)
earth = CelestialBodyTraced(pos_earth, vel_earth, 0, 61 * 6)
trace_e, = plt.plot(earth.get_position()[0], earth.get_position()[1], color="blue")


# venus
pos_venus = Vector(0.723, 0)
vel_venus = Vector(0, 0.02016)
venus = CelestialBodyTraced(pos_venus, vel_venus, 0, 44 * 6)
trace_v, = plt.plot(venus.get_position()[0], venus.get_position()[1], color="brown")


# mercury
pos_mercury = Vector(0.387, 0)
vel_mercury = Vector(0, k * 47.36)
mercury = CelestialBodyTraced(pos_mercury, vel_mercury, 0, 24 * 6)
trace_mer, = plt.plot(mercury.get_position()[0], mercury.get_position()[1], color="grey")


# mars
pos_mars = Vector(1.523, 0)
vel_mars = Vector(0, k * 24.08)
mars = CelestialBodyTraced(pos_mars, vel_mars, 0, 93 * 7 + 10)
trace_mars, = plt.plot(mars.get_position()[0], mars.get_position()[1], color="red")



# NEED TO UPDATE WHEN OBJECT ADDED
objects = [central, mercury, venus, earth, mars]
colors = ["yellow", "grey", "brown", "blue", "red"]
sizes = [80, 10, 10, 10, 10]
traces = [trace_mer, trace_v, trace_e, trace_mars]


coords = [objects[i].get_position() for i in range(len(objects))]
coords = np.array(coords).T


ax.set(xlim=[-6,6], ylim=[-6,6])
ax.grid(zorder = 1)
ax.set_aspect(1.0)
fig.set_figwidth(8)
fig.set_figheight(8)

plot = plt.scatter(coords[0], coords[1], color=colors, zorder = 2, s=sizes)

ani = animation.FuncAnimation(fig=fig, func=update_graph, frames=1000, interval=1, blit=True)
plt.show()