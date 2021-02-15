class Ground{

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        var options = {
            isStatic: true
        }
        this.image = loadImage("ground-clipart.png");

        this.body = Bodies.rectangle(x,y,width,height, options);
        World.add(world, this.body);

    }

    display(){
        fill("green");

        imageMode(CENTER);
        image(this.image, 0, 0+575, this.width*2, this.height);
    }



}
