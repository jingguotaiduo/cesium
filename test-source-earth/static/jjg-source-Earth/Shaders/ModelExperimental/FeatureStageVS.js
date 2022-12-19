//This file is automatically rebuilt by the Cesium build process.
export default "void featureStage(inout Feature feature)\n\
{\n\
float featureId = FEATURE_ID_ATTRIBUTE;\n\
if (featureId < model_featuresLength)\n\
{\n\
vec2 featureSt = computeSt(featureId);\n\
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
}\n\
";
