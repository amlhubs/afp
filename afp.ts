// ═══════════════════════════════════════════════════════════════════════════
// @amlhubs/afp — OMG Automated Function Points (AFP) 1.0
// formal/14-01-03 (December 2013) — ISO/IEC 19515:2019
//
// Scope: The AFP 1.0 specification surfaces the IFPUG Function Point Counting
// Practices Manual rules as a typed SMM 1.2 MeasureLibrary. AFP introduces no
// new metaclasses — every AFP artefact is an instance of an SMM metaclass.
// This package therefore exports typed instance interfaces (ID-stamped,
// readonly) and frozen library constants that preserve the AFP §x.y citation
// for every measure, scope, characteristic, operation, and relationship.
//
// Architecture:
//   @amlhubs/uml → @amlhubs/smm → @amlhubs/afp (this package)
//
// Surface (mirrors AFP 1.0 §5–§10 inventory + AutomatedFunctionPoint.xmi):
//   §6 / Library:        FunctionalMeasures (MeasureCategory)
//   §6 / Characteristic: General, ExternalOutputSize, ExternalInputSize,
//                        InternalLogicalFileSizeAndExternaInterfaceFileSize,
//                        AutomatedFunctionPointSize
//   §6 / Scope:          Element, EO, EI, LF, Segment
//   §6 / Operation:      isEO, getEOs, isEI, getEIs, isILF, getILFs,
//                        isEIF, getEIFs, isLF
//   §7 / DimensionalMeasure: FTR, DET, RET
//   §7 / RescaledMeasure: FTR_EO, DET_EO, EOC, wEO, FTR_EI, DET_EI, EIC, wEI,
//                         RET_LF, DET_LF, DFC, wILF, wEIF
//   §7 / BinaryMeasure:   EOCsum, EICSum, DFCsum
//   §7 / CollectiveMeasure: EOs, EIs, ILFs, EIFs, AFPs
//   §7 / RescaledMeasureRelationship × Base{,1,2}MeasureRelationship: 17 edges
// ═══════════════════════════════════════════════════════════════════════════

// Implementation begins — populated by deploy implementers.
export {};
