//This file is automatically rebuilt by the Cesium build process.
export default "#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)\n\
varying float v_WindowZ;\n\
#endif\n\
void czm_writeDepthClamp()\n\
{\n\
#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)\n\
gl_FragDepthEXT = clamp(v_WindowZ * gl_FragCoord.w, 0.0, 1.0);\n\
#endif\n\
}\n\
";
