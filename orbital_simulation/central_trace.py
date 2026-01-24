"""
    Dimensions: [a] = AU/day^2, [r] = AU, [dt] = days
    when using:
    dt should be measured in days,
    1 grid unit = 1 AU
    central body - Sun

    1 km/s = 0.000576 AU/day
"""

import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from  vector_class import Vector, CelestialBody, Trace, CelestialBodyTraced
from vector_class import star_force, sun_force

fig, ax = plt.subplots()
ax.set(xlim = [-2, 2], ylim = [-2, 2])
ax.grid(zorder = 1)
ax.set_aspect(1.0)

# sun
pos_central = Vector(0, 0)
vel_central = Vector(0, 0)
mass_central = 2 * 10 ** 30
central = CelestialBody(pos_central, vel_central, mass_central)
x_b, y_b = central.get_position()
plot2 = plt.scatter(x_b, y_b,  zorder = 2)

# earth
pos_earth = Vector(1, 0)
vel_earth = Vector(0, 0.01728)
earth = CelestialBody(pos_earth, vel_earth, 0)
x_earth, y_earth = earth.get_position()
# plot_e = plt.scatter(x_earth, y_earth, zorder = 2)
#
# history = Trace(61)
# history.update_trace(earth.get_position())
# trace_e,  = plt.plot(x_earth, y_earth, zorder=2)

# earth 2
earth2 = CelestialBodyTraced(pos_earth, vel_earth, 0, 200)
trace_e2,  = plt.plot(x_earth, y_earth, zorder=2)
plot_e2 = plt.scatter(x_earth, y_earth, zorder = 2)

def updates_earth2(frame):
    # for each frame, update the data stored on each artist.
    dt = 1 # days
    acceleration = star_force(earth2.get_pos_vector(), pos_central, 2)
    earth2.upd_vel(acceleration, dt)
    earth2.upd_pos(dt)
    x_e, y_e = earth2.get_position()
    # update the scatter plot:
    data = np.stack([x_e, y_e]).T
    plot_e2.set_offsets(data)
    # update trace
    trace_e2.set_data(earth2.trace.get_x(), earth2.trace.get_y())
    return plot_e2, trace_e2,

# def updates_earth(frame):
#     # for each frame, update the data stored on each artist.
#     dt = 6 # days
#     acceleration = sun_force(earth.get_pos_vector())
#     earth.upd_vel(acceleration, dt)
#     earth.upd_pos(dt)
#     x_e, y_e = earth.get_position()
#     # update the scatter plot:
#     data = np.stack([x_e, y_e]).T
#     plot_e.set_offsets(data)
#     # update trace
#     history.update_trace([x_e, y_e])
#     data = np.array(history.trace).T
#     trace_e.set_data(data[0], data[1])
#     return plot_e, trace_e,

ani = animation.FuncAnimation(fig=fig, func= updates_earth2, frames= 1000, interval= 2, blit=True)

plt.show()