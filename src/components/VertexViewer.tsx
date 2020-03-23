import React from 'react';
import { PickEvent } from '../types/vertexElements';

export interface VertexViewerProps {
  cameraControls: boolean;
  children: React.ReactNode;
  className?: string;
  credentialsApiKey?: string;
  credentialsClientId?: string;
  credentialsToken?: string;
  id?: string;
  model: string;
  onPickEvent(event: PickEvent): Promise<void> | void;
}

class VertexViewer extends React.Component<VertexViewerProps, {}> {
  static defaultProps = { id: 'vertex-viewer' };

  getViewer = (): Element | null => {
    return document.querySelector(`#${this.props.id}`);
  };

  componentDidMount(): void {
    const viewer = this.getViewer();

    if (viewer) {
      viewer.addEventListener('pick', this.props.onPickEvent);
    }
  }

  componentWillUnmount(): void {
    const viewer = this.getViewer();

    if (viewer) {
      viewer.removeEventListener('pick', this.props.onPickEvent);
    }
  }

  render(): JSX.Element {
    return (
      <vertex-viewer
        className={this.props.className}
        credentials-api-key={this.props.credentialsApiKey}
        credentials-client-id={this.props.credentialsClientId}
        credentials-token={this.props.credentialsToken}
        id={this.props.id}
        model={this.props.model}
      >
        {this.props.children}
      </vertex-viewer>
    );
  }
}

export default VertexViewer;
