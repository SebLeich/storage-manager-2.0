export enum ValidationError {
    NoStartEvent, MultipleStartEvents, StartEventWithIncomingSequenceFlow, NoEndEvent, SequenceEndWithoutEndEvent, MultipleOutgoingSequenceFlowsFromNoneGatewayShape
}
