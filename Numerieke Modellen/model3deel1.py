# Define variables for the calculations that don't change if the material changes.
G_max = 4 # The maximal G-force on the drone.
g = 9.81 # m/s^2 | The gravitational acceleration on eart.
m = 3.5 # kg | The mass of the drone.
d = 0.5 # m | The distance from the attachment point of the wing to the fuselage to the center of lift.

h_front = 0.021251 # m | The height of the front spar at a certain location in the wing.
h_rear = 0.02093 # m | The height of the rear spar at a certain location in the wing.

# Calculate things that don't change if the material changes.
L_tot = G_max*g*m # N | Calculate the total lift working on the drone.
L_wing = L_tot/2 # N | Calculate the lift working on one wing of the drone.

M_root = L_wing*d # Nm | The moment moment acting on the wing.

# Define variables that change according to the material
t_webfront = 0.1612 # m | The thickness of the front web. Calculated in chapter 1.
t_webrear = 0.1612 # m | The thickness of the rear web. Calculated in chapter 1.

A_flangefront = 0.3232 # m^2 | The product of t_flangefront and w_flangefront. Calculated in chapter 2.
A_flangerear = 0.3232 # m^2 | The prodcut of t_flangerear and w_flangerear. Calculated in chapter 2.

E_webfront = 8480000 # N/m^2 | The Young's modulus for the front web.
E_webrear = 8480000 # N/m^2 | The Young's modulus for the rear web.
E_flangefront = 8480000 # N/m^2 | The Young's modulus for the front flange.
E_flangerear = 8480000 # N/m^2 | The Young's modulus for the rear flange.

S_weakfront = 25000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0.
S_weakrear = 25000000 # N/m^2 | The weakest of the compressional and tensional strength of laminate 0.

w_flangefront = 0.01 # The starting values of w_flangefront and w_flangerear have no influence whatsoever
w_flangerear = 0.01  # on the resultant bending stiffnesses, moments and forces, so they can be whatever.

print("n| EI_front         | EI_rear          | M_rfront        | M_rrear         | F_flangefront   | F_flangerear")

def calculateValues(t_webfront,t_webrear,A_flangefront,A_flangerear,E_webfront,E_webrear,
                    E_flangefront,E_flangerear,S_weakfront,S_weakrear,frontFlangeForces,rearFlangeForces):

    # Calculate the bending stiffnesses of the front and rear spars.
    EI_front = (E_webfront*t_webfront*h_front**3)/(12)+(E_flangefront*A_flangefront*h_front**2)/(2)
    EI_rear = (E_webrear*t_webrear*h_rear**3)/(12)+(E_flangerear*A_flangerear*h_rear**2)/(2)

    # Calculate the moments acting on the front and rear spars.
    M_rfront = (EI_front*M_root)/(EI_front+EI_rear)
    M_rrear = (EI_rear*M_root)/(EI_front+EI_rear)

    # Calculate the forces acting on the front and rear flanges.
    F_flangefront = M_rfront/h_front
    F_flangerear = M_rrear/h_rear

    # Calculate the thicknesses of the front and rear flanges.
    t_flangefront = F_flangefront/(w_flangefront*S_weakfront)
    t_flangerear = F_flangerear/(w_flangerear*S_weakrear)

    # Calculate the flange areas of the front and rear spars.
    A_flangefront = t_flangefront*w_flangefront
    A_flangerear = t_flangerear*w_flangerear

    frontFlangeForces.append(F_flangefront)
    rearFlangeForces.append(F_flangerear)

    # If you want all the bending stiffnesses, moments and forces to be printed,
    # uncomment the line right under this comment.
    # print(len(frontFlangeForces),EI_front,EI_rear,M_rfront,M_rrear,F_flangefront,F_flangerear)

    if len(frontFlangeForces)==999 or len(rearFlangeForces)==999: # 999 is the maximum recursion depth.
        print(len(frontFlangeForces),EI_front,EI_rear,M_rfront,M_rrear,F_flangefront,F_flangerear)
        return
    else:
        calculateValues(t_webfront,t_webrear,A_flangefront,A_flangerear,E_webfront,E_webrear,
                        E_flangefront,E_flangerear,S_weakfront,S_weakrear,frontFlangeForces,rearFlangeForces)
        return t_webfront,t_webrear,A_flangefront,A_flangerear,E_webfront,E_webrear,E_flangefront,E_flangerear,S_weakfront,S_weakrear

frontFlangeForces = []
rearFlangeForces = []

# Initiate the function loop.
calculateValues(t_webfront,t_webrear,A_flangefront,A_flangerear,E_webfront,E_webrear,
                E_flangefront,E_flangerear,S_weakfront,S_weakrear,frontFlangeForces,rearFlangeForces)
