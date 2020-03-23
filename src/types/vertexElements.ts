export interface VertexViewer extends HTMLElement {
  chainOperations(): Promise<OperationChain>;
}

export interface OperationChain {
  setVisibility(partIds: string[], visible: boolean): OperationChain;
  clearMaterialOverrides(): OperationChain;
  send(): void;
}

export type PickEvent = CustomEvent<PickDetail>;

export interface PickDetail {
  hitResults: HitResult[];
  altKey: boolean;
  ctrlKey: boolean;
}

export interface HitResult {
  bomItem: BomItem;
}

export interface BomItem {
  id: string;
}
