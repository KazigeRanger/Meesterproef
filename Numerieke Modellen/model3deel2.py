import matplotlib.pyplot as plt
import matplotlib
import numpy as np

fig, (ax1, ax2) = plt.subplots(1,2,figsize=(10, 5))

G_max = 4 # The maximal G-force on the drone.
g = 9.81 # m/s^2 | The gravitational acceleration on eart.
m = 3.5 # kg | The mass of the drone.

L_tot = G_max*g*m # N | Calculate the total lift working on the drone.
L_wing = L_tot/2 # N | Calculate the lift working on one wing of the drone.

h_webfront = 0.021251 # m | The height of the front spar at a certain location in the wing.
h_webrear = 0.02093 # m | The height of the rear spar at a certain location in the wing.

# Define converged values from part 1 of this model: laminate 0.
F_flangefront0 = 826.637732181766 # N
F_flangerear0 = 801.1524870236644 # N

# Define converged values from part 1 of this model: laminate 0.
F_flangefront90 =  826.637732181766
F_flangerear90 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront0_90_0 =  826.637732181766
F_flangerear0_90_0 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront45_n45_n45_45 =  826.637732181766
F_flangerear45_n45_n45_45 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront45_n45_0_n45_45 =  826.637732181766
F_flangerear45_n45_0_n45_45 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront45_0_n45_90_90_n45_0_45 =  826.637732181766
F_flangerear45_0_n45_90_90_n45_0_45 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront45_0_n45_n45_0_45 =  826.637732181766
F_flangerear45_0_n45_n45_0_45 =  801.1524870236644

# Define converged values from part 1 of this model: laminate 0.
F_flangefront45_90_n45_n45_90_45 =  826.637732181766
F_flangerear45_90_n45_n45_90_45 =  801.1524870236644

# Define material properties of: laminate 0.
E_webfront0 = 122500000000 # N/m^2 | The Young's modulus for the front web.
E_webrear0 = 122500000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront0 = 122500000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear0 = 122500000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront0 = 1278000000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear0 = 1278000000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 90.
E_webfront90 = 8480000000 # N/m^2 | The Young's modulus for the front web.
E_webrear90 = 8480000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront90 = 8480000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear90 = 8480000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront90 = 25000000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear90 = 25000000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 0/90/0.
E_webfront0_90_0 = 84800000000 # N/m^2 | The Young's modulus for the front web.
E_webrear0_90_0 = 84800000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront0_90_0 = 84800000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear0_90_0 = 84800000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront0_90_0 = 116000000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear0_90_0 = 116000000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 45/-45/-45/45.
E_webfront45_n45_n45_45 = 18300000000 # N/m^2 | The Young's modulus for the front web.
E_webrear45_n45_n45_45 = 18300000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront45_n45_n45_45 = 18300000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear45_n45_n45_45 = 18300000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront45_n45_n45_45 = 157000000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear45_n45_n45_45 = 157000000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 45/-45/0/-45/45.
E_webfront45_n45_0_n45_45 = 39400000000 # N/m^2 | The Young's modulus for the front web.
E_webrear45_n45_0_n45_45 = 39400000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront45_n45_0_n45_45 = 39400000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear45_n45_0_n45_45 = 39400000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront45_n45_0_n45_45 = 188000000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear45_n45_0_n45_45 = 188000000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 45/0/-45/90/90/-45/0/45.
E_webfront45_0_n45_90_90_n45_0_45 = 50000000000 # N/m^2 | The Young's modulus for the front web.
E_webrear45_0_n45_90_90_n45_0_45 = 50000000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront45_0_n45_90_90_n45_0_45 = 50000000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear45_0_n45_90_90_n45_0_45 = 50000000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront45_0_n45_90_90_n45_0_45 = 151600000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear45_0_n45_90_90_n45_0_45 = 151600000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 45/0/-45/-45/0/45.
E_webfront45_0_n45_n45_0_45 = 53500000000 # N/m^2 | The Young's modulus for the front web.
E_webrear45_0_n45_n45_0_45 = 53500000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront45_0_n45_n45_0_45 = 53500000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear45_0_n45_n45_0_45 = 53500000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront45_0_n45_n45_0_45 = 263200000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear45_0_n45_n45_0_45 = 263200000 # N/m^2 | The weakest of the compressional and tensional strength.

