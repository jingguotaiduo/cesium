//This file is automatically rebuilt by the Cesium build process.
export default "#ifdef GL_EXT_frag_depth\n\
#extension GL_EXT_frag_depth : enable\n\
#endif\n\
varying vec4 v_startPlaneEC;\n\
varying vec4 v_endPlaneEC;\n\
varying vec4 v_rightPlaneEC;\n\
varying float v_halfWidth;\n\
varying vec3 v_volumeUpEC;\n\
uniform vec4 u_highlightColor;\n\
void main()\n\
{\n\
float logDepthOrDepth = czm_branchFreeTernary(czm_sceneMode == czm_sceneMode2D, gl_FragCoord.z, czm_unpackDepth(texture2D(czm_globeDepthTexture, gl_FragCoord.xy / czm_viewport.zw)));\n\
if (logDepthOrDepth == 0.0) {\n\
#ifdef DEBUG_SHOW_VOLUME\n\
gl_FragColor = vec4(0.0, 0.0, 1.0, 0.5);\n\
return;\n\
#else // DEBUG_SHOW_VOLUME\n\
discard;\n\
#endif // DEBUG_SHOW_VOLUME\n\
}\n\
vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, logDepthOrDepth);\n\
eyeCoordinate /= eyeCoordinate.w;\n\
float halfMaxWidth = v_halfWidth * czm_metersPerPixel(eyeCoordinate);\n\
halfMaxWidth += halfMaxWidth * (1.0 - dot(-normalize(eyeCoordinate.xyz), v_volumeUpEC));\n\
float widthwiseDistance = czm_planeDistance(v_rightPlaneEC, eyeCoordinate.xyz);\n\
float distanceFromStart = czm_planeDistance(v_startPlaneEC, eyeCoordinate.xyz);\n\
float distanceFromEnd = czm_planeDistance(v_endPlaneEC, eyeCoordinate.xyz);\n\
if (abs(widthwiseDistance) > halfMaxWidth || distanceFromStart < 0.0 || distanceFromEnd < 0.0) {\n\
#ifdef DEBUG_SHOW_VOLUME\n\
gl_FragColor = vec4(logDepthOrDepth, 0.0, 0.0, 0.5);\n\
return;\n\
#else // DEBUG_SHOW_VOLUME\n\
discard;\n\
#endif // DEBUG_SHOW_VOLUME\n\
}\n\
gl_FragColor = u_highlightColor;\n\
czm_writeDepthClamp();\n\
}\n\
";
