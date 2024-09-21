import matplotlib.pyplot as plt
import numpy as np
import sys
import json

with open('output.json', 'r') as f:
    data = json.load(f)

# print(data[0])
# print(data[1])
# print(data[2])

minAreas = np.array(data[2]).reshape(len(data[0]), len(data[1]))
front, rear = np.meshgrid(data[0], data[1])

fig, ax = plt.subplots(subplot_kw={"projection": "3d"})

ax.plot_surface(front, rear, minAreas)
ax.set_xlabel("Front Spar Position")
ax.set_ylabel("Rear Spar Position")

plt.show()