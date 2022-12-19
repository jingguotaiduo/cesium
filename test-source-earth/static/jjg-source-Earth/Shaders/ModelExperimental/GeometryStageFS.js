//This file is automatically rebuilt by the Cesium build process.
export default "void geometryStage(out ProcessedAttributes attributes)\n\
{\n\
attributes.positionMC = v_positionMC;\n\
attributes.positionEC = v_positionEC;\n\
#ifdef COMPUTE_POSITION_WC\n\
attributes.positionWC = v_positionWC;\n\
#endif\n\
#ifdef HAS_NORMALS\n\
attributes.normalEC = normalize(v_normalEC);\n\
#endif\n\
#ifdef HAS_TANGENTS\n\
attributes.tangentEC = normalize(v_tangentEC);\n\
#endif\n\
#ifdef HAS_BITANGENTS\n\
attributes.bitangentEC = normalize(v_bitangentEC);\n\
#endif\n\
setDynamicVaryings(attributes);\n\
}\n\
";
