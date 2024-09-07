import matplotlib.pyplot as plt
import matplotlib
import numpy as np

fig, ax = plt.subplots()

# Define variables.
G_max = 4 # The maximal G-force on the drone.
g = 9.81 # m/s^2 | The gravitational acceleration on eart.
m = 3.5 # kg | The mass of the drone.

L_tot = G_max*g*m # N | Calculate the total lift working on the drone.
L_wing = L_tot/2 # N | Calculate the lift working on one wing of the drone.

h_spar = 0.021251 # m | The height of the front spar at a certain location in the wing.

d = 0.5 # m | The distance from the attachment point of the wing to the fuselage and the center of lift of the wing.

S_0 = 1278000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0.
S_90 = 25000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 90.
S_0_90_0 = 116000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0/90/0.
S_45_n45_n45_45 = 157000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_n45_0_n45_45 = 188000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_0_n45_90_90_n45_0_45 = 151600000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_0_n45_n45_0_45 = 263200000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.
S_45_90_n45_n45_90_45 = 73100000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0. Note: n denotes a negative, since '-' isn't accepted.

M_root = L_wing*d # Nm | Calculate the moment at the root of the wing.
F_flange = M_root/h_spar # N | Calculate the force on the spar.

w_flange = np.linspace(0,0.01,1000)

def plotter(ax, S):
    ax.xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.0005))
    ax.yaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.0005))
    ax.set_xlim([0,0.01])
    ax.set_ylim([0,0.01])
    ax.set_title('Flange width vs thickness')
    ax.set_ylabel('Flange thickness [m]')
    ax.set_xlabel('Flange width [m]')
    ax.grid(True)

    t_flange = F_flange/(w_flange*S)

    out = ax.plot(w_flange, t_flange)
    return out

plotter(ax, S_0)
plotter(ax, S_90)
plotter(ax, S_0_90_0)
plotter(ax, S_45_n45_n45_45)
plotter(ax, S_45_n45_0_n45_45)
plotter(ax, S_45_0_n45_90_90_n45_0_45)
plotter(ax, S_45_0_n45_n45_0_45)
plotter(ax, S_45_90_n45_n45_90_45)

labels=['Laminate 0', 'Laminate 90', 'Laminate 0/90/0', 'Laminate 45/-45/-45/45', 'Laminate 45/-45/0/-45/45', 
        'Laminate 45/0/-45/90/90/-45/0/45', 'Laminate 45/0/-45/-45/0/45', 'Laminate 45/90/-45/-45/90/45']
ax.legend(labels)

plt.show()

print(F_flange/(0.0106874852095*S_0))
