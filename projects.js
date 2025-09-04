export const projects = [
    {
        title: "What Am I Studying Now?",
        summary: "The textbooks, resources, courses, and projects I am currently digesting...",
        description: `
            In advance to my M.S. program in the Fall of 2026, I am currently working through a few books to deepen my knowledge. This includes readings such as:
            <br /><br />

            • Advances in Financial Machine Learning - Marcos López de Prado                     <br />
            • Stochastic Calculus for Finance II: Continuous Time Models - Steven E. Shreve      <br />
            • Programming Massively Parallel Processors - David B. Kirk, Wen-mei W. Hwu          <br /> <br />

            I would also like to draw attention to 
            <a href="https://www.youtube.com/channel/UCJgIbYl6C5no72a0NUAPcTA" 
               title="GPU MODE - A GPU reading group and community"
               style="text-decoration: underline; color: #76b900;">
            GPU MODE</a>,
            an online reading group and community concerned with GPU (particularly CUDA) programming. While I have not directly contributed to this community, I follow their lectures as it is much younger and extremely industry involved.

        `,
        tech: "Informative • Resources • Books",
        date: "Today",
        gradient: "linear-gradient(to left, #90d5ff, #ffffff)"
    },
    {
        title: "Dini's Surface Visualization",
        summary: `
            A JavaScript visualization of a parametric curve known as Dini's surface...
        `,
        description: `
            A JavaScript visualization of a parametric curve known as Dini's surface. 
            This render serves as an exercise to template future projects with the greater goal of demystifying and appreciating theoretical concepts using OpenGL shading algorithms (GLSL). 
            
            The surface is defined as \\( f(u,v): \\mathbb{R}^2 \\rightarrow \\mathbb{R}^3 \\) with parameters \\(a\\) describing the radius and \\(b\\) describing the vertical scale:
            
            \\[
            x = a \\cos u \\sin v, \\quad 
            y = a \\sin u \\sin v, \\quad 
            z = a \\left( \\cos v + \\ln \\tan \\frac{v}{2} \\right) + b u
            \\]
            
            In this animation, \\(u\\) (upper bound for the surface integral) is time-animated using a sine function and \\(a\\) (radius) is animated similarly. 
            The 'web-like' look exists to portray the discretization of input values (domain mesh is a 100x100 plane).
        `,
        tech: "Three.js • WebGL • GLSL Shaders",
        date: "2024",
        gradient: "linear-gradient(to left, #ff8a00, #e52e71)"
    },
    {
        title: "Resume Classifier ML Model",
        summary: "Contribution to a Bayesian classifier using NLP...",
        description: `
            Bayesian classifier using NLP to predict the role an applicant fits based on resume text. 
            Inline math example: probability of class \\(C_k\\) given input \\(x\\) is \\( P(C_k | x) \\). 
            Handled unbalanced datasets and tested performance using scikit-learn.
        `,
        tech: "Python • Scikit-learn • NLP • Bayesian Methods",
        date: "June - Aug 2024",
        gradient: "radial-gradient(#efff14, #2ee565)"
    },
    {
        title: "Monte Carlo Options Pricing",
        summary: "High-performance implementation of Monte Carlo methods...",
        description: `
            High-performance Monte Carlo implementation for options pricing using CUDA. 
            Variance reduction techniques applied, with parallel optimizations for real-time modeling. 
            Example formula (inline): expected payoff \\( E[f(S_T)] \\). 
            Display formula:

            \\[
            Price = e^{-rT} \\mathbb{E}[f(S_T)]
            \\]
        `,
        tech: "C++ • CUDA • Quantitative Finance",
        date: "2024",
        gradient: "linear-gradient(to left, #00d0ff, #e52e71)"
    },
    // {
    //     title: "Fractal Geometry Explorer",
    //     summary: "Interactive web application exploring complex mathematical structures...",
    //     description: `
    //     Interactive app exploring Mandelbrot and Julia sets. 
    //     Inline math: iteration formula \\( z_{n+1} = z_n^2 + c \\). 
    //     Supports real-time parameter adjustment and WebGL high-precision rendering.
    //         `,
    //     tech: "JavaScript • WebGL • Complex Analysis",
    //     date: "2024",
    //     gradient: "linear-gradient(to left, #ff8a00, #5fe52e)"
    // },
    // {
    //     title: "Quantum Circuit Simulator",
    //     summary: "GPU-accelerated quantum circuit simulation framework...",
    //     description: `
    //     GPU-accelerated quantum circuit simulator for 30+ qubits. 
    //     Implements gates, measurement, and visualization. 
    //     Inline math example: qubit state \\( |\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle \\). 
    //     Useful for education and research with performance optimization.
    //         `,
    //     tech: "CUDA • C++ • Quantum Computing",
    //     date: "2024",
    //     gradient: "radial-gradient(#797979, #b6b6b6)"
    // }
];
