//This file is automatically rebuilt by the Cesium build process.
export default "void geometryStage(inout ProcessedAttributes attributes)\n\
{\n\
vec3 positionMC = attributes.positionMC;\n\
v_positionMC = positionMC;\n\
v_positionEC = (czm_modelView * vec4(positionMC, 1.0)).xyz;\n\
gl_Position = czm_modelViewProjection * vec4(positionMC, 1.0);\n\
#ifdef COMPUTE_POSITION_WC\n\
v_positionWC = (czm_model * vec4(positionMC, 1.0)).xyz;\n\
#endif\n\
#ifdef HAS_NORMALS\n\
v_normalEC = czm_normal * attributes.normalMC;\n\
#endif\n\
#ifdef HAS_TANGENTS\n\
v_tangentEC = normalize(czm_normal * attributes.tangentMC);\n\
#endif\n\
#ifdef HAS_BITANGENTS\n\
v_bitangentEC = normalize(czm_normal * attributes.bitangentMC);\n\
#endif\n\
setDynamicVaryings(attributes);\n\
}\n\
";