# Define material properties of: laminate 45/90/-45/-45/90/45.
E_webfront45_90_n45_n45_90_45 = 23200000000 # N/m^2 | The Young's modulus for the front web.
E_webrear45_90_n45_n45_90_45 = 23200000000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront45_90_n45_n45_90_45 = 23200000000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear45_90_n45_n45_90_45 = 23200000000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront45_90_n45_n45_90_45 = 73100000 # N/m^2 | The weakest of the compressional and tensional strength.
S_weakrear45_90_n45_n45_90_45 = 73100000 # N/m^2 | The weakest of the compressional and tensional strength.

domainRear0 = L_wing/(S_weakrear0*h_webrear)
domainFront0 = L_wing/(S_weakfront0*h_webfront)

domainRear90 = L_wing/(S_weakrear90*h_webrear)
domainFront90 = L_wing/(S_weakfront90*h_webfront)

domainRear0_90_0 = L_wing/(S_weakrear0_90_0*h_webrear)
domainFront0_90_0 = L_wing/(S_weakfront0_90_0*h_webfront)

domainRear45_n45_n45_45 = L_wing/(S_weakrear45_n45_n45_45*h_webrear)
domainFront45_n45_n45_45 = L_wing/(S_weakfront45_n45_n45_45*h_webfront)

domainRear45_n45_0_n45_45 = L_wing/(S_weakrear45_n45_0_n45_45*h_webrear)
domainFront45_n45_0_n45_45 = L_wing/(S_weakfront45_n45_0_n45_45*h_webfront)

domainRear45_0_n45_90_90_n45_0_45 = L_wing/(S_weakrear45_0_n45_90_90_n45_0_45*h_webrear)
domainFront45_0_n45_90_90_n45_0_45 = L_wing/(S_weakfront45_0_n45_90_90_n45_0_45*h_webfront)

domainRear45_0_n45_n45_0_45 = L_wing/(S_weakrear45_0_n45_n45_0_45*h_webrear)
domainFront45_0_n45_n45_0_45 = L_wing/(S_weakfront45_0_n45_n45_0_45*h_webfront)

domainRear45_90_n45_n45_90_45 = L_wing/(S_weakrear45_90_n45_n45_90_45*h_webrear)
domainFront45_90_n45_n45_90_45 = L_wing/(S_weakfront45_90_n45_n45_90_45*h_webfront)

#
PLACEHOLDERt_webfront0 = np.linspace(domainRear0,0,100)
PLACEHOLDERt_webrear0 = np.linspace(domainFront0,0,100)

PLACEHOLDERt_webfront90 = np.linspace(domainRear90,0,100)
PLACEHOLDERt_webrear90 = np.linspace(domainFront90,0,100)

PLACEHOLDERt_webfront0_90_0 = np.linspace(domainRear0_90_0,0,100)
PLACEHOLDERt_webrear0_90_0 = np.linspace(domainFront0_90_0,0,100)

PLACEHOLDERt_webfront45_n45_n45_45 = np.linspace(domainRear45_n45_n45_45,0,100)
PLACEHOLDERt_webrear45_n45_n45_45 = np.linspace(domainFront45_n45_n45_45,0,100)

PLACEHOLDERt_webfront45_n45_0_n45_45 = np.linspace(domainRear45_n45_0_n45_45,0,100)
PLACEHOLDERt_webrear45_n45_0_n45_45 = np.linspace(domainFront45_n45_0_n45_45,0,100)

