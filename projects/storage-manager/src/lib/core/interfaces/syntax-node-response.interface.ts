import { Tree, SyntaxNode } from 'node_modules/@lezer/common/dist/tree';

export interface ISyntaxNodeResponse {
    node: SyntaxNode | null;
    tree: Tree;
}