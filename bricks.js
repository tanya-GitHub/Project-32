class Bricks {
    constructor(x, y, width, height){
        var options = {
            'friction':0.5,
            'density':0.5,
            'isStatic': false
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);

        this.image = loadImage("brick-png-11.png");

        this.Visibility = 255;

    }

    display(){
        if(this.body.speed<5){
            var angle = this.body.angle;
            var pos= this.body.position;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            imageMode(CENTER);
            image(this.image, 0,0,this.width, this.height*6.5);
            pop();
          }else{
            World.remove(world, this.body);
            push();
            this.Visibility = this.Visibiliy - 1;
            tint(255,this.Visiblity);
            pop();
          }

    }
  
  };
  