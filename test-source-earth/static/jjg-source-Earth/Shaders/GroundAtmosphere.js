//This file is automatically rebuilt by the Cesium build process.
export default "const float Kr = 0.0025;\n\
const float Km = 0.0015;\n\
const float ESun = 15.0;\n\
const float fKrESun = Kr * ESun;\n\
const float fKmESun = Km * ESun;\n\
const float fKr4PI = Kr * 4.0 * czm_pi;\n\
const float fKm4PI = Km * 4.0 * czm_pi;\n\
const vec3 v3InvWavelength = vec3(5.60204474633241, 9.473284437923038, 19.64380261047721);\n\
const float fScaleDepth = 0.25;\n\
struct AtmosphereColor\n\
{\n\
vec3 mie;\n\
vec3 rayleigh;\n\
};\n\
const int nSamples = 2;\n\
const float fSamples = 2.0;\n\
float scale(float fCos)\n\
{\n\
float x = 1.0 - fCos;\n\
return fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n\
}\n\
AtmosphereColor computeGroundAtmosphereFromSpace(vec3 v3Pos, bool dynamicLighting, vec3 lightDirectionWC)\n\
{\n\
float fInnerRadius = czm_ellipsoidRadii.x;\n\
float fOuterRadius = czm_ellipsoidRadii.x * 1.025;\n\
float fOuterRadius2 = fOuterRadius * fOuterRadius;\n\
float fScale = 1.0 / (fOuterRadius - fInnerRadius);\n\
float fScaleOverScaleDepth = fScale / fScaleDepth;\n\
vec3 v3Ray = v3Pos - czm_viewerPositionWC;\n\
float fFar = length(v3Ray);\n\
v3Ray /= fFar;\n\
float fCameraHeight = length(czm_viewerPositionWC);\n\
float fCameraHeight2 = fCameraHeight * fCameraHeight;\n\
float B = 2.0 * length(czm_viewerPositionWC) * dot(normalize(czm_viewerPositionWC), v3Ray);\n\
float C = fCameraHeight2 - fOuterRadius2;\n\
float fDet = max(0.0, B*B - 4.0 * C);\n\
float fNear = 0.5 * (-B - sqrt(fDet));\n\
vec3 v3Start = czm_viewerPositionWC + v3Ray * fNear;\n\
fFar -= fNear;\n\
float fDepth = exp((fInnerRadius - fOuterRadius) / fScaleDepth);\n\
float fLightAngle = czm_branchFreeTernary(dynamicLighting, dot(lightDirectionWC, v3Pos) / length(v3Pos), 1.0);\n\
float fCameraAngle = dot(-v3Ray, v3Pos) / length(v3Pos);\n\
float fCameraScale = scale(fCameraAngle);\n\
float fLightScale = scale(fLightAngle);\n\
float fCameraOffset = fDepth*fCameraScale;\n\
float fTemp = (fLightScale + fCameraScale);\n\
float fSampleLength = fFar / fSamples;\n\
float fScaledLength = fSampleLength * fScale;\n\
vec3 v3SampleRay = v3Ray * fSampleLength;\n\
vec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\
vec3 v3FrontColor = vec3(0.0);\n\
vec3 v3Attenuate = vec3(0.0);\n\
for(int i=0; i<nSamples; i++)\n\
{\n\
float fHeight = length(v3SamplePoint);\n\
float fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\
float fScatter = fDepth*fTemp - fCameraOffset;\n\
v3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\
v3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\
v3SamplePoint += v3SampleRay;\n\
}\n\
AtmosphereColor color;\n\
color.mie = v3FrontColor * (v3InvWavelength * fKrESun + fKmESun);\n\
color.rayleigh = v3Attenuate;\n\
return color;\n\
}\n\
";
