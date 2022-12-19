//This file is automatically rebuilt by the Cesium build process.
export default "czm_pbrParameters czm_pbrSpecularGlossinessMaterial(\n\
vec3 diffuse,\n\
vec3 specular,\n\
float glossiness\n\
)\n\
{\n\
czm_pbrParameters results;\n\
float roughness = 1.0 - glossiness;\n\
results.roughness = roughness * roughness;\n\
results.diffuseColor = diffuse * (1.0 - max(max(specular.r, specular.g), specular.b));\n\
results.f0 = specular;\n\
return results;\n\
}\n\
";
