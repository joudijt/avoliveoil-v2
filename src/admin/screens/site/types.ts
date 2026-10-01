import type { ImageOverride } from '../../../cms/contracts';

/** An image override being edited; hasAlpha drives the "needs a cut-out" warning. */
export type ImageEdit = ImageOverride & { hasAlpha?: boolean };
