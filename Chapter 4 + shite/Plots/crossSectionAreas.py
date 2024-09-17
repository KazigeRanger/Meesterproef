import matplotlib.pyplot as plt
import matplotlib
import matplotlib.ticker

xFrontVertices = [0.076, 0.0653125, 0.0549725, 0.0453425, 0.0365025, 0.028525, 0.021465, 0.015365, 0.010255, 0.006155, 0.00308, 0.001045, 0.0000525, 0.0003175, 0.002015, 0.005095, 0.0095, 0.015185, 0.02211, 0.03021, 0.0394125, 0.049625, 0.06074, 0.0726375, 0.076]
yFrontVertices = [0.028711991786447635, 0.028395, 0.0277825, 0.026885, 0.025715, 0.0242875, 0.0226225, 0.02075, 0.018715, 0.01658, 0.014425, 0.01234, 0.0104625, 0.0090175, 0.0079025, 0.0069325, 0.0061475, 0.0055575, 0.005165, 0.0049575, 0.00492, 0.0050325, 0.0052725, 0.005615, 0.00572761961722488]

xEnclosedVertices = [0.15, 0.1491375, 0.1367325, 0.124265, 0.1118625, 0.099655, 0.0877525, 0.07627, 0.076, 0.076, 0.0851775, 0.09822, 0.1116075, 0.125185, 0.1387975, 0.15]
yEnclosedVertices = [0.025121905712530715, 0.0252125, 0.026345, 0.0272925, 0.0280275, 0.028525, 0.02876, 0.02872, 0.028711991786447635, 0.00572761961722488, 0.006035, 0.00651, 0.007025, 0.00756, 0.0081, 0.008538132993512512]

xRearVertices = [0.25, 0.24918, 0.2467675, 0.242865, 0.2376025, 0.231125, 0.2235625, 0.2150375, 0.2056525, 0.1955025, 0.1846625, 0.173235, 0.1613475, 0.15, 0.15, 0.1654925, 0.1782625, 0.190445, 0.20188, 0.21241, 0.22189, 0.2301775, 0.2371475, 0.2426925, 0.246725, 0.2491775, 0.25]
yRearVertices = [0.01, 0.010105, 0.01045, 0.01109, 0.0120275, 0.0132375, 0.0146625, 0.016225, 0.0178525, 0.01947, 0.0210325, 0.0225275, 0.02393, 0.025121905712530715, 0.008538132993512512, 0.0091275, 0.00958, 0.009965, 0.01026, 0.010455, 0.01055, 0.010545, 0.0104625, 0.01033, 0.0101775, 0.0100525, 0.01]

SD7037_x = [250.0, 249.18, 246.7675, 242.865, 237.6025, 231.125, 223.5625, 215.0375, 205.6525, 195.5025, 184.6625, 173.235, 161.3475, 149.1375, 136.7325, 124.265, 111.8625, 99.655, 87.7525, 76.27, 65.3125, 54.9725, 45.3425, 36.5025, 28.525, 21.465, 15.365, 10.255, 6.155, 3.08, 1.045, 0.0525, 0.3175, 2.015, 5.095, 9.5, 15.185, 22.11, 30.21, 39.4125, 49.625, 60.74, 72.6375, 85.1775, 98.22, 111.6075, 125.185, 138.7975, 152.285, 165.4925, 178.2625, 190.445, 201.88, 212.41, 221.89, 230.1775, 237.1475, 242.6925, 246.725, 249.1775, 250.0]
SD7037_y = [10.0, 10.105, 10.45, 11.09, 12.0275, 13.2375, 14.6625, 16.225, 17.8525, 19.47, 21.0325, 22.5275, 23.93, 25.2125, 26.345, 27.2925, 28.0275, 28.525, 28.76, 28.72, 28.395, 27.7825, 26.885, 25.715, 24.2875, 22.622500000000002, 20.75, 18.715, 16.58, 14.425, 12.34, 10.4625, 9.0175, 7.9025, 6.9325, 6.1475, 5.5575, 5.165, 4.9575, 4.92, 5.0325, 5.2725, 5.615, 6.035, 6.51, 7.025, 7.5600000000000005, 8.1, 8.6275, 9.1275, 9.58, 9.965, 10.26, 10.455, 10.55, 10.545, 10.4625, 10.33, 10.1775, 10.0525, 10.0]

fig, axd = plt.subplot_mosaic(
    [
        ['A', 'A', 'A'],  # 'A' spans all 3 columns in the top row
        ['B', 'C', 'D']   # 'B', 'C', 'D' each take one column in the bottom row
    ],
    figsize=(10, 6)
)

# Top plot spanning all 3 columns
axd['A'].plot(SD7037_x, SD7037_y)
axd['A'].set_title('SD7037 Airfoil Shape')
axd['A'].grid(True)

# Bottom row plots
axd['B'].plot(xFrontVertices, yFrontVertices)
axd['B'].set_title('Front Area')
axd['B'].grid(True)
axd['B'].xaxis.set_major_locator(matplotlib.ticker.MultipleLocator(0.01))
axd['B'].xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.005))
axd['B'].set_ylim([0.003,0.030])

axd['C'].plot(xEnclosedVertices, yEnclosedVertices)
axd['C'].set_title('Enclosed Area')
axd['C'].grid(True)
axd['C'].xaxis.set_major_locator(matplotlib.ticker.MultipleLocator(0.01))
axd['C'].xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.005))
axd['C'].set_ylim([0.003,0.030])

axd['D'].plot(xRearVertices, yRearVertices)
axd['D'].set_title('Rear Area')
axd['D'].grid(True)
axd['D'].xaxis.set_major_locator(matplotlib.ticker.MultipleLocator(0.01))
axd['D'].xaxis.set_minor_locator(matplotlib.ticker.MultipleLocator(0.005))
axd['D'].set_ylim([0.003,0.030])

plt.show()