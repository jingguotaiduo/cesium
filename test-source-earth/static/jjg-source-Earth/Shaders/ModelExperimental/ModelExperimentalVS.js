//This file is automatically rebuilt by the Cesium build process.
export default "precision highp float;\n\
czm_modelVertexOutput defaultVertexOutput(vec3 positionMC) {\n\
czm_modelVertexOutput vsOutput;\n\
vsOutput.positionMC = positionMC;\n\
vsOutput.pointSize = 1.0;\n\
return vsOutput;\n\
}\n\
void main()\n\
{\n\
ProcessedAttributes attributes;\n\
initializeAttributes(attributes);\n\
#ifdef USE_DEQUANTIZATION\n\
dequantizationStage(attributes);\n\
#endif\n\
#ifdef HAS_INSTANCING\n\
instancingStage(attributes.positionMC);\n\
#ifdef USE_PICKING\n\
v_pickColor = a_pickColor;\n\
#endif\n\
#endif\n\
#if defined(HAS_FEATURES) && defined(FEATURE_ID_ATTRIBUTE)\n\
Feature feature;\n\
featureStage(feature);\n\
cpuStylingStage(attributes.positionMC, feature);\n\
updateFeatureStruct(feature);\n\
#endif\n\
#ifdef HAS_CUSTOM_VERTEX_SHADER\n\
czm_modelVertexOutput vsOutput = defaultVertexOutput(attributes.positionMC);\n\
customShaderStage(vsOutput, attributes);\n\
#endif\n\
geometryStage(attributes);\n\
#ifdef PRIMITIVE_TYPE_POINTS\n\
#ifdef HAS_CUSTOM_VERTEX_SHADER\n\
gl_PointSize = vsOutput.pointSize;\n\
#else\n\
gl_PointSize = 1.0;\n\
#endif\n\
#endif\n\
}\n\
";
