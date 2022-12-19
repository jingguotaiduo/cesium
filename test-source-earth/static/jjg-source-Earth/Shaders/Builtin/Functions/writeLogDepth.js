//This file is automatically rebuilt by the Cesium build process.
export default "#ifdef LOG_DEPTH\n\
varying float v_depthFromNearPlusOne;\n\
#ifdef POLYGON_OFFSET\n\
uniform vec2 u_polygonOffset;\n\
#endif\n\
#endif\n\
void czm_writeLogDepth(float depth)\n\
{\n\
#if defined(GL_EXT_frag_depth) && defined(LOG_DEPTH)\n\
if (depth <= 0.9999999 || depth > czm_farDepthFromNearPlusOne) {\n\
discard;\n\
}\n\
#ifdef POLYGON_OFFSET\n\
float factor = u_polygonOffset[0];\n\
float units = u_polygonOffset[1];\n\
#ifdef GL_OES_standard_derivatives\n\
float x = dFdx(depth);\n\
float y = dFdy(depth);\n\
float m = sqrt(x * x + y * y);\n\
depth += m * factor;\n\
#endif\n\
#endif\n\
gl_FragDepthEXT = log2(depth) * czm_oneOverLog2FarDepthFromNearPlusOne;\n\
#ifdef POLYGON_OFFSET\n\
gl_FragDepthEXT += czm_epsilon7 * units;\n\
#endif\n\
#endif\n\
}\n\
void czm_writeLogDepth() {\n\
#ifdef LOG_DEPTH\n\
czm_writeLogDepth(v_depthFromNearPlusOne);\n\
#endif\n\
}\n\
";
