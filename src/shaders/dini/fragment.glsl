uniform float uTime;

varying vec3 vPosition;


void main() {
    // Base colors


    // Oscillator between 0.0 and 1.0
    float t = (sin(uTime * 0.003) * 0.5) + 0.5;

    vec3 green = vec3(0, 0.6 + (0.4 * t), max(t * 0.2, 0.3)) * ((t* 0.2) + 0.7);        // pure green
    vec3 pale  = vec3(0.8 , 1.0, 0.8) * (0.9 -(vPosition.x * t * 0.1));        // #CCFFCC ≈ (204/255, 255/255, 204/255)

    // Blend the two colors
    vec3 color = mix(green, pale, vPosition.y);

    gl_FragColor = vec4(color, 1.0);
}