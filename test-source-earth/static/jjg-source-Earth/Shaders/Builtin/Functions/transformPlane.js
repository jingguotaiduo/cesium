//This file is automatically rebuilt by the Cesium build process.
export default "vec4 czm_transformPlane(vec4 plane, mat4 transform) {\n\
vec4 transformedPlane = transform * plane;\n\
float normalMagnitude = length(transformedPlane.xyz);\n\
return transformedPlane / normalMagnitude;\n\
}\n\
";
