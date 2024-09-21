import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(subplot_kw={"projection": "3d"})

n = 100
xs = np.linspace(0, 10, n)
ys = np.linspace(0, 10, n)
zs = xs*ys

ax.set_xlabel("x axis")
ax.set_ylabel("y axis")

ax.plot(xs, ys, zs)

plt.show()