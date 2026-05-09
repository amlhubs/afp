// @amlhubs/afp — OMG Automated Function Points (AFP) 1.0 — index re-exports
//
// Surfaces the typed AFP MeasureLibrary instance constants (afp.{measure}.{name})
// so call-sites look like:
//   afp.measure.ftr
//   afp.measure.afps
//   afp.scope.element
//   afp.characteristic.automatedFunctionPointSize
//   afp.operation.isEO
//
// Tree-shakeable named exports for the typed instance constants and the
// library aggregator are provided after deploy implementers populate afp.ts.

export * from './afp.js';
