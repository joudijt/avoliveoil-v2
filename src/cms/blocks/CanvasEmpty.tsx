/**
 * Canvas-only stand-in for a widget that renders nothing on the public site yet
 * (no photo chosen, no video URL, no form…). Styled by the canvas stylesheet via
 * the data attribute, so it adds no classes to the public CSS contract.
 */
export function CanvasEmpty({ label }: { label: string }) {
  return <div data-cms-canvas-empty="">{label}</div>;
}
