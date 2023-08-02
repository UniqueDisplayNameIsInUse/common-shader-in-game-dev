import { _decorator, CCFloat, Component, Material, Node, v3, v4, Vec3, Vec4 } from 'cc';
const { ccclass, property, executeInEditMode} = _decorator;

@ccclass('Vestigial')
@executeInEditMode(true)
export class Vestigial extends Component {

    @property({type:[Material]})
    materials: Material[] = [];

    direction:Vec3 = v3();    

    @property({type:CCFloat, slide:true, range:[1, 5], step:0.001})
    length:number = 1.0;

    lastPosition:Vec3 = v3();    

    uniform:Vec4 = v4();

    start() {
        this.lastPosition.set(this.node.worldPosition);
    }

    update(deltaTime: number) {
        Vec3.subtract(this.direction, this.lastPosition, this.node.worldPosition);
        
        this.direction.normalize();
        this.uniform.set(this.direction.x, this.direction.y, this.direction.z, this.length);
        for(let m of this.materials){            
            m.setProperty("direction", this.uniform);
        }
    }
    
    protected lateUpdate(dt: number): void {
        this.lastPosition.set(this.node.worldPosition);
    }
}


