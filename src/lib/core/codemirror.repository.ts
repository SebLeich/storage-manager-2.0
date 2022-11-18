import { javascript } from "@codemirror/lang-javascript";
import { syntaxTree } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { MethodEvaluationStatus } from "../process-builder/globals/method-evaluation-status";
import { Tree, SyntaxNode } from 'node_modules/@lezer/common/dist/tree';
import { IMethodEvaluationResult } from "../process-builder/interfaces/i-method-evaluation-result.interface";
import { ISyntaxNodeResponse } from "./interfaces/syntax-node-response.interface";

export class CodemirrorRepository {

    static evaluateCustomMethod(state?: EditorState, text?: string[] | string, injector?: any): IMethodEvaluationResult {

        const convertedText = Array.isArray(text) ? text.join('\n') : text;
        if (!state) {
            if (!text) {
                throw ('no state and no text passed');
            }

            state = EditorState.create({
                doc: convertedText,
                extensions: [
                    javascript()
                ]
            });
        }

        const tree = syntaxTree(state);
        const mainMethod = this.getMainMethod(tree, state, text);
        if (!mainMethod.node) {
            return { status: MethodEvaluationStatus.NoMainMethodFound, valueIsDefinite: false };
        }

        const arrowFunction = mainMethod.node.getChild('ArrowFunction');
        const block = arrowFunction ? arrowFunction.getChild('Block') : mainMethod.node.getChild('Block');
        const returnStatement = block?.getChild('ReturnStatement') ?? undefined;
        if (returnStatement) {
            const result = this.getEvaluationResult(state, returnStatement, block!, injector);
            if (result) {
                return result;
            }
        }

        return { status: MethodEvaluationStatus.NoReturnValue, valueIsDefinite: false };
    }

    static getEvaluationResult(state: EditorState, parent: SyntaxNode, block: SyntaxNode, injector: any): IMethodEvaluationResult {
        const memberExpression = parent.getChild('MemberExpression');
        if (memberExpression) {
            const representation = state.sliceDoc(memberExpression?.from, memberExpression?.to);
            const navigationPath = representation.split('.');
            let dependsOnInjector = navigationPath[0] === 'injector';
            if (!dependsOnInjector) {
                const variableValue = this.resolveVariableValue(state, block!, representation);
                if (variableValue) {
                    let result = this.getEvaluationResult(state, variableValue, block, injector);
                    result.valueIsDefinite = false;
                    return result;
                }
            }
            return { status: MethodEvaluationStatus.ReturnValueFound, injectorNavigationPath: representation, type: 'member', valueIsDefinite: false };
        }

        const variableExpression = parent.getChild('VariableName');
        if (variableExpression) {
            const representation = state.sliceDoc(variableExpression?.from, variableExpression?.to);
            if (representation === 'undefined') {
                return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: undefined, type: 'undefined', valueIsDefinite: true };
            }

            let dependsOnInjector = representation === 'injector';
            if (!dependsOnInjector) {
                const variableValue = this.resolveVariableValue(state, block!, representation);
                if (variableValue) {
                    let result = this.getEvaluationResult(state, variableValue, block, injector);
                    result.valueIsDefinite = false;
                    return result;
                }

                return { status: MethodEvaluationStatus.ReturnValueFound, valueIsDefinite: false };
            }
            return { status: MethodEvaluationStatus.ReturnValueFound, injectorNavigationPath: representation, type: 'variable', valueIsDefinite: true, detectedValue: injector };
        }

        const stringExpression = parent.getChild('String');
        if (stringExpression) {
            const representation = state.sliceDoc(stringExpression?.from, stringExpression?.to);
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: representation, type: 'string', valueIsDefinite: true };
        }

        const numberExpression = parent.getChild('Number');
        if (numberExpression) {
            const representation = state.sliceDoc(numberExpression?.from, numberExpression?.to);
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: parseFloat(representation), type: 'number', valueIsDefinite: true };
        }

        const objectExpression = parent.getChild('ObjectExpression');
        if (objectExpression) {
            const representation = state.sliceDoc(objectExpression?.from, objectExpression?.to);
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: JSON.parse(representation), type: 'object', valueIsDefinite: false };
        }

        const booleanLiteral = parent.getChild('BooleanLiteral');
        if (booleanLiteral) {
            const representation = state.sliceDoc(booleanLiteral?.from, booleanLiteral?.to);
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: representation === 'true', type: 'boolean', valueIsDefinite: true };
        }

        const arrayExpression = parent.getChild('ArrayExpression');
        if (arrayExpression) {
            const representation = state.sliceDoc(arrayExpression?.from, arrayExpression?.to);
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: JSON.parse(representation), type: 'array', valueIsDefinite: false };
        }

        const nullExpression = parent.getChild('null');
        if (nullExpression) {
            return { status: MethodEvaluationStatus.ReturnValueFound, detectedValue: null, type: 'null', valueIsDefinite: true };
        }

        return { status: MethodEvaluationStatus.NoReturnValue, valueIsDefinite: false };
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

    static resolveVariableValue(state: EditorState, blockNode: SyntaxNode, variableName: string) {
        const declarations = blockNode.getChildren('VariableDeclaration');
        if (declarations.length === 0) {
            return undefined;
        }

        const definition = declarations.find(declaration => {
            const child = declaration.getChild('VariableDefinition');
            const representation = state.sliceDoc(child?.from, child?.to);
            return representation === variableName;
        });
        if (!definition) {
            return undefined;
        }

        return definition;
    }
}