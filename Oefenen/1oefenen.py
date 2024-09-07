import matplotlib.pyplot as plt
import numpy as np

# ax.plot(x, function_1, label="quadratic")
# ax.plot(x, function_2, label="constante waarde")

# ax.set_xlabel("Input")
# ax.set_ylabel("Output")
# ax.set_title("Kwadratische Grafiek")

# ax.legend()

# plt.show()

x = np.linspace(0,4*np.pi,100)

function_1 = x**2
function_2 = 0*x+2
function_3 = np.sqrt(x)
function_4 = np.sin(x)+0.5

fig, (ax1, ax2) = plt.subplots(1, 2)

def plotter(ax, function_1, function_2):
    ax.text(0.25,30,r"$\sigma_i=3\mu$")
    ax.grid(True)
    ax.legend([function_1,function_2],['function_1','function_2'])

    out1 = ax.plot(x, function_1, color="green", linestyle=":", label="function_1")
    out2 = ax.plot(x, function_2, color="red", linestyle="--", label="function_2")

    return out1, out2

plotter(ax1, function_1, function_2)
plotter(ax2, function_3, function_4)

plt.show()