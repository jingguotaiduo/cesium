class MyPrimitive {

    constructor(modelMatrix) {
        this.modelMatrix = modelMatrix || Cesium.Matrix4.IDENTITY.clone()
        this.drawCommand = null;
    }

    /**
     * 创建 DrawCommand
     * @param {Cesium.Context} context
     */
    createCommand(context) {

        var modelMatrix = this.modelMatrix;

        var box = new Cesium.BoxGeometry({
            vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
            maximum: new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
            minimum: new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0)
        });
        var geometry = Cesium.BoxGeometry.createGeometry(box);

        var attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(geometry)

        var va = Cesium.VertexArray.fromGeometry({
            context: context,
            geometry: geometry,
            attributeLocations: attributeLocations
        });

        var vs = `
        attribute vec3 position;
        void main(){
            gl_Position = czm_projection  * czm_modelView * vec4( position , 1. );
        }
        `;
        var fs = `
        uniform vec3 color;
        void main(){
            gl_FragColor=vec4( color , 1. );
        }
        `;
        var shaderProgram = Cesium.ShaderProgram.fromCache({
            context: context,
            vertexShaderSource: vs,
            fragmentShaderSource: fs,
            attributeLocations: attributeLocations
        })

        var uniformMap = {
            color() {
                return Cesium.Color.GRAY
            }
        }

        var renderState = Cesium.RenderState.fromCache({
            cull: {
                enabled: true,
                face: Cesium.CullFace.BACK
            },
            depthTest: {
                enabled: true
            }
        })

        this.drawCommand = new Cesium.DrawCommand({
            modelMatrix: modelMatrix,
            vertexArray: va,
            shaderProgram: shaderProgram,
            uniformMap: uniformMap,
            renderState: renderState,
            pass: Cesium.Pass.OPAQUE
        })
    }

    /**
     * 实现Primitive接口，供Cesium内部在每一帧中调用
     * @param {Cesium.FrameState} frameState
     */
    update(frameState) {
        if (!this.drawCommand) {
            this.createCommand(frameState.context)
        }
        frameState.commandList.push(this.drawCommand)
    }

}

var viewer=new Cesium.Viewer('cesiumContainer');
viewer.scene.globe.depthTestAgainstTerrain = true;

var origin = Cesium.Cartesian3.fromDegrees(106, 26, 250000 / 2)
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin)

var primitive = new MyPrimitive(modelMatrix);
viewer.scene.primitives.add(primitive)
