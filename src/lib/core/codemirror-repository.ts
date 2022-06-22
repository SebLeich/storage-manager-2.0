import { javascript } from "@codemirror/lang-javascript";
import { syntaxTree } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { MethodEvaluationStatus } from "../process-builder/globals/method-evaluation-status";
import { Tree, SyntaxNode } from 'node_modules/@lezer/common/dist/tree';

export class CodemirrorRepository {

    static evaluateCustomMethod(state?: EditorState, text?: string[] | string): MethodEvaluationStatus {

        let convertedText = Array.isArray(text) ? text.join('\n') : text;

        if (!state) {
            if (!text) throw ('no state and no text passed');

            state = EditorState.create({
                doc: convertedText,
                extensions: [
                    javascript()
                ]
            });
        }

        let tree = syntaxTree(state);
        let mainMethod = this.getMainMethod(tree, state, text);
        if (!mainMethod.node) return MethodEvaluationStatus.NoMainMethodFound;

        let arrowFunction = mainMethod.node.getChild('ArrowFunction');
        let block = arrowFunction ? arrowFunction.getChild('Block') : mainMethod.node.getChild('Block');
        let returnStatement = block?.getChild('ReturnStatement') ?? undefined;
        return returnStatement ? MethodEvaluationStatus.ReturnValueFound : MethodEvaluationStatus.NoReturnValue;

    }

    static getMainMethod(tree?: Tree, state?: EditorState, text?: string[] | string): ISyntaxNodeResponse {

        let convertedText = Array.isArray(text) ? text.join('\n') : text;

        if (!state) {
            if (!text) throw ('no state and no text passed');

            state = EditorState.create({
                doc: convertedText,
                extensions: [
                    javascript()
                ]
            });
        }

        if (!tree) tree = syntaxTree(state);

        let node = tree.resolveInner(0);
        let functions = [...node.getChildren("ExpressionStatement")];

        return { 'node': functions.length > 0 ? functions[functions.length - 1] : null, 'tree': tree };

    }

    static getUsedInputParams(state?: EditorState, text?: string[] | string): { varName: string, propertyName: string | null }[] {

        let output: { varName: string, propertyName: string | null }[] = [];

        let convertedText = text ? Array.isArray(text) ? text.join('\n') : text : (state?.doc as any).text.join('\n');

        if (!state) {
            if (!text) throw ('no state and no text passed');

            state = EditorState.create({
                doc: convertedText,
                extensions: [
                    javascript()
                ]
            });
        }

        let tree = syntaxTree(state);
        let mainMethod = this.getMainMethod(tree, state, text);
        if (!mainMethod.node) return [];

        let arrowFunction = mainMethod.node.getChild('ArrowFunction');
        let block = arrowFunction ? arrowFunction.getChild('Block') : mainMethod.node.getChild('Block');

        let candidates = this.getMemberExpressionContainingCandidates(block);

        for (let candidate of candidates) {

            let statement: SyntaxNode | null = candidate;
            while (statement && statement.type.name !== 'MemberExpression') {
                let result = this.iterateToMemberStatementNode(statement);
                statement = result[0] ?? null;
                candidates.push(...result.slice(1));
            }

            let variableNameNode = this.extractMemberExpressionVariableNameNode(statement);
            if (variableNameNode == null) continue;

            var varNodeName = convertedText!.slice(variableNameNode.from, variableNameNode.to);

            if (varNodeName === 'console') {
                if (statement.nextSibling) candidates.push(statement.nextSibling);
                continue;
            }

            let propertyNameNode = variableNameNode.nextSibling?.nextSibling;

            output.push({
                'varName': varNodeName,
                'propertyName': convertedText?.slice(propertyNameNode?.from, propertyNameNode?.to) ?? null
            });
        }

        return output;
    }

    static getMemberExpressionContainingCandidates(blockNode: SyntaxNode | null): SyntaxNode[] {
        let candidates = blockNode ? [
            ...blockNode.getChildren('ExpressionStatement'),
            ...blockNode.getChildren('VariableDeclaration'),
            ...blockNode.getChildren('ObjectExpression')
        ] : [];
        blockNode?.getChildren("ReturnStatement").forEach(statement => {
            candidates.push(
                ...statement.getChildren('MemberExpression'),
                ...statement.getChildren('ObjectExpression'),
                ...statement.getChildren('ArrayExpression'),
                ...statement.getChildren('BinaryExpression'),
                ...statement.getChildren('ParenthesizedExpression'),
                ...statement.getChildren('TemplateString')
            );
        });
        return candidates;
    }

    static extractMemberExpressionVariableNameNode(node: SyntaxNode | null): SyntaxNode | null {
        if (node?.type.name !== 'MemberExpression') return null;
        let candidate: SyntaxNode | null = node;
        while (candidate && candidate.type.name === 'MemberExpression') candidate = candidate.firstChild;
        return candidate && candidate.type.name === 'VariableName' ? candidate : null;
    }

    static iterateToMemberStatementNode(node: SyntaxNode | null): SyntaxNode[] {
        if (node == null) return [];
        switch (node.type.name) {
            case '{':
            case '[':
            case 'LineComment':
            case 'var':
            case 'VariableDefinition':
            case 'Equals':
            case 'return':
            case 'PropertyDefinition':
            case 'String':
            case ':':
                return node.nextSibling ? [node.nextSibling] : [];

            case 'ExpressionStatement':
            case 'CallExpression':
            case 'VariableDeclaration':
            case 'ReturnStatement':
            case 'Property':
                return node.firstChild ? [node.firstChild] : [];

            case 'ObjectExpression':
                return node.getChildren('Property');

            case 'ArrayExpression':
            case 'ArgList':
            case 'BinaryExpression':
            case 'ParenthesizedExpression':
            case 'Interpolation':
                return [...node.getChildren('MemberExpression'), ...node.getChildren('BinaryExpression'), ...node.getChildren('ParenthesizedExpression')];

            case 'TemplateString':
                return node.getChildren('Interpolation');
        }
        return [];
    }
}

export interface ISyntaxNodeResponse {
    node: SyntaxNode | null;
    tree: Tree;
}