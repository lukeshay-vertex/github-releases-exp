import React from 'react';
import * as VertexElements from './types/vertexElements';
import { PickEvent } from './types/vertexElements';
import * as ModelUtils from './utils/modelUtils';
import VertexViewer from './components/VertexViewer';
import VertexViewerToolbar from './components/VertexViewerToolbar';
import './App.css';

const MODEL_ID = '821d3ab5-1faf-4db2-bb6f-8ca0ff2583b4';
const MODEL_URN = `urn:vertexvis:eedc:file:${MODEL_ID}`;
const CREDENTIALS_API_KEY = 'w8cNUBGQgP_UgjdPinvj_Cg0I_k-Zz0dfrPHiMRz_C8=';
// const CREDENTIALS_CLIENT_ID =
// '6CF92C64267B6A8589F73BD73FB3A6B85A994A7A9A81AADB25D29C1C99FAE894';
// const CREDENTIALS_TOKEN =
// 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ2ZXJ0ZXgtYXBpIiwiaWF0IjoxNTgzMTc0NzI4LCJleHAiOjE1ODMxNzgzMjgsImlzcyI6ImFwaS5kZXYudmVydGV4dmlzLmlvIiwic3ViIjoiNkNGOTJDNjQyNjdCNkE4NTg5RjczQkQ3M0ZCM0E2Qjg1QTk5NEE3QTlBODFBQURCMjVEMjlDMUM5OUZBRTg5NCIsImp0aSI6IjljYzExNjk0LThmYTUtNGViNi05MzQ1LWUxYzIwODYyZjUwOSIsIm9yZ0lkIjoiMzg2OTEyMWMtN2EzYi00OTUwLThhZjEtZjllYTYwZDEyOGUwIiwic2NvcGVzIjoiaW50ZXJuYWwuKiJ9.DSC-MADmrRiQ0hDVU9Eg9emmFiCQfZjVvaFt3sADSrs';
// const MODEL_URN =
// 'urn:vertexvis:eedc:file:579b14e7-5a84-4af3-9503-b7c2f99cd51c';

export interface AppState {
  coloredParts: string[];
  hiddenParts: string[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = { coloredParts: [], hiddenParts: [] };

  keyUpListener = (event: KeyboardEvent): void => {
    const viewer: VertexElements.VertexViewer | null = document.querySelector(
      '#vertex-viewer'
    );

    if (!viewer) return;

    if (event.key === 's') {
      this.state.hiddenParts.forEach((part) => {
        viewer
          .chainOperations()
          .then((operationChain: VertexElements.OperationChain) => {
            operationChain.setVisibility([part], true).send();

            const temp = this.state.hiddenParts;
            temp.shift();
            this.setState((current: AppState) => ({
              ...current,
              hiddenParts: temp,
            }));
          });
      });
    } else if (event.key === 'r') {
      viewer.chainOperations().then((operationChain) => {
        operationChain.clearMaterialOverrides().send();
        this.setState((current: AppState) => ({
          ...current,
          coloredParts: [],
        }));
      });
    }
  };

  pickListener = (event: PickEvent): void => {
    const viewer = document.querySelector('#vertex-viewer');

    const part: string = event.detail.hitResults[0].bomItem.id;

    if (event.detail.altKey) {
      ModelUtils.hidePart(viewer, part);

      const temp = this.state.hiddenParts;
      temp.push(part);
      this.setState((current: AppState) => ({
        ...current,
        hiddenParts: temp,
      }));
    } else if (event.detail.ctrlKey) {
      ModelUtils.colorPart(viewer, part);

      const temp = this.state.coloredParts;
      temp.push(part);
      this.setState((current: AppState) => ({
        ...current,
        coloredParts: temp,
      }));
    } else {
      ModelUtils.colorPartOnly(viewer, part);
      this.setState((current: AppState) => ({
        ...current,
        coloredParts: [part],
      }));
    }
  };

  componentDidMount(): void {
    window.addEventListener('keyup', this.keyUpListener);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.keyUpListener);
  }

  render(): JSX.Element {
    return (
      <VertexViewer
        cameraControls
        model={MODEL_ID}
        // credentialsClientId={CREDENTIALS_CLIENT_ID}
        // credentialsToken={CREDENTIALS_TOKEN}
        credentialsApiKey={CREDENTIALS_API_KEY}
        onPickEvent={this.pickListener}
      >
        <VertexViewerToolbar dataViewer="vertex-viewer" />
      </VertexViewer>
    );
  }
}

export default App;
