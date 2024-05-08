import { v4 as generateGuid } from 'uuid';

export class ExemplaryBpmnModel {
  public activityGuid = 'exemplaryGuid';
  public bpmnJsModel = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1oh6zyk" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.3.2">
      <bpmn:process id="Process_18uoxv7" isExecutable="false">
        <bpmn:startEvent id="StartEvent_0spahuc">
          <bpmn:outgoing>Flow_077cne0</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:task id="${this.activityGuid}" name="test">
          <bpmn:incoming>Flow_077cne0</bpmn:incoming>
          <bpmn:outgoing>Flow_1hdkr1e</bpmn:outgoing>
        </bpmn:task>
        <bpmn:sequenceFlow id="Flow_077cne0" sourceRef="StartEvent_0spahuc" targetRef="${this.activityGuid}" />
        <bpmn:endEvent id="Event_1ychqt1">
          <bpmn:incoming>Flow_1hdkr1e</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1hdkr1e" sourceRef="${this.activityGuid}" targetRef="Event_1ychqt1" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_18uoxv7">
          <bpmndi:BPMNEdge id="Flow_077cne0_di" bpmnElement="Flow_077cne0">
            <di:waypoint x="188" y="120" />
            <di:waypoint x="240" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1hdkr1e_di" bpmnElement="Flow_1hdkr1e">
            <di:waypoint x="340" y="120" />
            <di:waypoint x="392" y="120" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0spahuc">
            <dc:Bounds x="152" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="${this.activityGuid}_di" bpmnElement="${this.activityGuid}">
            <dc:Bounds x="240" y="80" width="100" height="80" />
            <bpmndi:BPMNLabel />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1ychqt1_di" bpmnElement="Event_1ychqt1">
            <dc:Bounds x="392" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;
}
