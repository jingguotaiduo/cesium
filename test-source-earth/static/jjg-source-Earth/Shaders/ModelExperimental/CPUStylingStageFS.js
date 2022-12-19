//This file is automatically rebuilt by the Cesium build process.
export default "void filterByPassType(vec4 featureColor)\n\
{\n\
bool styleTranslucent = (featureColor.a != 1.0);\n\
if (czm_pass == czm_passTranslucent && !styleTranslucent && !model_commandTranslucent)\n\
{\n\
discard;\n\
}\n\
else if (czm_pass != czm_passTranslucent && styleTranslucent)\n\
{\n\
discard;\n\
}\n\
}\n\
void cpuStylingStage(inout czm_modelMaterial material, Feature feature)\n\
{\n\
vec4 featureColor = feature.color;\n\
if (featureColor.a == 0.0)\n\
{\n\
discard;\n\
}\n\
#ifdef FEATURE_ID_TEXTURE\n\
filterByPassType(featureColor);\n\
#endif\n\
featureColor = czm_gammaCorrect(featureColor);\n\
float highlight = ceil(model_colorBlend);\n\
material.diffuse *= mix(featureColor.rgb, vec3(1.0), highlight);\n\
material.alpha *= featureColor.a;\n\
}\n\
";
