//This file is automatically rebuilt by the Cesium build process.
export default "void featureStage(inout Feature feature)\n\
{\n\
#ifdef FEATURE_ID_TEXTURE\n\
float featureId = floor(texture2D(FEATURE_ID_TEXTURE, FEATURE_ID_TEXCOORD).FEATURE_ID_CHANNEL * 255.0 + 0.5);\n\
vec2 featureSt;\n\
if (featureId < model_featuresLength)\n\
{\n\
featureSt = computeSt(featureId);\n\
feature.id = int(featureId);\n\
feature.st = featureSt;\n\
feature.color = texture2D(model_batchTexture, featureSt);\n\
}\n\
else\n\
{\n\
feature.id = int(model_featuresLength) + 1;\n\
feature.st = vec2(0.0);\n\
feature.color = vec4(1.0);\n\
}\n\
#else\n\
updateFeatureStruct(feature);\n\
#endif\n\
}\n\
";
