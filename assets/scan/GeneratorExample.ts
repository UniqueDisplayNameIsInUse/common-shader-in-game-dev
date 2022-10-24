import { _decorator, Component, Node, RenderTexture, Scene, director, Material, Camera, Sprite, CCFloat, math, TERRAIN_HEIGHT_BASE, Mat4, macro, EventTouch, input, Input, Vec4, physics, geometry, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GeneratorExample')
export class GeneratorExample extends Component {

    @property(Sprite)
    renderRtSprite: Sprite | null = null;

    @property(Camera)
    mainCamera: Camera | null = null;

    @property(CCFloat)
    scanDistance: number = 1;    

    private matInvViewProj: math.Mat4 = new math.Mat4();

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);

        this.renderRtSprite.sharedMaterial.setProperty("scanDistance", this.scanDistance);
    }

    update(deltaTime: number) {
        this.matInvViewProj = this.mainCamera.camera.matViewProjInv;
        this.renderRtSprite.sharedMaterial.setProperty("matInvViewProj", this.matInvViewProj);
    }

    onTouchMove(touch: EventTouch) {
        let sp = new Vec3(touch.touch.getUILocationX(), touch.touch.getUILocationY(), 0.0);
        let wp = new Vec3();
        this.mainCamera.screenToWorld(sp, wp);

        let ray = new geometry.Ray();
        geometry.Ray.fromPoints(ray, this.mainCamera.node.worldPosition, wp);
        if (physics.PhysicsSystem.instance.raycast(ray)) {
            let closest = physics.PhysicsSystem.instance.raycastResults[0];

            let v = new Vec4(closest.hitPoint.x, closest.hitPoint.y, closest.hitPoint.z, 0.0);
            this.renderRtSprite.sharedMaterial.setProperty("worldPosition", v);
        }
    }
}