PLACEHOLDERt_webfront45_0_n45_90_90_n45_0_45 = np.linspace(domainRear45_0_n45_90_90_n45_0_45,0,100)
PLACEHOLDERt_webrear45_0_n45_90_90_n45_0_45 = np.linspace(domainFront45_0_n45_90_90_n45_0_45,0,100)

PLACEHOLDERt_webfront45_0_n45_n45_0_45 = np.linspace(domainRear45_0_n45_n45_0_45,0,100)
PLACEHOLDERt_webrear45_0_n45_n45_0_45 = np.linspace(domainFront45_0_n45_n45_0_45,0,100)

PLACEHOLDERt_webfront45_90_n45_n45_90_45 = np.linspace(domainRear45_90_n45_n45_90_45,0,100)
PLACEHOLDERt_webrear45_90_n45_n45_90_45 = np.linspace(domainFront45_90_n45_n45_90_45,0,100)


#
w_flangefront = np.linspace(0,0.01,100)
w_flangerear = np.linspace(0,0.01,100)

def calculateValues():
    ax1.set_title('Web vs flange thickness for the front spar')
    ax1.set_ylabel('Flange thickness [m]')
    ax1.set_xlabel('Web thickness [m]')
    ax1.grid(True)
    ax2.set_title('Web vs flange thickness for the rear spar')
    ax2.set_ylabel('Flange thickness [m]')
    ax2.set_xlabel('Web thickness [m]')
    ax2.grid(True)

    ax1.xaxis.set_minor_locator(matplotlib.ticker.AutoMinorLocator())
    ax1.yaxis.set_minor_locator(matplotlib.ticker.AutoMinorLocator())
    ax2.xaxis.set_minor_locator(matplotlib.ticker.AutoMinorLocator())
    ax2.yaxis.set_minor_locator(matplotlib.ticker.AutoMinorLocator())

    # ax1.set_ylim([0,0.35])
    # ax2.set_ylim([0,0.35])
    # ax1.set_xlim([0,0.00014])
    # ax2.set_xlim([0,0.00014])
    
    #######################
    t_webfront0 = L_wing/(S_weakfront0*h_webfront)-(h_webrear*PLACEHOLDERt_webrear0)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear0 = L_wing/(S_weakrear0*h_webrear)-(h_webfront*PLACEHOLDERt_webfront0)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront0 = F_flangefront0/(w_flangefront*S_weakfront0)
    t_flangerear0 = F_flangerear0/(w_flangerear*S_weakrear0)

    #######################
    t_webfront90 = L_wing/(S_weakfront90*h_webfront)-(h_webrear*PLACEHOLDERt_webrear90)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear90 = L_wing/(S_weakrear90*h_webrear)-(h_webfront*PLACEHOLDERt_webfront90)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront90 = F_flangefront90/(w_flangefront*S_weakfront90)
    t_flangerear90 = F_flangerear90/(w_flangerear*S_weakrear90)

    #######################
    t_webfront0_90_0 = L_wing/(S_weakfront0_90_0*h_webfront)-(h_webrear*PLACEHOLDERt_webrear0_90_0)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear0_90_0 = L_wing/(S_weakrear0_90_0*h_webrear)-(h_webfront*PLACEHOLDERt_webfront0_90_0)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront0_90_0 = F_flangefront0_90_0/(w_flangefront*S_weakfront0_90_0)
    t_flangerear0_90_0 = F_flangerear0_90_0/(w_flangerear*S_weakrear0_90_0)

    #######################
    t_webfront45_n45_n45_45 = L_wing/(S_weakfront45_n45_n45_45*h_webfront)-(h_webrear*PLACEHOLDERt_webrear45_n45_n45_45)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear45_n45_n45_45 = L_wing/(S_weakrear45_n45_n45_45*h_webrear)-(h_webfront*PLACEHOLDERt_webfront45_n45_n45_45)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront45_n45_n45_45 = F_flangefront45_n45_n45_45/(w_flangefront*S_weakfront45_n45_n45_45)
    t_flangerear45_n45_n45_45 = F_flangerear45_n45_n45_45/(w_flangerear*S_weakrear45_n45_n45_45)

    #######################
    t_webfront45_n45_0_n45_45 = L_wing/(S_weakfront45_n45_0_n45_45*h_webfront)-(h_webrear*PLACEHOLDERt_webrear45_n45_0_n45_45)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear45_n45_0_n45_45 = L_wing/(S_weakrear45_n45_0_n45_45*h_webrear)-(h_webfront*PLACEHOLDERt_webfront45_n45_0_n45_45)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront45_n45_0_n45_45 = F_flangefront45_n45_0_n45_45/(w_flangefront*S_weakfront45_n45_0_n45_45)
    t_flangerear45_n45_0_n45_45 = F_flangerear45_n45_0_n45_45/(w_flangerear*S_weakrear45_n45_0_n45_45)

    #######################
    t_webfront45_0_n45_90_90_n45_0_45 = L_wing/(S_weakfront45_0_n45_90_90_n45_0_45*h_webfront)-(h_webrear*PLACEHOLDERt_webrear45_0_n45_90_90_n45_0_45)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear45_0_n45_90_90_n45_0_45 = L_wing/(S_weakrear45_0_n45_90_90_n45_0_45*h_webrear)-(h_webfront*PLACEHOLDERt_webfront45_0_n45_90_90_n45_0_45)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront45_0_n45_90_90_n45_0_45 = F_flangefront45_0_n45_90_90_n45_0_45/(w_flangefront*S_weakfront45_0_n45_90_90_n45_0_45)
    t_flangerear45_0_n45_90_90_n45_0_45 = F_flangerear45_0_n45_90_90_n45_0_45/(w_flangerear*S_weakrear45_0_n45_90_90_n45_0_45)

    #######################
    t_webfront45_0_n45_n45_0_45 = L_wing/(S_weakfront45_0_n45_n45_0_45*h_webfront)-(h_webrear*PLACEHOLDERt_webrear45_0_n45_n45_0_45)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear45_0_n45_n45_0_45 = L_wing/(S_weakrear45_0_n45_n45_0_45*h_webrear)-(h_webfront*PLACEHOLDERt_webfront45_0_n45_n45_0_45)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront45_0_n45_n45_0_45 = F_flangefront45_0_n45_n45_0_45/(w_flangefront*S_weakfront45_0_n45_n45_0_45)
    t_flangerear45_0_n45_n45_0_45 = F_flangerear45_0_n45_n45_0_45/(w_flangerear*S_weakrear45_0_n45_n45_0_45)

    #######################
    t_webfront45_90_n45_n45_90_45 = L_wing/(S_weakfront45_90_n45_n45_90_45*h_webfront)-(h_webrear*PLACEHOLDERt_webrear45_90_n45_n45_90_45)/h_webfront # m | Calculate the thickness of the rear spar.
    t_webrear45_90_n45_n45_90_45 = L_wing/(S_weakrear45_90_n45_n45_90_45*h_webrear)-(h_webfront*PLACEHOLDERt_webfront45_90_n45_n45_90_45)/h_webrear # m | Calculate the thickness of the rear spar.

    t_flangefront45_90_n45_n45_90_45 = F_flangefront45_90_n45_n45_90_45/(w_flangefront*S_weakfront45_90_n45_n45_90_45)
    t_flangerear45_90_n45_n45_90_45 = F_flangerear45_90_n45_n45_90_45/(w_flangerear*S_weakrear45_90_n45_n45_90_45)

    ###########
    out1 = ax1.plot(t_webfront0,t_flangefront0)
    out2 = ax2.plot(t_webrear0,t_flangerear0)
    # out1 = ax2.plot(PLACEHOLDERt_webfront0,t_webrear0)
    # out2 = ax1.plot(PLACEHOLDERt_webrear0,t_webfront0)

    ###########
    out3 = ax1.plot(t_webfront90,t_flangefront90)
    out4 = ax2.plot(t_webrear90,t_flangerear90)
    # out3 = ax2.plot(PLACEHOLDERt_webfront90,t_webrear90)
    # out4 = ax1.plot(PLACEHOLDERt_webrear90,t_webfront90)

    ###########
    out5 = ax1.plot(t_webfront0_90_0,t_flangefront0_90_0)
    out6 = ax2.plot(t_webrear0_90_0,t_flangerear0_90_0)
    # out5 = ax2.plot(PLACEHOLDERt_webfront0_90_0,t_webrear0_90_0)
    # out6 = ax1.plot(PLACEHOLDERt_webrear0_90_0,t_webfront0_90_0)

    ###########
    out7 = ax1.plot(t_webfront45_n45_n45_45,t_flangefront45_n45_n45_45)
    out8 = ax2.plot(t_webrear45_n45_n45_45,t_flangerear45_n45_n45_45)
    # out7 = ax2.plot(PLACEHOLDERt_webfront45_n45_n45_45,t_webrear45_n45_n45_45)
    # out8 = ax1.plot(PLACEHOLDERt_webrear45_n45_n45_45,t_webfront45_n45_n45_45)

    ###########
    out9 = ax1.plot(t_webfront45_n45_0_n45_45,t_flangefront45_n45_0_n45_45)
    out10 = ax2.plot(t_webrear45_n45_0_n45_45,t_flangerear45_n45_0_n45_45)
    # out9 = ax2.plot(PLACEHOLDERt_webfront45_n45_0_n45_45,t_webrear45_n45_0_n45_45)
    # out10 = ax1.plot(PLACEHOLDERt_webrear45_n45_0_n45_45,t_webfront45_n45_0_n45_45)

    ###########
    out11 = ax1.plot(t_webfront45_0_n45_90_90_n45_0_45,t_flangefront45_0_n45_90_90_n45_0_45)
    out12 = ax2.plot(t_webrear45_0_n45_90_90_n45_0_45,t_flangerear45_0_n45_90_90_n45_0_45)
    # out11 = ax2.plot(PLACEHOLDERt_webfront45_0_n45_90_90_n45_0_45,t_webrear45_0_n45_90_90_n45_0_45)
    # out12 = ax1.plot(PLACEHOLDERt_webrear45_0_n45_90_90_n45_0_45,t_webfront45_0_n45_90_90_n45_0_45)

    ###########
    out13 = ax1.plot(t_webfront45_0_n45_n45_0_45,t_flangefront45_0_n45_n45_0_45)
    out14 = ax2.plot(t_webrear45_0_n45_n45_0_45,t_flangerear45_0_n45_n45_0_45)
    # out13 = ax2.plot(PLACEHOLDERt_webfront45_0_n45_n45_0_45,t_webrear45_0_n45_n45_0_45)
    # out14 = ax1.plot(PLACEHOLDERt_webrear45_0_n45_n45_0_45,t_webfront45_0_n45_n45_0_45)

    ###########
    out15 = ax1.plot(t_webfront45_90_n45_n45_90_45,t_flangefront45_90_n45_n45_90_45)
    out16 = ax2.plot(t_webrear45_90_n45_n45_90_45,t_flangerear45_90_n45_n45_90_45)
    # out15 = ax2.plot(PLACEHOLDERt_webfront45_90_n45_n45_90_45,t_webrear45_90_n45_n45_90_45)
    # out16 = ax1.plot(PLACEHOLDERt_webrear45_90_n45_n45_90_45,t_webfront45_90_n45_n45_90_45)

    return out1,out2,out3,out4,out5,out6,out7,out8,out9,out10,out11,out12,out13,out14,out15,out16

calculateValues()

labels=['Laminate 0', 'Laminate 90', 'Laminate 0/90/0', 'Laminate 45/-45/-45/45', 'Laminate 45/-45/0/-45/45', 
        'Laminate 45/0/-45/90/90/-45/0/45', 'Laminate 45/0/-45/-45/0/45', 'Laminate 45/90/-45/-45/90/45']
ax1.legend(labels)
ax2.legend(labels)

plt.show()