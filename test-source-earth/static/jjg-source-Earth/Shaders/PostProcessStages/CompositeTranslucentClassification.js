//This file is automatically rebuilt by the Cesium build process.
export default "uniform sampler2D colorTexture;\n\
#ifdef DEBUG_SHOW_DEPTH\n\
uniform sampler2D u_packedTranslucentDepth;\n\
#endif\n\
varying vec2 v_textureCoordinates;\n\
void main()\n\
{\n\
#ifdef DEBUG_SHOW_DEPTH\n\
if (v_textureCoordinates.x < 0.5)\n\
{\n\
gl_FragColor.rgb = vec3(czm_unpackDepth(texture2D(u_packedTranslucentDepth, v_textureCoordinates)));\n\
gl_FragColor.a = 1.0;\n\
}\n\
#else\n\
vec4 color = texture2D(colorTexture, v_textureCoordinates);\n\
#ifdef PICK\n\
if (color == vec4(0.0))\n\
{\n\
discard;\n\
}\n\
#else\n\
color.rgb /= color.a;\n\
#endif\n\
gl_FragColor = color;\n\
#endif\n\
}\n\
";
