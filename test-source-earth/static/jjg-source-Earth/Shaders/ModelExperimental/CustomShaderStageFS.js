//This file is automatically rebuilt by the Cesium build process.
export default "void customShaderStage(inout czm_modelMaterial material, ProcessedAttributes attributes)\n\
{\n\
FragmentInput fsInput;\n\
initializeInputStruct(fsInput, attributes);\n\
fragmentMain(fsInput, material);\n\
}\n\
";
