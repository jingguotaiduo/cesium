//This file is automatically rebuilt by the Cesium build process.
export default "float czm_private_getLambertDiffuseOfMaterial(vec3 lightDirectionEC, czm_material material)\n\
{\n\
return czm_getLambertDiffuse(lightDirectionEC, material.normal);\n\
}\n\
float czm_private_getSpecularOfMaterial(vec3 lightDirectionEC, vec3 toEyeEC, czm_material material)\n\
{\n\
return czm_getSpecular(lightDirectionEC, toEyeEC, material.normal, material.shininess);\n\
}\n\
vec4 czm_phong(vec3 toEye, czm_material material, vec3 lightDirectionEC)\n\
{\n\
float diffuse = czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 0.0, 1.0), material);\n\
if (czm_sceneMode == czm_sceneMode3D) {\n\
diffuse += czm_private_getLambertDiffuseOfMaterial(vec3(0.0, 1.0, 0.0), material);\n\
}\n\
float specular = czm_private_getSpecularOfMaterial(lightDirectionEC, toEye, material);\n\
vec3 materialDiffuse = material.diffuse * 0.5;\n\
vec3 ambient = materialDiffuse;\n\
vec3 color = ambient + material.emission;\n\
color += materialDiffuse * diffuse * czm_lightColor;\n\
color += material.specular * specular * czm_lightColor;\n\
return vec4(color, material.alpha);\n\
}\n\
vec4 czm_private_phong(vec3 toEye, czm_material material, vec3 lightDirectionEC)\n\
{\n\
float diffuse = czm_private_getLambertDiffuseOfMaterial(lightDirectionEC, material);\n\
float specular = czm_private_getSpecularOfMaterial(lightDirectionEC, toEye, material);\n\
vec3 ambient = vec3(0.0);\n\
vec3 color = ambient + material.emission;\n\
color += material.diffuse * diffuse * czm_lightColor;\n\
color += material.specular * specular * czm_lightColor;\n\
return vec4(color, material.alpha);\n\
}\n\
";
