class Ground {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        let options = {
            IsStatic: true
        }

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
        World.add(world, this.body)
    }

    display() {
        rectMode(CENTER)
        rect(this.x, this.y, this.w, this.h)
    }
}
