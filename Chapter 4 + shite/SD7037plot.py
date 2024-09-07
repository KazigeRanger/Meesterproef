import matplotlib.pyplot as plt
import matplotlib
import numpy as np

unformattedXValues = """250.000000
249.180000
246.767500
242.865000
237.602500
231.125000
223.562500
215.037500
205.652500
195.502500
184.662500
173.235000
161.347500
149.137500
136.732500
124.265000
111.862500
99.655000
87.752500
76.270000
65.312500
54.972500
45.342500
36.502500
28.525000
21.465000
15.365000
10.255000
6.155000
3.080000
1.045000
0.052500
0.317500
2.015000
5.095000
9.500000
15.185000
22.110000
30.210000
39.412500
49.625000
60.740000
72.637500
85.177500
98.220000
111.607500
125.185000
138.797500
152.285000
165.492500
178.262500
190.445000
201.880000
212.410000
221.890000
230.177500
237.147500
242.692500
246.725000
249.177500
250.000000"""

unformattedYValues = """0.000000
0.105000
0.450000
1.090000
2.027500
3.237500
4.662500
6.225000
7.852500
9.470000
11.032500
12.527500
13.930000
15.212500
16.345000
17.292500
18.027500
18.525000
18.760000
18.720000
18.395000
17.782500
16.885000
15.715000
14.287500
12.622500
10.750000
8.715000
6.580000
4.425000
2.340000
0.462500
-0.982500
-2.097500
-3.067500
-3.852500
-4.442500
-4.835000
-5.042500
-5.080000
-4.967500
-4.727500
-4.385000
-3.965000
-3.490000
-2.975000
-2.440000
-1.900000
-1.372500
-0.872500
-0.420000
-0.035000
0.260000
0.455000
0.550000
0.545000
0.462500
0.330000
0.177500
0.052500
0.000000"""

longStringX = unformattedXValues.replace("\n",",")
longStringY = unformattedYValues.replace("\n",",")

stringListX = longStringX.split(',')
stringListY = longStringY.split(',')

SD7037_x = [float(value) for value in stringListX]
SD7037_y = [10+float(value) for value in stringListY]

# Precalc
G_max = 4
g = 9.81 # m/s^2
m = 3.5 # kg

L_tot = G_max*g*m # N
L_wing = L_tot/2 # N

# Define variables for spar coordinates calculations.
h_web = 0.0229843724 # m | NOT MATERIAL DEPENDENT. CONSTANT FOR EVERYTHING.
chordLength = 250 # mm | NOT MATERIAL DEPENDENT. CONSTANT FOR EVERYTHING.

S_shear0 = 101000000 # N/m^2 | MATERIAL DEPENDENT. CHANGES WITH THE MATERIAL.

# Calculate spar web coordinates.
t_w0_m = L_wing/(S_shear0*h_web) # m
t_w0_mm = t_w0_m/1000 # mm

sparXWebCenter = 0.304*chordLength
sparXWebLeft = sparXWebCenter-(t_w0_mm/2)
sparXWebright = sparXWebCenter+(t_w0_mm/2)

sparYWebTop = 28.711991785 # mm
sparYWebBottom = 5.7276196177205 # mm

# Note: I want the spar coordinates to be plotted counter clockwise starting at the left bottom point.
sparXWebCoords = [sparXWebLeft, sparXWebCenter, sparXWebright, sparXWebright, sparXWebCenter, sparXWebLeft, sparXWebLeft]
sparYWebCoords = [sparYWebBottom, sparYWebBottom, sparYWebBottom, sparYWebTop, sparYWebTop, sparYWebTop, sparYWebBottom]

# Calculate the spar flange coordinates for the top flange.
w_f0 = 10.6784852095 # mm
t_f0 = 0.11829089014737811 # mm

sparXTopFlangeRight = sparXWebLeft
sparXTopFlangeLeft = sparXTopFlangeRight - w_f0

sparYTopFlangeTopRight = sparYWebTop
sparYTopFlangeBottomRight = sparYTopFlangeTopRight - t_f0
sparYTopFlangeTopLeft = 28.395
sparYTopFlangeBottomLeft = sparYTopFlangeTopLeft - t_f0

sparXTopFlangeCoords = [sparXTopFlangeLeft, sparXTopFlangeRight, sparXTopFlangeRight, sparXTopFlangeLeft, sparXTopFlangeLeft]
sparYTopFlangeCoords = [sparYTopFlangeBottomLeft, sparYTopFlangeBottomRight, sparYTopFlangeTopRight, sparYTopFlangeTopLeft, sparYTopFlangeBottomLeft]

# Calculate the spar flange coordinates for the bottom flange.
sparXBottomFlangeRight = sparXWebLeft
sparXBottomFlangeLeft = sparXBottomFlangeRight - w_f0

sparYBottomFlangeTopRight = sparYWebBottom + t_f0
sparYBottomFlangeBottomRight = sparYWebBottom
sparYBottomFlangeBottomLeft = 5.40439063338354
sparYBottomFlangeTopLeft = sparYBottomFlangeBottomLeft + t_f0

sparXBottomFlangeCoords = [sparXBottomFlangeLeft, sparXBottomFlangeRight, sparXBottomFlangeRight, sparXBottomFlangeLeft, sparXBottomFlangeLeft]
sparYBottomFlangeCoords = [sparYBottomFlangeBottomLeft, sparYBottomFlangeBottomRight, sparYBottomFlangeTopRight, sparYBottomFlangeTopLeft, sparYBottomFlangeBottomLeft]

fig, ax = plt.subplots()

labels = []
for i in range(len(SD7037_x)):
    labels.append(i)

for i in range(len(SD7037_x)):
    plt.annotate(labels[i], (SD7037_x[i], SD7037_y[i]), textcoords="offset points", xytext=(0,10), ha='center')

ax.plot(SD7037_x, SD7037_y)
ax.plot(sparXWebCoords, sparYWebCoords)
ax.plot(sparXTopFlangeCoords, sparYTopFlangeCoords)
ax.plot(sparXBottomFlangeCoords, sparYBottomFlangeCoords)
ax.plot([122.23983896110667], [15.106955890782697],'o',label='cg')
ax.set_title("SD7037 airfoil shape")
ax.set_xlabel("x (mm)")
ax.set_ylabel("y (mm)")
ax.set_xlim([0,250])
ax.set_ylim([0,40])
ax.grid(True)
ax.xaxis.set_major_locator(matplotlib.ticker.MultipleLocator(10))
ax.xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(5))
ax.yaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(1))
ax.legend()

plt.show()