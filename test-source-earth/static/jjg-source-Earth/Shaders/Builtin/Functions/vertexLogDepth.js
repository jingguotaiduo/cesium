//This file is automatically rebuilt by the Cesium build process.
export default "#ifdef LOG_DEPTH\n\
varying float v_depthFromNearPlusOne;\n\
#ifdef SHADOW_MAP\n\
varying vec3 v_logPositionEC;\n\
#endif\n\
#endif\n\
vec4 czm_updatePositionDepth(vec4 coords) {\n\
#if defined(LOG_DEPTH)\n\
#ifdef SHADOW_MAP\n\
vec3 logPositionEC = (czm_inverseProjection * coords).xyz;\n\
v_logPositionEC = logPositionEC;\n\
#endif\n\
coords.z = clamp(coords.z / coords.w, -1.0, 1.0) * coords.w;\n\
#endif\n\
return coords;\n\
}\n\
void czm_vertexLogDepth()\n\
{\n\
#ifdef LOG_DEPTH\n\
v_depthFromNearPlusOne = (gl_Position.w - czm_currentFrustum.x) + 1.0;\n\
gl_Position = czm_updatePositionDepth(gl_Position);\n\
#endif\n\
}\n\
void czm_vertexLogDepth(vec4 clipCoords)\n\
{\n\
#ifdef LOG_DEPTH\n\
v_depthFromNearPlusOne = (clipCoords.w - czm_currentFrustum.x) + 1.0;\n\
czm_updatePositionDepth(clipCoords);\n\
#endif\n\
}\n\
";
