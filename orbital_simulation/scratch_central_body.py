import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from  vector_class import Vector, CelestialBody, beta_force

pos_a = Vector(0.5, -0.5)
vel_a = Vector(0, 0)
a = CelestialBody(pos_a, vel_a, 0)

pos_b = Vector(0, 0)
vel_b = Vector(0, 0)
b = CelestialBody(pos_b, vel_b, 0)

fig, ax = plt.subplots()
ax.set(xlim = [-1, 1], ylim = [-1, 1])

x_a, y_a = a.get_position()
plot1 = plt.scatter(x_a, y_a)

x_b, y_b = b.get_position()
plot2 = plt.scatter(x_b, y_b)

def updates1(frame):
    # for each frame, update the data stored on each artist.
    acceleration = beta_force(a.get_pos_vector(), b.get_pos_vector(), 0.00001)
    a.upd_vel(acceleration, 1)
    a.upd_pos(1)
    x, y = a.get_position()
    # update the scatter plot:
    data = np.stack([x, y]).T
    plot1.set_offsets(data)
    print(f"{a.get_pos_vector().module()}")
    return plot1


ani = animation.FuncAnimation(fig= fig, func= updates1, frames= 1000, interval= 30)

plt.show()
