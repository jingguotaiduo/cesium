//This file is automatically rebuilt by the Cesium build process.
export default "#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)\n\
varying float v_WindowZ;\n\
#endif\n\
vec4 czm_depthClamp(vec4 coords)\n\
{\n\
#ifndef LOG_DEPTH\n\
#ifdef GL_EXT_frag_depth\n\
v_WindowZ = (0.5 * (coords.z / coords.w) + 0.5) * coords.w;\n\
coords.z = 0.0;\n\
#else\n\
coords.z = min(coords.z, coords.w);\n\
#endif\n\
#endif\n\
return coords;\n\
}\n\
";
