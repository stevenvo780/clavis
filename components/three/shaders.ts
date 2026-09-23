// Ruido simplex 3D (Ashima Arts / Stefan Gustavson, licencia MIT).
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

/**
 * Fondo a pantalla completa: corrientes de color con warping de dominio sobre el
 * fondo de marca. Es parte de la escena, así que el cristal lo refracta.
 */
export const auroraVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`

export const auroraFragment = /* glsl */ `
uniform float uTime;
uniform vec2 uAspect;
uniform vec2 uPointer;
uniform vec2 uCenter;
uniform vec3 uBase;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uIntensity;
varying vec2 vUv;
${SIMPLEX}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 p = (vUv - 0.5) * uAspect;
  float t = uTime * 0.045;
  vec2 q = vec2(snoise(vec3(p * 0.9, t)), snoise(vec3(p * 0.9 + 7.3, t * 1.1)));
  float n1 = snoise(vec3(p * 1.25 + q * 0.9 + uPointer * 0.12, t * 1.4));
  float n2 = snoise(vec3(p * 2.1 - q * 0.7 + 3.1, t * 1.9));

  vec3 col = uBase;
  // Velos anchos y tenues + vetas finas y brillantes (crestas del ruido).
  float band = smoothstep(0.35, 1.0, n1 * 0.5 + 0.5);
  col += uA * pow(band, 3.0) * 0.3 * uIntensity;
  float ridge = 1.0 - abs(n2);
  col += uB * pow(ridge, 14.0) * 0.24 * uIntensity;
  float ridge2 = 1.0 - abs(snoise(vec3(p * 1.6 + q * 1.3 - 2.0, t * 1.2)));
  col += uC * pow(ridge2, 28.0) * 0.2 * uIntensity;

  // Halo detrás del cristal
  float d = length(p - uCenter);
  col += uA * exp(-d * d * 5.0) * 0.1 * uIntensity;

  // Líneas de horizonte muy tenues (una retícula que respira)
  float rings = abs(fract(d * 5.0 - t * 2.0) - 0.5);
  col += uC * smoothstep(0.02, 0.0, rings) * 0.012 * smoothstep(1.2, 0.3, d) * uIntensity;

  // Viñeta
  col *= mix(0.35, 1.0, smoothstep(1.35, 0.15, length(p * vec2(0.85, 1.0))));
  // Dither contra bandas
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.004;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
  #include <colorspace_fragment>
}
`

/** Cosmos de partículas: titilan, con tamaño atenuado por distancia. */
export const starsVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
attribute float aSeed;
attribute float aScale;
varying float vAlpha;
varying float vSeed;
void main() {
  vec3 p = position;
  float s = aSeed * 6.2831;
  p += vec3(sin(uTime * 0.12 + s), cos(uTime * 0.1 + s * 1.3), sin(uTime * 0.08 + s * 0.7)) * 0.08;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  float tw = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed * 1.8) + s * 3.0);
  vAlpha = tw * smoothstep(20.0, 4.0, -mv.z);
  vSeed = aSeed;
}
`

export const starsFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vAlpha;
varying float vSeed;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float core = smoothstep(0.5, 0.0, d);
  float glow = pow(core, 3.0);
  vec3 col = mix(uColorA, uColorB, step(0.7, vSeed));
  gl_FragColor = vec4(col * (glow * 1.4 + core * 0.25), (glow + core * 0.2) * vAlpha);
  #include <colorspace_fragment>
}
`

/** Puntos de luz en los vértices del sólido activo. */
export const vertexGlowFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = pow(smoothstep(0.5, 0.0, d), 2.5);
  gl_FragColor = vec4(uColor * a * 1.6, a * uOpacity);
  #include <colorspace_fragment>
}
`

export const vertexGlowVertex = /* glsl */ `
uniform float uSize;
uniform float uPixelRatio;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z);
}
`
