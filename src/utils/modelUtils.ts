export function colorPart(viewer, part): void {
  viewer.chainOperations().then(operationChain => {
    operationChain.setVisibility([part], false).send();
  });
}

export function colorPartOnly(viewer, part): void {
  viewer.chainOperations().then(operationChain => {
    operationChain
      .clearMaterialOverrides()
      .setMaterialOverride([part], '#ff00dc')
      .send();
  });
}

export function hidePart(viewer, part): void {
  viewer.chainOperations().then(operationChain => {
    operationChain.setVisibility([part], false).send();
  });
}
