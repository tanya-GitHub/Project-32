class Slingshot{
    
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.01,
            length: 1
        }
        this.pointB = pointB
        this.bodyA = bodyA
        this.sling = Constraint.create(options);
    
        World.add(world, this.sling);
 

    }
    
    attach(body){
        this.sling.bodyA = body;
    }

    fly(){
        this.sling.bodyA = null;
    }

    display(){
        //48, 22, 8
        if(this.sling.bodyA){
            var pointA = this.bodyA.position;
            var pointB = this.pointB;
            line(pointA.x, pointA.y, pointB.x, pointB.y);

        }

    }
    
}