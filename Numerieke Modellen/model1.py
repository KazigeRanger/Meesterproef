import matplotlib.pyplot as plt
import matplotlib
import numpy as np

fig, ax = plt.subplots()

G_max = 4 # The maximal G-force on the drone.
g = 9.81 # m/s^2 | The gravitational acceleration on eart.
m = 3.5 # kg | The mass of the drone.

L_tot = G_max*g*m # N | Calculate the total lift working on the drone.
L_wing = L_tot/2 # N | Calculate the lift working on one wing of the drone.

h_front = 0.021251 # m | The height of the front spar at a certain location in the wing.
h_rear = 0.02093 # m | The height of the rear spar at a certain location in the wing.

S_0 = 101000000 # N/m^2 | The shear strength of laminate 0.
S_90 = 101000000 # N/m^2 | The shear strength of laminate 90.
S_0_90_0 = 101100000 # N/m^2 | The shear strength of laminate 0.
S_45_n45_n45_45 = 212000000 # N/m^2 | The shear strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_n45_0_n45_45 = 176486400 # N/m^2 | The shear strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_0_n45_90_90_n45_0_45 = 124000000 # N/m^2 | The shear strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_0_n45_n45_0_45 = 152900000 # N/m^2 | The shear strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_90_n45_n45_90_45 = 152900000 # N/m^2 | The shear strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.

t_front = np.linspace(0,0.00004,100)

def plotter(ax, S):
    # Customise the graph
    ax.xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.125e-5))
    ax.yaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.125e-5))
    # ax.xaxis.set_minor_formatter(matplotlib.ticker.ScalarFormatter(useMathText=True))
    # ax.yaxis.set_minor_formatter(matplotlib.ticker.ScalarFormatter(useMathText=True))
    ax.set_xlim([0,4e-5])
    ax.set_ylim([0,4e-5])
    ax.set_title('Front vs rear web thickness')
    ax.set_ylabel('Rear web thickness [m]')
    ax.set_xlabel('Front web thickness [m]')
    ax.grid(True)

    t_rear = L_wing/(S*h_front)-(h_rear*t_front)/h_front # m | Calculate the thickness of the rear spar.

    out = ax.plot(t_front, t_rear)
    return out

plotter(ax, S_0)
plotter(ax, S_90)
plotter(ax, S_0_90_0)
plotter(ax, S_45_n45_n45_45)
plotter(ax, S_45_n45_0_n45_45)
plotter(ax, S_45_0_n45_90_90_n45_0_45)
plotter(ax, S_45_0_n45_n45_0_45)
plotter(ax, S_45_90_n45_n45_90_45)

labels=['Laminate 0', 'Laminate 90', 'Laminate 0/90/0', 'Laminate 45/-45/-45/45', 
        'Laminate 45/-45/0/-45/45', 'Laminate 45/0/-45/90/90/-45/0/45', 
        'Laminate 45/0/-45/-45/0/45', 'Laminate 45/90/-45/-45/90/45']
ax.legend(labels)

# Add note
import textwrap

note = 'Note that some lines lie exactly on one another, because the shear strengths of their according materials are the same.'
wrapped_note = "\n".join(textwrap.wrap(note, width=35))
ax.text(3.4e-5,2e-5,wrapped_note, fontsize=12, va='center', ha='center', bbox=dict(facecolor='white', alpha=1))

plt.show()