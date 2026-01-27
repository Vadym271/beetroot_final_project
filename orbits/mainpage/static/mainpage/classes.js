// rewritten in java code from vector_class.py

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    mul(num) {
        return new Vector(this.x * num, this.y * num);
    }

    div(num) {
        return this.mul(1 / num);
    }

    dot(vector2) {
        return this.x * vector2.x + this.y * vector2.y;
    }

    module() {
        return Math.sqrt(this.dot(this));
    }

    get_coordinates() {
        return [this.x, this.y];
    }

    ort() {
        const mag = this.module();
        if (mag === 0) return new Vector(0, 0);
        return new Vector(this.x / mag, this.y / mag);
    }
}
class Trace{
    constructor(limit){
        this.trace = [];
        this.max = limit;
        this.length = 0;
    }

    update_trace(el){
        if (this.length < this.max){
            this.trace.push(el);
            this.length = this.length + 1;
        } else {
            this.trace.splice(0, 1);
            this.trace.push(el);
          }
    }
}


export class CelestialBody {
  constructor(position, velocity){
  this.position = position;
  this.velocity = velocity;
  }

  upd_pos(dt){
    this.position = this.position.add(this.velocity.mul(dt));
  }

  upd_vel(a, dt){
    this.velocity = this.velocity.add(a.mul(dt));
  }

  get_position(){
    return this.position.get_coordinates();
  }

  get_pos_vector(){
    return this.position;
  }

  get_vel_vector(){
    return this.velocity;
  }
}

export class CelestialBodyTraced extends CelestialBody{
    constructor(r0, v0, limit){
        super(r0, v0);
        this.trace = new Trace(limit);
    }

    upd_pos(dt){
        this.position = this.position.add(this.velocity.mul(dt));
        this.trace.update_trace(this.get_position());
    }
}

export class StarTraced extends CelestialBodyTraced{
    constructor(r0, v0, limit, mass, name){
        // mass is measured in solar masses
        super(r0, v0, limit);
        this.mass = mass
        this.name = name
    }
}

export function sun_force(r1, r2, sc_fac) {
    // r1 is an object that experiences acceleration
    // scaled from function with the same name in vector_class.py
    // scaling factor is needed in 3 power: r^2, and another one from AU in units of original function
    // [a] = px / day^2
    var r12 = r2.sub(r1);
    if (r12.module() < 1){
        return null // indicates collision
    }
    if (r12.module() !== 0){
        var acceleration = r12.ort().mul(3 * 10**(-4) * sc_fac**3 / (Math.pow(r12.module(), 2) + 25));
    } else {
        var acceleration = new Vector(0, 0)
    }
    return acceleration;
}

