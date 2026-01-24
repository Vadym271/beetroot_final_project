import numpy as np

class Vector:
    """
    mathematical 2D vector with all necessary properties
    """
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, num):
        return Vector(self.x * num, self.y * num)

    def __rmul__(self, num):
        return self.__mul__(num)

    def __truediv__(self, num):
        return self.__mul__(1/num)

    def dot(self, vector2):
        return self.x * vector2.x + self.y * vector2.y

    def module(self):
        return np.sqrt(self.dot(self))

    def get_coordinates(self):
        return self.x, self.y

    def ort(self):
        return Vector(self.x / self.module(), self.y / self.module())

    def __repr__(self):
        return str((self.x, self.y))


class CelestialBody:
    def __init__(self, position: Vector, velocity: Vector, mass):
        self.position = position
        self.velocity = velocity
        self.mass = mass

    def upd_pos(self, dt):
        self.position += self.velocity * dt

    def upd_vel(self, acceleration, dt):
        self.velocity += acceleration * dt

    def get_position(self):
        return self.position.get_coordinates()

    def get_pos_vector(self):
        return self.position

    def get_vel_vector(self):
        return self.velocity


class Trace:
    def __init__(self, limit: int):
        self.trace = []
        self.max_len = limit
        self.length = 0

    def update_trace(self, element):
        if self.length < self.max_len:
            self.trace += [element]
            self.length += 1
        else:
            self.trace.pop(0)
            self.trace += [element]

    def get_x(self):
        temp = np.array(self.trace)
        return temp.T[0]

    def get_y(self):
        temp = np.array(self.trace)
        return temp.T[1]

class CelestialBodyTraced(CelestialBody):
    """
    CelestialBody class, but it keeps track of its movement via Trace class
    """
    def __init__(self, position: Vector, velocity: Vector, mass, limit: int):
        super().__init__(position, velocity, mass)
        self.trace = Trace(limit)

    def upd_pos(self, dt):
        self.position += self.velocity * dt
        self.trace.update_trace(self.get_position())

    def get_xtrace(self):
        return self.trace.get_x()

    def get_ytrace(self):
        return self.trace.get_y()

def beta_force(r1: Vector, r2: Vector, k):
    """
    :r1: body that experiences accelaration
    :param k: for proportion to work out
    :return: acceleration that 1 BODY experiences because of central field of the 2 body
    """
    r12 = r2 - r1
    if r12.module() < 1.0 * 10 ** (-7): # why don't you work in action?
        print("There was a collision")
    a = k / r12.module() ** 2 * r12.ort()
    return a

def sun_force(r: Vector):
    """
    Dimensions: [a] = AU/day^2, [r] = AU, [dt] = days
    when using:
    dt should be measured in days,
    1 grid unit = 1 AU
    central body - Sun sits at (0,0)
    """
    a = - 3 * 10 ** (-4) / r.module() ** 2 * r.ort() #AU/day^2
    return a

def star_force(r1: Vector, r2: Vector, k):
    """
    Calculates gravitational pull experienced by the FIRST object.
    takes mass of a second object expressed in number of solar masses
    :param r1: position of 1 object
    :param r2: position of 2 object
    :param k: stars mass in solar masses, k = M_star/M_sun
    :return:
    """
    r12 = r1 - r2
    a = sun_force(r12) * k
    return a

# a = Trace(100)
#
# a.update_trace([1,2])
# a.update_trace([2,3])
# print(a.trace)