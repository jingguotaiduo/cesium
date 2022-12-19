//This file is automatically rebuilt by the Cesium build process.
export default "czm_pbrParameters czm_pbrMetallicRoughnessMaterial(\n\
vec3 baseColor,\n\
float metallic,\n\
float roughness\n\
)\n\
{\n\
czm_pbrParameters results;\n\
roughness = clamp(roughness, 0.0, 1.0);\n\
results.roughness = roughness * roughness;\n\
metallic = clamp(metallic, 0.0, 1.0);\n\
const vec3 REFLECTANCE_DIELECTRIC = vec3(0.04);\n\
vec3 f0 = mix(REFLECTANCE_DIELECTRIC, baseColor, metallic);\n\
results.f0 = f0;\n\
results.diffuseColor = baseColor * (1.0 - f0) * (1.0 - metallic);\n\
return results;\n\
}\n\
";
