import React from 'react';

export interface VertexViewerToolbarProps {
  dataViewer: string;
}

const VertexViewerToolbar: React.FC<VertexViewerToolbarProps> = ({
  dataViewer
}): JSX.Element => <vertex-viewer-toolbar data-viewer={dataViewer} />;

export default VertexViewerToolbar;
