import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np

fig, ax = plt.subplots()
plot1 = plt.scatter((0.1), (0.1))
plot2 = plt.scatter((0.9), (0.8))

def updates1(frame):
    # for each frame, update the data stored on each artist.
    step = 0.001
    x = 0.1 + frame * step
    y = 0.1 + frame * step
    # update the scatter plot:
    data = np.stack([x, y]).T
    plot1.set_offsets(data)
    return plot1

def updates2(frame):
    # for each frame, update the data stored on each artist.
    step = - 0.001
    x = 0.9 + frame * step
    y = 0.8 + frame * step
    # update the scatter plot:
    data = np.stack([x, y]).T
    plot2.set_offsets(data)
    return plot2

ani = animation.FuncAnimation(fig= fig, func= updates1, frames= 1000, interval= 30)
ani2 = animation.FuncAnimation(fig= fig, func= updates2, frames= 1000, interval= 30)

plt.show()
