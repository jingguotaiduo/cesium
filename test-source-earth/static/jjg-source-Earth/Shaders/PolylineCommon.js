//This file is automatically rebuilt by the Cesium build process.
export default "void clipLineSegmentToNearPlane(\n\
vec3 p0,\n\
vec3 p1,\n\
out vec4 positionWC,\n\
out bool clipped,\n\
out bool culledByNearPlane,\n\
out vec4 clippedPositionEC)\n\
{\n\
culledByNearPlane = false;\n\
clipped = false;\n\
vec3 p0ToP1 = p1 - p0;\n\
float magnitude = length(p0ToP1);\n\
vec3 direction = normalize(p0ToP1);\n\
float endPoint0Distance =  czm_currentFrustum.x + p0.z;\n\
float denominator = -direction.z;\n\
if (endPoint0Distance > 0.0 && abs(denominator) < czm_epsilon7)\n\
{\n\
culledByNearPlane = true;\n\
}\n\
else if (endPoint0Distance > 0.0)\n\
{\n\
float t = endPoint0Distance / denominator;\n\
if (t < 0.0 || t > magnitude)\n\
{\n\
culledByNearPlane = true;\n\
}\n\
else\n\
{\n\
p0 = p0 + t * direction;\n\
p0.z = min(p0.z, -czm_currentFrustum.x);\n\
clipped = true;\n\
}\n\
}\n\
clippedPositionEC = vec4(p0, 1.0);\n\
positionWC = czm_eyeToWindowCoordinates(clippedPositionEC);\n\
}\n\
vec4 getPolylineWindowCoordinatesEC(vec4 positionEC, vec4 prevEC, vec4 nextEC, float expandDirection, float width, bool usePrevious, out float angle)\n\
{\n\
#ifdef POLYLINE_DASH\n\
vec4 positionWindow = czm_eyeToWindowCoordinates(positionEC);\n\
vec4 previousWindow = czm_eyeToWindowCoordinates(prevEC);\n\
vec4 nextWindow = czm_eyeToWindowCoordinates(nextEC);\n\
vec2 lineDir;\n\
if (usePrevious) {\n\
lineDir = normalize(positionWindow.xy - previousWindow.xy);\n\
}\n\
else {\n\
lineDir = normalize(nextWindow.xy - positionWindow.xy);\n\
}\n\
angle = atan(lineDir.x, lineDir.y) - 1.570796327;\n\
angle = floor(angle / czm_piOverFour + 0.5) * czm_piOverFour;\n\
#endif\n\
vec4 clippedPrevWC, clippedPrevEC;\n\
bool prevSegmentClipped, prevSegmentCulled;\n\
clipLineSegmentToNearPlane(prevEC.xyz, positionEC.xyz, clippedPrevWC, prevSegmentClipped, prevSegmentCulled, clippedPrevEC);\n\
vec4 clippedNextWC, clippedNextEC;\n\
bool nextSegmentClipped, nextSegmentCulled;\n\
clipLineSegmentToNearPlane(nextEC.xyz, positionEC.xyz, clippedNextWC, nextSegmentClipped, nextSegmentCulled, clippedNextEC);\n\
bool segmentClipped, segmentCulled;\n\
vec4 clippedPositionWC, clippedPositionEC;\n\
clipLineSegmentToNearPlane(positionEC.xyz, usePrevious ? prevEC.xyz : nextEC.xyz, clippedPositionWC, segmentClipped, segmentCulled, clippedPositionEC);\n\
if (segmentCulled)\n\
{\n\
return vec4(0.0, 0.0, 0.0, 1.0);\n\
}\n\
vec2 directionToPrevWC = normalize(clippedPrevWC.xy - clippedPositionWC.xy);\n\
vec2 directionToNextWC = normalize(clippedNextWC.xy - clippedPositionWC.xy);\n\
if (prevSegmentCulled)\n\
{\n\
directionToPrevWC = -directionToNextWC;\n\
}\n\
else if (nextSegmentCulled)\n\
{\n\
directionToNextWC = -directionToPrevWC;\n\
}\n\
vec2 thisSegmentForwardWC, otherSegmentForwardWC;\n\
if (usePrevious)\n\
{\n\
thisSegmentForwardWC = -directionToPrevWC;\n\
otherSegmentForwardWC = directionToNextWC;\n\
}\n\
else\n\
{\n\
thisSegmentForwardWC = directionToNextWC;\n\
otherSegmentForwardWC =  -directionToPrevWC;\n\
}\n\
vec2 thisSegmentLeftWC = vec2(-thisSegmentForwardWC.y, thisSegmentForwardWC.x);\n\
vec2 leftWC = thisSegmentLeftWC;\n\
float expandWidth = width * 0.5;\n\
if (!czm_equalsEpsilon(prevEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1) && !czm_equalsEpsilon(nextEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1))\n\
{\n\
vec2 otherSegmentLeftWC = vec2(-otherSegmentForwardWC.y, otherSegmentForwardWC.x);\n\
vec2 leftSumWC = thisSegmentLeftWC + otherSegmentLeftWC;\n\
float leftSumLength = length(leftSumWC);\n\
leftWC = leftSumLength < czm_epsilon6 ? thisSegmentLeftWC : (leftSumWC / leftSumLength);\n\
vec2 u = -thisSegmentForwardWC;\n\
vec2 v = leftWC;\n\
float sinAngle = abs(u.x * v.y - u.y * v.x);\n\
expandWidth = clamp(expandWidth / sinAngle, 0.0, width * 2.0);\n\
}\n\
vec2 offset = leftWC * expandDirection * expandWidth * czm_pixelRatio;\n\
return vec4(clippedPositionWC.xy + offset, -clippedPositionWC.z, 1.0) * (czm_projection * clippedPositionEC).w;\n\
}\n\
vec4 getPolylineWindowCoordinates(vec4 position, vec4 previous, vec4 next, float expandDirection, float width, bool usePrevious, out float angle)\n\
{\n\
vec4 positionEC = czm_modelViewRelativeToEye * position;\n\
vec4 prevEC = czm_modelViewRelativeToEye * previous;\n\
vec4 nextEC = czm_modelViewRelativeToEye * next;\n\
return getPolylineWindowCoordinatesEC(positionEC, prevEC, nextEC, expandDirection, width, usePrevious, angle);\n\
}\n\
";
