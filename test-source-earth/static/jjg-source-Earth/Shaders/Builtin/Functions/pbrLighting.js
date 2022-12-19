//This file is automatically rebuilt by the Cesium build process.
export default "vec3 lambertianDiffuse(vec3 diffuseColor)\n\
{\n\
return diffuseColor / czm_pi;\n\
}\n\
vec3 fresnelSchlick2(vec3 f0, vec3 f90, float VdotH)\n\
{\n\
return f0 + (f90 - f0) * pow(clamp(1.0 - VdotH, 0.0, 1.0), 5.0);\n\
}\n\
float smithVisibilityG1(float NdotV, float roughness)\n\
{\n\
float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;\n\
return NdotV / (NdotV * (1.0 - k) + k);\n\
}\n\
float smithVisibilityGGX(float roughness, float NdotL, float NdotV)\n\
{\n\
return (\n\
smithVisibilityG1(NdotL, roughness) *\n\
smithVisibilityG1(NdotV, roughness)\n\
);\n\
}\n\
float GGX(float roughness, float NdotH)\n\
{\n\
float roughnessSquared = roughness * roughness;\n\
float f = (NdotH * roughnessSquared - NdotH) * NdotH + 1.0;\n\
return roughnessSquared / (czm_pi * f * f);\n\
}\n\
vec3 czm_pbrLighting(\n\
vec3 positionEC,\n\
vec3 normalEC,\n\
vec3 lightDirectionEC,\n\
vec3 lightColorHdr,\n\
czm_pbrParameters pbrParameters\n\
)\n\
{\n\
vec3 v = -normalize(positionEC);\n\
vec3 l = normalize(lightDirectionEC);\n\
vec3 h = normalize(v + l);\n\
vec3 n = normalEC;\n\
float NdotL = clamp(dot(n, l), 0.001, 1.0);\n\
float NdotV = abs(dot(n, v)) + 0.001;\n\
float NdotH = clamp(dot(n, h), 0.0, 1.0);\n\
float LdotH = clamp(dot(l, h), 0.0, 1.0);\n\
float VdotH = clamp(dot(v, h), 0.0, 1.0);\n\
vec3 f0 = pbrParameters.f0;\n\
float reflectance = max(max(f0.r, f0.g), f0.b);\n\
vec3 f90 = vec3(clamp(reflectance * 25.0, 0.0, 1.0));\n\
vec3 F = fresnelSchlick2(f0, f90, VdotH);\n\
float alpha = pbrParameters.roughness;\n\
float G = smithVisibilityGGX(alpha, NdotL, NdotV);\n\
float D = GGX(alpha, NdotH);\n\
vec3 specularContribution = F * G * D / (4.0 * NdotL * NdotV);\n\
vec3 diffuseColor = pbrParameters.diffuseColor;\n\
vec3 diffuseContribution = (1.0 - F) * lambertianDiffuse(diffuseColor);\n\
return (diffuseContribution + specularContribution) * NdotL * lightColorHdr;\n\
}\n\
";
