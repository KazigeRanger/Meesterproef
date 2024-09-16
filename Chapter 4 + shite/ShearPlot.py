import matplotlib.pyplot as plt
import matplotlib
import numpy as np

fig, ax = plt.subplots()

f_s = np.linspace(0, 200, 100)

L_wing = 68.67
h_web = 0.0229843724

t_web = L_wing/(h_web*f_s)

ax.plot(f_s, t_web)

plt.show()