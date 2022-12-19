//This file is automatically rebuilt by the Cesium build process.
export default "attribute vec3 startEllipsoidNormal;\n\
attribute vec3 endEllipsoidNormal;\n\
attribute vec4 startPositionAndHeight;\n\
attribute vec4 endPositionAndHeight;\n\
attribute vec4 startFaceNormalAndVertexCorner;\n\
attribute vec4 endFaceNormalAndHalfWidth;\n\
attribute float a_batchId;\n\
uniform mat4 u_modifiedModelView;\n\
uniform vec2 u_minimumMaximumVectorHeights;\n\
varying vec4 v_startPlaneEC;\n\
varying vec4 v_endPlaneEC;\n\
varying vec4 v_rightPlaneEC;\n\
varying float v_halfWidth;\n\
varying vec3 v_volumeUpEC;\n\
void main()\n\
{\n\
float isEnd = floor(startFaceNormalAndVertexCorner.w * 0.251);\n\
float isTop = floor(startFaceNormalAndVertexCorner.w * mix(0.51, 0.19, isEnd));\n\
vec3 forward = endPositionAndHeight.xyz - startPositionAndHeight.xyz;\n\
vec3 right = normalize(cross(forward, startEllipsoidNormal));\n\
vec4 position = vec4(startPositionAndHeight.xyz, 1.0);\n\
position.xyz += forward * isEnd;\n\
v_volumeUpEC = czm_normal * normalize(cross(right, forward));\n\
float offset;\n\
vec3 ellipsoidNormal = mix(startEllipsoidNormal, endEllipsoidNormal, isEnd);\n\
offset = mix(startPositionAndHeight.w, endPositionAndHeight.w, isEnd);\n\
offset = mix(u_minimumMaximumVectorHeights.y, u_minimumMaximumVectorHeights.x, isTop) - offset;\n\
position.xyz += offset * ellipsoidNormal;\n\
position = u_modifiedModelView * position;\n\
right = czm_normal * right;\n\
vec3 scratchNormal = mix(-startFaceNormalAndVertexCorner.xyz, endFaceNormalAndHalfWidth.xyz, isEnd);\n\
scratchNormal = cross(scratchNormal, mix(startEllipsoidNormal, endEllipsoidNormal, isEnd));\n\
vec3 miterPushNormal = czm_normal * normalize(scratchNormal);\n\
offset = 2.0 * endFaceNormalAndHalfWidth.w * max(0.0, czm_metersPerPixel(position));\n\
offset = offset / dot(miterPushNormal, right);\n\
position.xyz += miterPushNormal * (offset * sign(0.5 - mod(startFaceNormalAndVertexCorner.w, 2.0)));\n\
gl_Position = czm_depthClamp(czm_projection * position);\n\
position = u_modifiedModelView * vec4(startPositionAndHeight.xyz, 1.0);\n\
vec3 startNormalEC = czm_normal * startFaceNormalAndVertexCorner.xyz;\n\
v_startPlaneEC = vec4(startNormalEC, -dot(startNormalEC, position.xyz));\n\
v_rightPlaneEC = vec4(right, -dot(right, position.xyz));\n\
position = u_modifiedModelView * vec4(endPositionAndHeight.xyz, 1.0);\n\
vec3 endNormalEC = czm_normal * endFaceNormalAndHalfWidth.xyz;\n\
v_endPlaneEC = vec4(endNormalEC, -dot(endNormalEC, position.xyz));\n\
v_halfWidth = endFaceNormalAndHalfWidth.w;\n\
}\n\
";
