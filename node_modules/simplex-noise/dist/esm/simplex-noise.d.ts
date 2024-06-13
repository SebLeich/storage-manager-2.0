/**
 * A random() function, must return a number in the interval [0,1), just like Math.random().
 */
export declare type RandomFn = () => number;
/**
 * Samples the noise field in two dimensions
 *
 * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
 * @param x
 * @param y
 * @returns a number in the interval [-1, 1]
 */
export declare type NoiseFunction2D = (x: number, y: number) => number;
/**
 * Creates a 2D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction2D}
 */
export declare function createNoise2D(random?: RandomFn): NoiseFunction2D;
/**
 * Samples the noise field in three dimensions
 *
 * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
 * @param x
 * @param y
 * @param z
 * @returns a number in the interval [-1, 1]
 */
export declare type NoiseFunction3D = (x: number, y: number, z: number) => number;
/**
 * Creates a 3D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction3D}
 */
export declare function createNoise3D(random?: RandomFn): NoiseFunction3D;
/**
 * Samples the noise field in four dimensions
 *
 * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
 * @param x
 * @param y
 * @param z
 * @param w
 * @returns a number in the interval [-1, 1]
 */
export declare type NoiseFunction4D = (x: number, y: number, z: number, w: number) => number;
/**
 * Creates a 4D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction4D}
 */
export declare function createNoise4D(random?: RandomFn): NoiseFunction4D;
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */
export declare function buildPermutationTable(random: RandomFn): Uint8Array;
