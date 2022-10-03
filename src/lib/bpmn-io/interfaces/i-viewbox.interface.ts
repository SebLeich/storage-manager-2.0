export interface IViewbox {
    height: number;
    inner: { width: number, height: number, x: number, y: number };
    outer: { width: number, height: number };
    scale: number;
    width: number;
    x: number;
    y: number;
}
