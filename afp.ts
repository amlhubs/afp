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
//   §7 / RescaledMeasureRelationship × Base{,1,2}MeasureRelationship: 27 edges
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// § 0. IMPORTS
// ═══════════════════════════════════════════════════════════════════════════

import type {
  IMeasureCategory,
  ICharacteristic,
  IScope,
  IOperation,
  IDimensionalMeasure,
  IRescaledMeasure,
  IBinaryMeasure,
  ICollectiveMeasure,
  IMeasureLibrary,
  ISmmModel,
  IBaseNMeasureRelationship,
  IBase1MeasureRelationship,
  IBase2MeasureRelationship,
  IRescaledMeasureRelationship,
} from '@amlhubs/smm';

// ═══════════════════════════════════════════════════════════════════════════
// § 1. AFP XMI IDENTIFIER CONSTANTS
//
// Verbatim xmi:id values published by OMG in
// `spec/AutomatedFunctionPoint.xmi`. These are preserved so consumer
// XMI tooling can round-trip the AFP library without losing identity.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section AutomatedFunctionPoint.xmi (every xmi:id verbatim)
 * @kind frozen identifier registry
 * @definition Maps every AFP element name to the OMG-published xmi:id token,
 *   preserving round-trip parseability with the XMI artefact.
 */
export const AFP_XMI_ID = Object.freeze({
  // SmmModel root
  AutomatedFunctionPoint: '__4K-0fOZEeGAl6dCCRBZ4Q',
  // Library
  AutomatedFunctionPointLibrary: '_XW4E8POaEeGAl6dCCRBZ4Q',
  // MeasureCategory
  FunctionalMeasures: '_lMjzofOgEeGtUOd1RMSY8w',
  // Characteristics
  General: '_V_RaAPO0EeGtUOd1RMSY8w',
  ExternalOutputSize: '_mujx4POgEeGtUOd1RMSY8w',
  ExternalInputSize: '_DEBJkPO3EeGtUOd1RMSY8w',
  InternalLogicalFileSizeAndExternaInterfaceFileSize: '_Tfs90Pa1EeGHXuMIrzLXMA',
  AutomatedFunctionPointSize: '__ugqQPa_EeGHXuMIrzLXMA',
  // Scopes
  Element: '_ttONIPOgEeGtUOd1RMSY8w',
  EO: '_pd9nUPO0EeGtUOd1RMSY8w',
  EI: '_uyQrIPO3EeGtUOd1RMSY8w',
  LF: '_SXzdcPa8EeGHXuMIrzLXMA',
  Segment: '_If4nQPO1EeGtUOd1RMSY8w',
  // KDM-recognizer Operations
  isEO: '_eFrLUPOyEeGtUOd1RMSY8w',
  getEOs: '_-RJX0POzEeGtUOd1RMSY8w',
  isEI: '_z5r38PO3EeGtUOd1RMSY8w',
  getEIs: '_709FYPO3EeGtUOd1RMSY8w',
  isILF: '_kRa_0Pa7EeGHXuMIrzLXMA',
  getILFs: '_0WPHQPa7EeGHXuMIrzLXMA',
  isEIF: '_67SIoPa7EeGHXuMIrzLXMA',
  getEIFs: '_Bj7QkPa8EeGHXuMIrzLXMA',
  isLF: '_IUOfsPa8EeGHXuMIrzLXMA',
  // DimensionalMeasures (§7)
  FTR: '_n9QZoPOgEeGtUOd1RMSY8w',
  DET: '_-YGPAPOgEeGtUOd1RMSY8w',
  RET: '_dkTPQPa1EeGHXuMIrzLXMA',
  // RescaledMeasures (§7)
  FTR_EO: '_DQKKIPOhEeGtUOd1RMSY8w',
  DET_EO: '_XUNHQPOhEeGtUOd1RMSY8w',
  EOC: '_5AFzEPOhEeGtUOd1RMSY8w',
  wEO: '_ClRvMPOjEeGtUOd1RMSY8w',
  FTR_EI: '_qpCzAvO3EeGtUOd1RMSY8w',
  DET_EI: '_Zdha0PO6EeGtUOd1RMSY8w',
  EIC: '_AgJh0fO7EeGtUOd1RMSY8w',
  wEI: '_oym5APO7EeGtUOd1RMSY8w',
  RET_LF: '_R-In8Pa2EeGHXuMIrzLXMA',
  DET_LF: '_xVQNEPa8EeGHXuMIrzLXMA',
  DFC: '_jYXmAPa9EeGHXuMIrzLXMA',
  wILF: '_uFgBoPa-EeGHXuMIrzLXMA',
  wEIF: '_XVXcQPa_EeGHXuMIrzLXMA',
  // BinaryMeasures (§7)
  EOCsum: '_Tvj_APOlEeGtUOd1RMSY8w',
  EICSum: '_QHdN4PO7EeGtUOd1RMSY8w',
  DFCsum: '_GBTlYPa9EeGHXuMIrzLXMA',
  // CollectiveMeasures (§7)
  EOs: '_XZnVQPOtEeGtUOd1RMSY8w',
  EIs: '_5dUi0PO7EeGtUOd1RMSY8w',
  ILFs: '_DwRE8Pa_EeGHXuMIrzLXMA',
  EIFs: '_rX0d8Pa_EeGHXuMIrzLXMA',
  AFPs: '_HlA3APbBEeGHXuMIrzLXMA',
  // RescaledMeasureRelationships (13)
  REL_FTR_to_FTR_EO: '_I4froPOhEeGtUOd1RMSY8w',
  REL_DET_to_DET_EO: '_bYBiAPOhEeGtUOd1RMSY8w',
  REL_EOCsum_to_EOC: '_6JICQPOiEeGtUOd1RMSY8w',
  REL_EOC_to_wEO: '_HrpzIPOjEeGtUOd1RMSY8w',
  REL_FTR_to_FTR_EI: '_BFys4PO4EeGtUOd1RMSY8w',
  REL_DET_to_DET_EI: '_8U-h4PO6EeGtUOd1RMSY8w',
  REL_EICsum_to_EIC: '_xHzpYPO7EeGtUOd1RMSY8w',
  REL_EIC_to_wEI: '_1FUn0PO7EeGtUOd1RMSY8w',
  REL_RET_to_RET_LF: '_r7GRgPa8EeGHXuMIrzLXMA',
  REL_DET_to_DET_LF: '__N5X4Pa8EeGHXuMIrzLXMA',
  REL_DFCsum_to_DFC: '_nu5r8Pa-EeGHXuMIrzLXMA',
  REL_DFC_to_wILF: '_9j9TsPa-EeGHXuMIrzLXMA',
  REL_DFC_to_wEIF: '_lnT34Pa_EeGHXuMIrzLXMA',
  // Base1MeasureRelationships (3)
  REL_EOCsum_to_FTR_EO: '_gNYxoPOlEeGtUOd1RMSY8w',
  REL_EICSum_to_FTR_EI: '_daXOYPO7EeGtUOd1RMSY8w',
  REL_DFCsum_to_RET_LF: '_RonmwPa9EeGHXuMIrzLXMA',
  // Base2MeasureRelationships (3)
  REL_EOCsum_to_DET_EO: '_on_mcPOlEeGtUOd1RMSY8w',
  REL_EICSum_to_DET_EI: '_jV_fUPO7EeGtUOd1RMSY8w',
  REL_DFCsum_to_DET_LF: '_ZFzKAPa9EeGHXuMIrzLXMA',
  // BaseNMeasureRelationships — CollectiveMeasure → base (8)
  REL_EOs_to_wEO: '_dRcEQPOtEeGtUOd1RMSY8w',
  REL_EIs_to_wEI: '_JeSsEPO8EeGtUOd1RMSY8w',
  REL_ILFs_to_wILF: '_MaMvMPa_EeGHXuMIrzLXMA',
  REL_EIFs_to_wEIF: '_z4oBYPa_EeGHXuMIrzLXMA',
  REL_AFPs_to_ILFs: '_VSghwPbBEeGHXuMIrzLXMA',
  REL_AFPs_to_EIFs: '_ahK_APbBEeGHXuMIrzLXMA',
  REL_AFPs_to_EIs: '_ePrREPbBEeGHXuMIrzLXMA',
  REL_AFPs_to_EOs: '_i2m_8PbBEeGHXuMIrzLXMA',
} as const);

// ═══════════════════════════════════════════════════════════════════════════
// § 2. AFP SCOPES (5 instances)
//
// SMM Scope identifies the kind of KDM Element a Measure applies to. AFP
// declares five scopes — one root (Element), three specialised KDM-Element
// scopes (EO, EI, LF), and one container scope (Segment) used by the
// CollectiveMeasures that aggregate per-Segment.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Scope inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _ttONIPOgEeGtUOd1RMSY8w
 * @kind smm:Scope
 * @scopeClass kdm:Core::Element
 * @definition An AFP Scope identifies a kind of KDM Element a Measure applies
 *   to. Element is the root scope; specialised scopes (EO, EI, LF) narrow it
 *   through recognizer Operations isEO / isEI / isLF.
 */
export const AFP_SCOPE_Element: IScope = Object.freeze({
  elementId: AFP_XMI_ID.Element,
  name: 'Element',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'ExternalOutput',
  scopeClass: 'kdm:Core::Element',
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Scope inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _pd9nUPO0EeGtUOd1RMSY8w
 * @kind smm:Scope
 * @scopeClass kdm:Core::Element
 * @recognizerQuery isEO
 * @definition AFP Scope for External Output (EO) — a KDM Element recognised
 *   by the isEO Operation. Scope of the FTR_EO, DET_EO, EOC, wEO, EOCsum
 *   measures.
 */
export const AFP_SCOPE_EO: IScope = Object.freeze({
  elementId: AFP_XMI_ID.EO,
  name: 'EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Output',
  scopeClass: 'kdm:Core::Element',
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Scope inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _uyQrIPO3EeGtUOd1RMSY8w
 * @kind smm:Scope
 * @scopeClass kdm:Core::Element
 * @definition AFP Scope for External Input (EI) — a KDM Element recognised
 *   by the isEI Operation. Scope of the FTR_EI, DET_EI, EIC, wEI, EICSum
 *   measures.
 */
export const AFP_SCOPE_EI: IScope = Object.freeze({
  elementId: AFP_XMI_ID.EI,
  name: 'EI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Input',
  scopeClass: 'kdm:Core::Element',
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Scope inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _SXzdcPa8EeGHXuMIrzLXMA
 * @kind smm:Scope
 * @scopeClass kdm:Core::Element
 * @recognizerQuery isLF
 * @definition AFP Scope for Logical File (LF) — a KDM Element recognised by
 *   the isLF Operation (equivalent to `isILF or isEIF`). Scope of the
 *   RET_LF, DET_LF, DFC, DFCsum, wILF, wEIF measures.
 */
export const AFP_SCOPE_LF: IScope = Object.freeze({
  elementId: AFP_XMI_ID.LF,
  name: 'LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Logical File (Internal Logical File or External Interface File)',
  scopeClass: 'kdm:Core::Element',
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Scope inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _If4nQPO1EeGtUOd1RMSY8w
 * @kind smm:Scope
 * @scopeClass kdm:kdm::Segment
 * @definition AFP Scope for a KDM Segment — the container scope of the
 *   CollectiveMeasures (EOs, EIs, ILFs, EIFs, AFPs) that aggregate
 *   per-element measurements over a Segment.
 */
export const AFP_SCOPE_Segment: IScope = Object.freeze({
  elementId: AFP_XMI_ID.Segment,
  name: 'Segment',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'A KDM Segment',
  scopeClass: 'kdm:kdm::Segment',
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 3. AFP KDM-RECOGNIZER OPERATIONS (9 instances)
//
// AFP declares 9 reusable Operations bound to the KDM metamodel: 5 boolean
// recognizers (isEO/isEI/isILF/isEIF/isLF) and 4 set-extractors
// (getEOs/getEIs/getILFs/getEIFs). They are referenced from Scope
// `recognizerQuery` and CollectiveMeasure `measurandQuery` ends.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _eFrLUPOyEeGtUOd1RMSY8w
 * @kind smm:Operation
 * @definition Return true if the argument KDM Element is an External Output
 *   and false otherwise.
 */
export const AFP_OPERATION_isEO: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.isEO,
  name: 'isEO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Return true if the argument KDM Element is an External Output and false otherwise.',
  shortDescription: '',
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _-RJX0POzEeGtUOd1RMSY8w
 * @kind smm:Operation
 * @definition Get the External Output elements from a KDM Segment (such that
 *   isEO is true).
 */
export const AFP_OPERATION_getEOs: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.getEOs,
  name: 'getEOs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Get the External Output elements from a KDM Segment (such that isEO is true).',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _z5r38PO3EeGtUOd1RMSY8w
 * @kind smm:Operation
 * @definition Return true if the KDM Element is an External Output and false
 *   otherwise. (Note: the XMI description says "External Output" — preserved
 *   verbatim from formal/14-01-03 even though the operation name is `isEI`.)
 */
export const AFP_OPERATION_isEI: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.isEI,
  name: 'isEI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Return true if the KDM Element is an External Output and false otherwise.',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _709FYPO3EeGtUOd1RMSY8w
 * @kind smm:Operation
 * @definition Get the External Output elements from a KDM Segment (such that
 *   isEO is true). (XMI description preserved verbatim from formal/14-01-03.)
 */
export const AFP_OPERATION_getEIs: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.getEIs,
  name: 'getEIs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Get the External Output elements from a KDM Segment (such that isEO is true).',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _kRa_0Pa7EeGHXuMIrzLXMA
 * @kind smm:Operation
 * @definition Return true if the argument KDM Element is an Internal Logical
 *   File and false otherwise.
 */
export const AFP_OPERATION_isILF: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.isILF,
  name: 'isILF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Return true if the argument KDM Element is an Internal Logical File and false otherwise.',
  shortDescription: '',
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _0WPHQPa7EeGHXuMIrzLXMA
 * @kind smm:Operation
 * @definition Get the Internal Logical File elements from a KDM Segment
 *   (such that isILF is true).
 */
export const AFP_OPERATION_getILFs: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.getILFs,
  name: 'getILFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Get the Internal Logical File elements from a KDM Segment (such that isILF is true).',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _67SIoPa7EeGHXuMIrzLXMA
 * @kind smm:Operation
 * @definition Return true if the argument KDM Element is an External
 *   Interface File and false otherwise.
 */
export const AFP_OPERATION_isEIF: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.isEIF,
  name: 'isEIF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Return true if the argument KDM Element is an External Interface File and false otherwise.',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _Bj7QkPa8EeGHXuMIrzLXMA
 * @kind smm:Operation
 * @definition Get the External Interface File elements from a KDM Segment
 *   (such that isILF is true). (XMI description preserved verbatim from
 *   formal/14-01-03 even though the predicate referenced should be isEIF.)
 */
export const AFP_OPERATION_getEIFs: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.getEIFs,
  name: 'getEIFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Get the External Interface File elements from a KDM Segment (such that isILF is true).',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Operation inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _IUOfsPa8EeGHXuMIrzLXMA
 * @kind smm:Operation
 * @definition Return true if the argument KDM Element is an Internal Logical
 *   File or External Interface File and false otherwise. (Equivalent to
 *   isILF or isEIF.)
 */
export const AFP_OPERATION_isLF: IOperation = Object.freeze({
  elementId: AFP_XMI_ID.isLF,
  name: 'isLF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'Return true if the argument KDM Element is an Internal Logical File or External Interface File and false otherwise. (Equivalent to isILF or isEIF.)',
  shortDescription: undefined,
  language: undefined,
  body: undefined,
  argumentIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 4. AFP CHARACTERISTICS + MEASURE CATEGORY (1 + 5 instances)
//
// AFP §6 declares 5 Characteristics partitioning the measurement axes
// (General; ExternalOutputSize; ExternalInputSize;
// InternalLogicalFileSizeAndExternaInterfaceFileSize;
// AutomatedFunctionPointSize) and 1 MeasureCategory (FunctionalMeasures)
// that classifies all 24 AFP measures.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (MeasureCategory inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _lMjzofOgEeGtUOd1RMSY8w
 * @kind smm:MeasureCategory
 * @definition The single MeasureCategory `FunctionalMeasures` to which every
 *   one of the 24 AFP Measures belongs. AFP does not partition by category;
 *   the category serves as the library-level discriminator for AFP-specific
 *   measures inside an arbitrary consuming SMM model.
 */
export const AFP_CATEGORY_FunctionalMeasures: IMeasureCategory = Object.freeze({
  elementId: AFP_XMI_ID.FunctionalMeasures,
  name: 'FunctionalMeasures',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [],
  annotationIds: [],
  attributeIds: [],
  categoryMeasureIds: [
    AFP_XMI_ID.FTR,
    AFP_XMI_ID.DET,
    AFP_XMI_ID.FTR_EO,
    AFP_XMI_ID.DET_EO,
    AFP_XMI_ID.EOC,
    AFP_XMI_ID.wEO,
    AFP_XMI_ID.EOCsum,
    AFP_XMI_ID.EOs,
    AFP_XMI_ID.RET,
    AFP_XMI_ID.FTR_EI,
    AFP_XMI_ID.DET_EI,
    AFP_XMI_ID.EIC,
    AFP_XMI_ID.EICSum,
    AFP_XMI_ID.wEI,
    AFP_XMI_ID.EIs,
    AFP_XMI_ID.RET_LF,
    AFP_XMI_ID.DET_LF,
    AFP_XMI_ID.DFCsum,
    AFP_XMI_ID.DFC,
    AFP_XMI_ID.wILF,
    AFP_XMI_ID.ILFs,
    AFP_XMI_ID.wEIF,
    AFP_XMI_ID.EIFs,
    AFP_XMI_ID.AFPs,
  ],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Characteristic inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _V_RaAPO0EeGtUOd1RMSY8w
 * @kind smm:Characteristic
 * @definition The general AFP Characteristic carried by the three primitive
 *   counting measures FTR, DET, RET — those whose value is read directly
 *   from the KDM Element regardless of which specialised scope it falls
 *   into.
 */
export const AFP_CHARACTERISTIC_General: ICharacteristic = Object.freeze({
  elementId: AFP_XMI_ID.General,
  name: 'General',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  annotationIds: [],
  attributeIds: [],
  traitIds: [
    AFP_XMI_ID.FTR,
    AFP_XMI_ID.DET,
    AFP_XMI_ID.RET,
  ],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Characteristic inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _mujx4POgEeGtUOd1RMSY8w
 * @kind smm:Characteristic
 * @parent AutomatedFunctionPointSize
 * @definition External Output Size — the AFP Characteristic owning the
 *   measures that quantify the size contribution of External Outputs:
 *   FTR_EO, DET_EO, EOC, wEO, EOCsum, EOs.
 */
export const AFP_CHARACTERISTIC_ExternalOutputSize: ICharacteristic = Object.freeze({
  elementId: AFP_XMI_ID.ExternalOutputSize,
  name: 'ExternalOutputSize',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: AFP_XMI_ID.AutomatedFunctionPointSize,
  description: undefined,
  shortDescription: undefined,
  annotationIds: [],
  attributeIds: [],
  traitIds: [
    AFP_XMI_ID.FTR_EO,
    AFP_XMI_ID.DET_EO,
    AFP_XMI_ID.EOC,
    AFP_XMI_ID.wEO,
    AFP_XMI_ID.EOCsum,
    AFP_XMI_ID.EOs,
  ],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Characteristic inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _DEBJkPO3EeGtUOd1RMSY8w
 * @kind smm:Characteristic
 * @parent AutomatedFunctionPointSize
 * @definition External Input Size — the AFP Characteristic owning the
 *   measures that quantify the size contribution of External Inputs:
 *   FTR_EI, DET_EI, EIC, EICSum, wEI, EIs.
 */
export const AFP_CHARACTERISTIC_ExternalInputSize: ICharacteristic = Object.freeze({
  elementId: AFP_XMI_ID.ExternalInputSize,
  name: 'ExternalInputSize',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: AFP_XMI_ID.AutomatedFunctionPointSize,
  description: undefined,
  shortDescription: undefined,
  annotationIds: [],
  attributeIds: [],
  traitIds: [
    AFP_XMI_ID.FTR_EI,
    AFP_XMI_ID.DET_EI,
    AFP_XMI_ID.EIC,
    AFP_XMI_ID.EICSum,
    AFP_XMI_ID.wEI,
    AFP_XMI_ID.EIs,
  ],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Characteristic inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _Tfs90Pa1EeGHXuMIrzLXMA
 * @kind smm:Characteristic
 * @parent AutomatedFunctionPointSize
 * @definition Internal Logical File Size And External Interface File Size
 *   — the AFP Characteristic owning the measures that quantify the size
 *   contribution of Logical Files (ILF + EIF): RET_LF, DET_LF, DFCsum, DFC,
 *   wILF, ILFs, wEIF, EIFs.
 */
export const AFP_CHARACTERISTIC_InternalLogicalFileSizeAndExternaInterfaceFileSize: ICharacteristic = Object.freeze({
  elementId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  name: 'InternalLogicalFileSizeAndExternaInterfaceFileSize',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: AFP_XMI_ID.AutomatedFunctionPointSize,
  description: undefined,
  shortDescription: undefined,
  annotationIds: [],
  attributeIds: [],
  traitIds: [
    AFP_XMI_ID.RET_LF,
    AFP_XMI_ID.DET_LF,
    AFP_XMI_ID.DFCsum,
    AFP_XMI_ID.DFC,
    AFP_XMI_ID.wILF,
    AFP_XMI_ID.ILFs,
    AFP_XMI_ID.wEIF,
    AFP_XMI_ID.EIFs,
  ],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (Characteristic inventory) — AutomatedFunctionPoint.xmi
 * @xmiId __ugqQPa_EeGHXuMIrzLXMA
 * @kind smm:Characteristic
 * @children ExternalOutputSize, ExternalInputSize,
 *   InternalLogicalFileSizeAndExternaInterfaceFileSize
 * @definition Automated Function Point Size — the umbrella AFP Characteristic
 *   that aggregates the three sub-Characteristics (EO, EI, LF size) into
 *   the single terminal measure AFPs.
 */
export const AFP_CHARACTERISTIC_AutomatedFunctionPointSize: ICharacteristic = Object.freeze({
  elementId: AFP_XMI_ID.AutomatedFunctionPointSize,
  name: 'AutomatedFunctionPointSize',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  annotationIds: [],
  attributeIds: [],
  traitIds: [AFP_XMI_ID.AFPs],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 5. AFP DIMENSIONAL MEASURES (3 instances) — FTR, DET, RET
//
// Primitive counting measures whose values are read directly from KDM
// Elements. These are the leaf inputs to the rescaled and binary measures
// downstream.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _n9QZoPOgEeGtUOd1RMSY8w
 * @kind smm:DimensionalMeasure
 * @definition File Types Referenced — the number of RelationalTables,
 *   DataSegments and RecordFiles referenced in an External Input or
 *   External Output.
 */
export const AFP_MEASURE_FTR: IDimensionalMeasure = Object.freeze({
  elementId: AFP_XMI_ID.FTR,
  name: 'FTR',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'The number of RelationalTables, DataSegments and RecordFiles referenced in an External Input or External Output.',
  shortDescription: 'File Types Referenced',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Element,
  traitId: AFP_XMI_ID.General,
  measureRelationshipIds: [],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [
    AFP_XMI_ID.REL_FTR_to_FTR_EO,
    AFP_XMI_ID.REL_FTR_to_FTR_EI,
  ],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _-YGPAPOgEeGtUOd1RMSY8w
 * @kind smm:DimensionalMeasure
 * @definition Data Element Types — the number of ItemUnits in an Internal
 *   Logical File or External Interface File.
 */
export const AFP_MEASURE_DET: IDimensionalMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DET,
  name: 'DET',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'The number of ItemUnits in an Internal Logical File or External Interface File.',
  shortDescription: 'Data Element Types',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Element,
  traitId: AFP_XMI_ID.General,
  measureRelationshipIds: [],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [
    AFP_XMI_ID.REL_DET_to_DET_EO,
    AFP_XMI_ID.REL_DET_to_DET_EI,
    AFP_XMI_ID.REL_DET_to_DET_LF,
  ],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _dkTPQPa1EeGHXuMIrzLXMA
 * @kind smm:DimensionalMeasure
 * @definition Record Element Types — the number of ContentGroups in the File
 *   Types Referenced in an Internal Logical File or External Interface File.
 */
export const AFP_MEASURE_RET: IDimensionalMeasure = Object.freeze({
  elementId: AFP_XMI_ID.RET,
  name: 'RET',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'The number of ContentGroups in the File Types Referenced in an Internal Logical File or External Interface File.',
  shortDescription: 'Record Element Types',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Element,
  traitId: AFP_XMI_ID.General,
  measureRelationshipIds: [],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_RET_to_RET_LF],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 6. AFP RESCALED MEASURES (13 instances)
//
// FTR_EO, DET_EO, EOC, wEO, FTR_EI, DET_EI, EIC, wEI, RET_LF, DET_LF, DFC,
// wILF, wEIF — all linear-rescale projections of one upstream
// DimensionalMeasure (or, for EOC/EIC/DFC, of the BinaryMeasure sum).
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _DQKKIPOhEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF FTR < 2 THEN FTR_EO = 1; IF 2 <= FTR <= 3 THEN FTR_EO = 2; IF FTR > 3 THEN FTR_EO = 3
 * @definition File Types Referenced rescaled for External Output.
 */
export const AFP_MEASURE_FTR_EO: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.FTR_EO,
  name: 'FTR_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'File Types Referenced rescaled for External Output',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EO,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_FTR_to_FTR_EO],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF FTR < 2 THEN FTR_EO = 1; IF 2 <= FTR <= 3 THEN FTR_EO = 2; IF FTR > 3 THEN FTR_EO = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EOCsum_to_FTR_EO],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_FTR_to_FTR_EO,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _XUNHQPOhEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF 1 <= DET <= 5 THEN DET_EO = 1; IF 6 <= DET <= 19 THEN DET_EO = 2; IF DET > 19 THEN DET_EO = 3
 * @definition Data Element Type rescaled for External Output.
 */
export const AFP_MEASURE_DET_EO: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DET_EO,
  name: 'DET_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Data Element Type rescaled for External Output',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EO,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DET_to_DET_EO],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF 1 <= DET <= 5 THEN DET_EO = 1; IF 6 <= DET <= 19 THEN DET_EO = 2; IF DET > 19 THEN DET_EO = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EOCsum_to_DET_EO],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DET_to_DET_EO,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _5AFzEPOhEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF EOCsum <= 3 THEN EOC = 1; IF EOCsum = 4 THEN EOC = 2; IF EOCsum > 4 THEN EOC = 3
 * @definition External Output Complexity — projection of EOCsum onto the
 *   IFPUG complexity tiers {1, 2, 3} = {Low, Average, High}.
 */
export const AFP_MEASURE_EOC: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EOC,
  name: 'EOC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Output Complexity',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EO,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EOCsum_to_EOC],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF EOCsum <= 3 THEN EOC = 1; IF EOCsum = 4 THEN EOC = 2; IF EOCsum > 4 THEN EOC = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EOC_to_wEO],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_EOCsum_to_EOC,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _ClRvMPOjEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF EOC=1 THEN wEO=4; IF EOC=2 THEN wEO=5; IF EOC=3 THEN wEO=7
 * @definition External Output Weight — IFPUG weight assigned to a single
 *   External Output based on its EOC complexity tier.
 */
export const AFP_MEASURE_wEO: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.wEO,
  name: 'wEO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Output Weight',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EO,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EOC_to_wEO],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF EOC=1 THEN wEO=4; IF EOC=2 THEN wEO=5; IF EOC=3 THEN wEO=7',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EOs_to_wEO],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_EOC_to_wEO,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _qpCzAvO3EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF FTR < 2 THEN FTR_EI = 1; IF FTR = 2 THEN FTR_EI = 2; IF FTR > 2 THEN FTR_EI = 3
 * @definition File Types Referenced rescaled for External Input.
 */
export const AFP_MEASURE_FTR_EI: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.FTR_EI,
  name: 'FTR_EI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'File Types Referenced rescaled for External Input',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EI,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_FTR_to_FTR_EI],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF FTR < 2 THEN FTR_EI = 1; IF FTR = 2 THEN FTR_EI = 2; IF FTR > 2 THEN FTR_EI = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EICSum_to_FTR_EI],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_FTR_to_FTR_EI,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _Zdha0PO6EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF 1 <= DET <= 4 THEN DET_EI = 1; IF 5 <= DET <= 15 THEN DET_EI = 2; IF DET > 15 THEN DET_EI = 3
 * @definition Data Element Types rescaled for External Input.
 */
export const AFP_MEASURE_DET_EI: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DET_EI,
  name: 'DET_EI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Data Element Types rescaled for External Input',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EI,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DET_to_DET_EI],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF 1 <= DET <= 4  THEN DET_EI = 1; IF 5 <= DET <= 15 THEN DET_EI = 2; IF DET > 15 THEN DET_EI = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EICSum_to_DET_EI],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DET_to_DET_EI,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _AgJh0fO7EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF EICsum <= 3 THEN EIC = 1; IF EICsum = 4 THEN EIC = 2; IF EICsum > 4 THEN EIC = 3
 * @definition External Input Complexity — projection of EICsum onto the
 *   IFPUG complexity tiers {1, 2, 3} = {Low, Average, High}.
 */
export const AFP_MEASURE_EIC: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EIC,
  name: 'EIC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Input Complexity',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EI,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EICsum_to_EIC],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF EICsum <= 3 THEN EIC = 1; IF EICsum = 4 THEN EIC = 2; IF EICsum > 4 THEN EIC = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EIC_to_wEI],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_EICsum_to_EIC,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _oym5APO7EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasure
 * @formula IF EIC=1 THEN wEI=3; IF EIC=2 THEN wEI=4; IF EIC=3 THEN wEI=6
 * @definition External Input Weight — IFPUG weight assigned to a single
 *   External Input based on its EIC complexity tier.
 */
export const AFP_MEASURE_wEI: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.wEI,
  name: 'wEI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Input Weight',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EI,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EIC_to_wEI],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF EIC=1 THEN wEI=3; IF EIC=2 THEN wEI=4; IF EIC=3 THEN wEI=6',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EIs_to_wEI],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_EIC_to_wEI,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _R-In8Pa2EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasure
 * @formula IF RET = 1 THEN RET_LF = 1; IF 2 <= RET <= 5 THEN RET_LF = 2; IF RET > 5 THEN RET_LF = 3
 * @definition Record Element Types rescaled for Logical Files.
 */
export const AFP_MEASURE_RET_LF: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.RET_LF,
  name: 'RET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Record Element Types rescaled for Logical Files',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_RET_to_RET_LF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF RET = 1 THEN RET_LF = 1; IF 2 <= RET <= 5 THEN RET_LF = 2; IF RET > 5 THEN RET_LF = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_DFCsum_to_RET_LF],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_RET_to_RET_LF,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _xVQNEPa8EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasure
 * @formula IF 1 <= DET <=19 THEN DET_LF = 1; IF 20 <= DET <= 50 THEN DET_LF = 2 ; IF DET > 50 THEN DET_LF = 3
 * @definition Data Element Types rescaled for Logical Files.
 */
export const AFP_MEASURE_DET_LF: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DET_LF,
  name: 'DET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Data Element Types rescaled for Logical Files',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DET_to_DET_LF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF 1 <= DET <=19 THEN DET_LF = 1; IF 20 <= DET <= 50 THEN DET_LF = 2 ; IF DET > 50 THEN DET_LF = 3',
  baseMeasureFromIds: [AFP_XMI_ID.REL_DFCsum_to_DET_LF],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DET_to_DET_LF,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _jYXmAPa9EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasure
 * @formula IF DFCsum <= 3 THEN DFC= 1; IF DFCsum = 4 THEN DFC = 2; IF DFCsum > 4 THEN DFC = 3
 * @definition Data Function Complexity — projection of DFCsum onto the
 *   IFPUG complexity tiers {1, 2, 3} = {Low, Average, High}.
 */
export const AFP_MEASURE_DFC: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DFC,
  name: 'DFC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Data Function Complexity',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DFCsum_to_DFC],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF DFCsum <= 3 THEN DFC= 1; IF DFCsum = 4 THEN DFC = 2; IF DFCsum > 4 THEN DFC = 3',
  baseMeasureFromIds: [
    AFP_XMI_ID.REL_DFC_to_wILF,
    AFP_XMI_ID.REL_DFC_to_wEIF,
  ],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DFCsum_to_DFC,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _uFgBoPa-EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasure
 * @formula IF DFC=1 THEN wILF=7; IF DFC=2 THEN wILF=10; IF DFC=3 THEN wILF=15
 * @definition Internal Logical File Weight — IFPUG weight assigned to a
 *   single Internal Logical File based on its DFC complexity tier.
 */
export const AFP_MEASURE_wILF: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.wILF,
  name: 'wILF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Internal Logical File Weight',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DFC_to_wILF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: 'IF DFC=1 THEN wILF=7; IF DFC=2 THEN wILF=10; IF DFC=3 THEN wILF=15',
  baseMeasureFromIds: [AFP_XMI_ID.REL_ILFs_to_wILF],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DFC_to_wILF,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _XVXcQPa_EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasure
 * @formula IF DFC=1 THEN wEIF=5; IF DFC=2 THEN wEIF=7; IF DFC=3 THEN wEIF=10
 * @definition External Interface File Weight — IFPUG weight assigned to a
 *   single External Interface File based on its DFC complexity tier. The
 *   XMI declares an empty `unit` for this measure (preserved verbatim).
 */
export const AFP_MEASURE_wEIF: IRescaledMeasure = Object.freeze({
  elementId: AFP_XMI_ID.wEIF,
  name: 'wEIF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Interface File Weight',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_DFC_to_wEIF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: '',
  formula: 'IF DFC=1 THEN wEIF=5; IF DFC=2 THEN wEIF=7; IF DFC=3 THEN wEIF=10',
  baseMeasureFromIds: [AFP_XMI_ID.REL_EIFs_to_wEIF],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  offset: 0,
  multiplier: 1,
  customScaleId: undefined,
  rescaleFromId: AFP_XMI_ID.REL_DFC_to_wEIF,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 7. AFP BINARY MEASURES (3 instances) — EOCsum, EICSum, DFCsum
//
// Pair-wise sums combining the rescaled FTR_X and DET_X (or RET_LF +
// DET_LF) of the same scope into a complexity score that downstream
// RescaledMeasures (EOC, EIC, DFC) project onto the IFPUG complexity tier
// space {1, 2, 3}. SMM 1.2 names the addition functor `add` in the XMI;
// the typed enum literal is `plus`.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _Tvj_APOlEeGtUOd1RMSY8w
 * @kind smm:BinaryMeasure
 * @functor plus (XMI literal `add`)
 * @definition External Output Complexity sum — EOCsum = FTR_EO + DET_EO.
 *   Feeds the EOC RescaledMeasure that projects this score onto the IFPUG
 *   complexity tier space.
 */
export const AFP_MEASURE_EOCsum: IBinaryMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EOCsum,
  name: 'EOCsum',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Output Complexity sum',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EO,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [
    AFP_XMI_ID.REL_EOCsum_to_FTR_EO,
    AFP_XMI_ID.REL_EOCsum_to_DET_EO,
  ],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_EOCsum_to_EOC],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  functor: 'plus',
  customFunctorId: undefined,
  baseMeasure1ToId: AFP_XMI_ID.REL_EOCsum_to_FTR_EO,
  baseMeasure2ToId: AFP_XMI_ID.REL_EOCsum_to_DET_EO,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _QHdN4PO7EeGtUOd1RMSY8w
 * @kind smm:BinaryMeasure
 * @functor plus (XMI literal `add`)
 * @definition External Input Complexity sum — EICSum = FTR_EI + DET_EI.
 *   Feeds the EIC RescaledMeasure.
 */
export const AFP_MEASURE_EICSum: IBinaryMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EICSum,
  name: 'EICSum',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Input Complexity sum',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.EI,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [
    AFP_XMI_ID.REL_EICSum_to_FTR_EI,
    AFP_XMI_ID.REL_EICSum_to_DET_EI,
  ],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_EICsum_to_EIC],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  functor: 'plus',
  customFunctorId: undefined,
  baseMeasure1ToId: AFP_XMI_ID.REL_EICSum_to_FTR_EI,
  baseMeasure2ToId: AFP_XMI_ID.REL_EICSum_to_DET_EI,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _GBTlYPa9EeGHXuMIrzLXMA
 * @kind smm:BinaryMeasure
 * @functor plus (XMI literal `add`)
 * @definition Data Function Complexity Sum — DFCsum = RET_LF + DET_LF.
 *   Feeds the DFC RescaledMeasure.
 */
export const AFP_MEASURE_DFCsum: IBinaryMeasure = Object.freeze({
  elementId: AFP_XMI_ID.DFCsum,
  name: 'DFCsum',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Data Function Complexity Sum',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [
    AFP_XMI_ID.REL_DFCsum_to_RET_LF,
    AFP_XMI_ID.REL_DFCsum_to_DET_LF,
  ],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_DFCsum_to_DFC],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  functor: 'plus',
  customFunctorId: undefined,
  baseMeasure1ToId: AFP_XMI_ID.REL_DFCsum_to_RET_LF,
  baseMeasure2ToId: AFP_XMI_ID.REL_DFCsum_to_DET_LF,
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 8. AFP COLLECTIVE MEASURES (5 instances) — EOs, EIs, ILFs, EIFs, AFPs
//
// Per-Segment aggregations that sum the per-element weights into the
// segment-level totals and ultimately the AFPs total Function Point count.
// SMM `accumulator = sum`.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _XZnVQPOtEeGtUOd1RMSY8w
 * @kind smm:CollectiveMeasure
 * @accumulator sum
 * @measurandQuery getEOs
 * @definition External Output Size — sum of wEO across every External
 *   Output recognised by getEOs in the Segment.
 */
export const AFP_MEASURE_EOs: ICollectiveMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EOs,
  name: 'EOs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Output Size',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Segment,
  traitId: AFP_XMI_ID.ExternalOutputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EOs_to_wEO],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_AFPs_to_EOs],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  accumulator: 'sum',
  customAccumulatorId: undefined,
  baseMeasureToIds: [AFP_XMI_ID.REL_EOs_to_wEO],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _5dUi0PO7EeGtUOd1RMSY8w
 * @kind smm:CollectiveMeasure
 * @accumulator sum
 * @measurandQuery getEIs
 * @definition External Input Size — sum of wEI across every External Input
 *   recognised by getEIs in the Segment.
 */
export const AFP_MEASURE_EIs: ICollectiveMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EIs,
  name: 'EIs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Input Size',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Segment,
  traitId: AFP_XMI_ID.ExternalInputSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EIs_to_wEI],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_AFPs_to_EIs],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  accumulator: 'sum',
  customAccumulatorId: undefined,
  baseMeasureToIds: [AFP_XMI_ID.REL_EIs_to_wEI],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _DwRE8Pa_EeGHXuMIrzLXMA
 * @kind smm:CollectiveMeasure
 * @accumulator sum
 * @measurandQuery getILFs
 * @definition Internal Logical File Size — sum of wILF across every
 *   Internal Logical File recognised by getILFs in the Segment.
 */
export const AFP_MEASURE_ILFs: ICollectiveMeasure = Object.freeze({
  elementId: AFP_XMI_ID.ILFs,
  name: 'ILFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Internal Logical File Size',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Segment,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_ILFs_to_wILF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_AFPs_to_ILFs],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  accumulator: 'sum',
  customAccumulatorId: undefined,
  baseMeasureToIds: [AFP_XMI_ID.REL_ILFs_to_wILF],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _rX0d8Pa_EeGHXuMIrzLXMA
 * @kind smm:CollectiveMeasure
 * @accumulator sum
 * @definition External Inteface File Size — sum of wEIF across every
 *   External Interface File recognised by getEIFs in the Segment.
 *   (XMI shortDescription preserves the formal/14-01-03 typo "Inteface".)
 */
export const AFP_MEASURE_EIFs: ICollectiveMeasure = Object.freeze({
  elementId: AFP_XMI_ID.EIFs,
  name: 'EIFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'External Inteface File Size',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.LF,
  traitId: AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
  measureRelationshipIds: [AFP_XMI_ID.REL_EIFs_to_wEIF],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [AFP_XMI_ID.REL_AFPs_to_EIFs],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  accumulator: 'sum',
  customAccumulatorId: undefined,
  baseMeasureToIds: [AFP_XMI_ID.REL_EIFs_to_wEIF],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 (Measure inventory) — AutomatedFunctionPoint.xmi
 * @xmiId _HlA3APbBEeGHXuMIrzLXMA
 * @kind smm:CollectiveMeasure
 * @accumulator sum
 * @definition Automated Function Point Size — the terminal AFP measure:
 *   AFPs = ILFs + EIFs + EIs + EOs. The single number that an automated
 *   AFP counter emits per Segment, in conformance with IFPUG sizing rules.
 */
export const AFP_MEASURE_AFPs: ICollectiveMeasure = Object.freeze({
  elementId: AFP_XMI_ID.AFPs,
  name: 'AFPs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: 'Automated Function Point Size',
  visible: true,
  measureLabelFormat: undefined,
  measurementLabelFormat: undefined,
  scale: undefined,
  defaultQuery: undefined,
  scopeId: AFP_XMI_ID.Segment,
  traitId: AFP_XMI_ID.AutomatedFunctionPointSize,
  measureRelationshipIds: [
    AFP_XMI_ID.REL_AFPs_to_ILFs,
    AFP_XMI_ID.REL_AFPs_to_EIFs,
    AFP_XMI_ID.REL_AFPs_to_EIs,
    AFP_XMI_ID.REL_AFPs_to_EOs,
  ],
  refinementToIds: [],
  refinementFromIds: [],
  equivalentToIds: [],
  equivalentFromIds: [],
  unit: 'Cardinal',
  formula: undefined,
  baseMeasureFromIds: [],
  rankingFromIds: [],
  gradeFromIds: [],
  libraryId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  categoryIds: [AFP_XMI_ID.FunctionalMeasures],
  annotationIds: [],
  attributeIds: [],
  accumulator: 'sum',
  customAccumulatorId: undefined,
  baseMeasureToIds: [
    AFP_XMI_ID.REL_AFPs_to_ILFs,
    AFP_XMI_ID.REL_AFPs_to_EIFs,
    AFP_XMI_ID.REL_AFPs_to_EIs,
    AFP_XMI_ID.REL_AFPs_to_EOs,
  ],
  evaluate(_context: unknown): unknown {
    return undefined;
  },
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 9. AFP MEASURE RELATIONSHIPS (27 edges)
//
// Every <measureRelationships> nested inside any AFP measure. Counts:
//   - 13 RescaledMeasureRelationship (one per RescaledMeasure)
//   - 3  Base1MeasureRelationship   (BinaryMeasure first operand)
//   - 3  Base2MeasureRelationship   (BinaryMeasure second operand)
//   - 8  BaseNMeasureRelationship   (CollectiveMeasure base)
//
// influence is `none` for every AFP relationship (the XMI declares no
// `influence` attribute on any edge).
// ═══════════════════════════════════════════════════════════════════════════

// ─── 9.1 RescaledMeasureRelationships (13) ───

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _I4froPOhEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_FTR_to_FTR_EO: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_FTR_to_FTR_EO,
  name: 'FTR to FTR_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.FTR,
  toId: AFP_XMI_ID.FTR_EO,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _bYBiAPOhEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DET_to_DET_EO: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DET_to_DET_EO,
  name: 'DET_to_DET_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DET,
  toId: AFP_XMI_ID.DET_EO,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _6JICQPOiEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_EOCsum_to_EOC: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EOCsum_to_EOC,
  name: 'EOCsum_to_EOC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EOCsum,
  toId: AFP_XMI_ID.EOC,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _HrpzIPOjEeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_EOC_to_wEO: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EOC_to_wEO,
  name: 'EOC_to_wEO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EOC,
  toId: AFP_XMI_ID.wEO,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _BFys4PO4EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_FTR_to_FTR_EI: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_FTR_to_FTR_EI,
  name: 'FTR to FTR_EI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.FTR,
  toId: AFP_XMI_ID.FTR_EI,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _8U-h4PO6EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DET_to_DET_EI: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DET_to_DET_EI,
  name: 'DET_to_DET_EI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DET,
  toId: AFP_XMI_ID.DET_EI,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _xHzpYPO7EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_EICsum_to_EIC: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EICsum_to_EIC,
  name: 'EICsum_to_EIC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EICSum,
  toId: AFP_XMI_ID.EIC,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _1FUn0PO7EeGtUOd1RMSY8w
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_EIC_to_wEI: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EIC_to_wEI,
  name: 'EIC_to_wEI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EIC,
  toId: AFP_XMI_ID.wEI,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _r7GRgPa8EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_RET_to_RET_LF: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_RET_to_RET_LF,
  name: 'RE_to_RET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.RET,
  toId: AFP_XMI_ID.RET_LF,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId __N5X4Pa8EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DET_to_DET_LF: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DET_to_DET_LF,
  name: 'DET_to_DET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DET,
  toId: AFP_XMI_ID.DET_LF,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _nu5r8Pa-EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DFCsum_to_DFC: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DFCsum_to_DFC,
  name: 'DFCsum_to_DFC',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DFCsum,
  toId: AFP_XMI_ID.DFC,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _9j9TsPa-EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DFC_to_wILF: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DFC_to_wILF,
  name: 'DFC_to_wILF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DFC,
  toId: AFP_XMI_ID.wILF,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _lnT34Pa_EeGHXuMIrzLXMA
 * @kind smm:RescaledMeasureRelationship
 */
export const AFP_REL_DFC_to_wEIF: IRescaledMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DFC_to_wEIF,
  name: 'DFC_to_wEIF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DFC,
  toId: AFP_XMI_ID.wEIF,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ─── 9.2 Base1MeasureRelationships (3) ───

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _gNYxoPOlEeGtUOd1RMSY8w
 * @kind smm:Base1MeasureRelationship
 */
export const AFP_REL_EOCsum_to_FTR_EO: IBase1MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EOCsum_to_FTR_EO,
  name: 'EOCsum_to_FTR_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EOCsum,
  toId: AFP_XMI_ID.FTR_EO,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _daXOYPO7EeGtUOd1RMSY8w
 * @kind smm:Base1MeasureRelationship
 */
export const AFP_REL_EICSum_to_FTR_EI: IBase1MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EICSum_to_FTR_EI,
  name: undefined,
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EICSum,
  toId: AFP_XMI_ID.FTR_EI,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _RonmwPa9EeGHXuMIrzLXMA
 * @kind smm:Base1MeasureRelationship
 */
export const AFP_REL_DFCsum_to_RET_LF: IBase1MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DFCsum_to_RET_LF,
  name: 'DFCsum_to_RET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DFCsum,
  toId: AFP_XMI_ID.RET_LF,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ─── 9.3 Base2MeasureRelationships (3) ───

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _on_mcPOlEeGtUOd1RMSY8w
 * @kind smm:Base2MeasureRelationship
 */
export const AFP_REL_EOCsum_to_DET_EO: IBase2MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EOCsum_to_DET_EO,
  name: 'EOCsum_to_DET_EO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EOCsum,
  toId: AFP_XMI_ID.DET_EO,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _jV_fUPO7EeGtUOd1RMSY8w
 * @kind smm:Base2MeasureRelationship
 */
export const AFP_REL_EICSum_to_DET_EI: IBase2MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EICSum_to_DET_EI,
  name: undefined,
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EICSum,
  toId: AFP_XMI_ID.DET_EI,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _ZFzKAPa9EeGHXuMIrzLXMA
 * @kind smm:Base2MeasureRelationship
 */
export const AFP_REL_DFCsum_to_DET_LF: IBase2MeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_DFCsum_to_DET_LF,
  name: 'DFCsum_to_DET_LF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.DFCsum,
  toId: AFP_XMI_ID.DET_LF,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ─── 9.4 BaseNMeasureRelationships (8) — CollectiveMeasure base edges ───
//
// The XMI declares these as `xmi:type="smm:BaseMeasureRelationship"`, but
// `BaseMeasureRelationship` is abstract in SMM 1.2. The concrete metaclass
// for a CollectiveMeasure base relationship is `BaseNMeasureRelationship`
// (§11.3) — "N-ary base", whose semantics belong to the owning
// CollectiveMeasure's `accumulator`. We type them as IBaseNMeasureRelationship.

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _dRcEQPOtEeGtUOd1RMSY8w
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_EOs_to_wEO: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EOs_to_wEO,
  name: 'EOs_to_wEO',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EOs,
  toId: AFP_XMI_ID.wEO,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _JeSsEPO8EeGtUOd1RMSY8w
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_EIs_to_wEI: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EIs_to_wEI,
  name: 'EIs_to_wEI',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EIs,
  toId: AFP_XMI_ID.wEI,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _MaMvMPa_EeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_ILFs_to_wILF: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_ILFs_to_wILF,
  name: 'ILFs_to_wILF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.ILFs,
  toId: AFP_XMI_ID.wILF,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _z4oBYPa_EeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_EIFs_to_wEIF: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_EIFs_to_wEIF,
  name: 'EIFs_to_wEIF',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.EIFs,
  toId: AFP_XMI_ID.wEIF,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _VSghwPbBEeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_AFPs_to_ILFs: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_AFPs_to_ILFs,
  name: 'AFPs_to_ILFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.AFPs,
  toId: AFP_XMI_ID.ILFs,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _ahK_APbBEeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_AFPs_to_EIFs: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_AFPs_to_EIFs,
  name: 'AFPs_to_EIFs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.AFPs,
  toId: AFP_XMI_ID.EIFs,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _ePrREPbBEeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_AFPs_to_EIs: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_AFPs_to_EIs,
  name: 'AFPs_to_EIs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.AFPs,
  toId: AFP_XMI_ID.EIs,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §7 — AutomatedFunctionPoint.xmi
 * @xmiId _i2m_8PbBEeGHXuMIrzLXMA
 * @kind smm:BaseNMeasureRelationship
 */
export const AFP_REL_AFPs_to_EOs: IBaseNMeasureRelationship = Object.freeze({
  elementId: AFP_XMI_ID.REL_AFPs_to_EOs,
  name: 'AFPs_to_EOs',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: undefined,
  shortDescription: undefined,
  influence: 'none',
  fromId: AFP_XMI_ID.AFPs,
  toId: AFP_XMI_ID.EOs,
  rescaleToId: undefined,
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 10. AFP MEASURE LIBRARY
//
// The single AFP MeasureLibrary owning every measure, scope, characteristic,
// operation and category declared above.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section §6 (MeasureLibrary) — AutomatedFunctionPoint.xmi
 * @xmiId _XW4E8POaEeGAl6dCCRBZ4Q
 * @kind smm:MeasureLibrary
 * @definition The reusable, independently catalogable AFP MeasureLibrary —
 *   single owner of every AFP MeasureElement (Measures, Scopes,
 *   Characteristics, Operations, the FunctionalMeasures category).
 */
export const AFP_LIBRARY_AutomatedFunctionPoint: IMeasureLibrary = Object.freeze({
  elementId: AFP_XMI_ID.AutomatedFunctionPointLibrary,
  name: 'AutomatedFunctionPointLibrary',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: AFP_XMI_ID.AutomatedFunctionPoint,
  description: undefined,
  shortDescription: 'Automated Function Point Measurement Library',
  measureElementIds: [
    // MeasureCategory
    AFP_XMI_ID.FunctionalMeasures,
    // Characteristics
    AFP_XMI_ID.General,
    AFP_XMI_ID.ExternalOutputSize,
    AFP_XMI_ID.ExternalInputSize,
    AFP_XMI_ID.InternalLogicalFileSizeAndExternaInterfaceFileSize,
    AFP_XMI_ID.AutomatedFunctionPointSize,
    // Scopes
    AFP_XMI_ID.Element,
    AFP_XMI_ID.EO,
    AFP_XMI_ID.EI,
    AFP_XMI_ID.LF,
    AFP_XMI_ID.Segment,
    // Operations (KDM recognizers)
    AFP_XMI_ID.isEO,
    AFP_XMI_ID.getEOs,
    AFP_XMI_ID.isEI,
    AFP_XMI_ID.getEIs,
    AFP_XMI_ID.isILF,
    AFP_XMI_ID.getILFs,
    AFP_XMI_ID.isEIF,
    AFP_XMI_ID.getEIFs,
    AFP_XMI_ID.isLF,
    // DimensionalMeasures
    AFP_XMI_ID.FTR,
    AFP_XMI_ID.DET,
    AFP_XMI_ID.RET,
    // RescaledMeasures
    AFP_XMI_ID.FTR_EO,
    AFP_XMI_ID.DET_EO,
    AFP_XMI_ID.EOC,
    AFP_XMI_ID.wEO,
    AFP_XMI_ID.FTR_EI,
    AFP_XMI_ID.DET_EI,
    AFP_XMI_ID.EIC,
    AFP_XMI_ID.wEI,
    AFP_XMI_ID.RET_LF,
    AFP_XMI_ID.DET_LF,
    AFP_XMI_ID.DFC,
    AFP_XMI_ID.wILF,
    AFP_XMI_ID.wEIF,
    // BinaryMeasures
    AFP_XMI_ID.EOCsum,
    AFP_XMI_ID.EICSum,
    AFP_XMI_ID.DFCsum,
    // CollectiveMeasures
    AFP_XMI_ID.EOs,
    AFP_XMI_ID.EIs,
    AFP_XMI_ID.ILFs,
    AFP_XMI_ID.EIFs,
    AFP_XMI_ID.AFPs,
  ],
  categoryRelationshipIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 11. AFP SMM MODEL ROOT
//
// The OMG-published `smm:SmmModel` XMI root that owns the AFP library.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section AutomatedFunctionPoint.xmi (SmmModel root)
 * @xmiId __4K-0fOZEeGAl6dCCRBZ4Q
 * @kind smm:SmmModel
 * @definition The top-level container of the AFP measurement artefacts —
 *   the XMI root of formal/14-01-03's `AutomatedFunctionPoint.xmi`.
 */
export const AFP_MODEL_AutomatedFunctionPoint: ISmmModel = Object.freeze({
  elementId: AFP_XMI_ID.AutomatedFunctionPoint,
  name: 'AutomatedFunctionPoint',
  qualifiedName: undefined,
  visibility: undefined,
  clientDependencyIds: [],
  nameExpressionId: undefined,
  namespaceId: undefined,
  ownedCommentIds: [],
  ownedElementIds: [],
  ownerId: undefined,
  description: 'SMM representation of the Automated Function Point specification.',
  shortDescription: 'Automated Function Point SMM Model',
  libraryIds: [AFP_XMI_ID.AutomatedFunctionPointLibrary],
  observationIds: [],
  annotationIds: [],
  attributeIds: [],
  allOwnedElements: () => [],
  mustBeOwned: () => false,
  allNamespaces: () => [],
  allOwningPackages: () => [],
  separator: () => '::',
  isDistinguishableFrom: () => true,
});

// ═══════════════════════════════════════════════════════════════════════════
// § 12. FROZEN LOWERCASE NAMESPACE — `afp`
//
// The single ergonomic surface call-sites use to traverse the AFP library:
//   afp.measure.afps          // CollectiveMeasure
//   afp.measure.ftr           // DimensionalMeasure
//   afp.scope.eo              // Scope
//   afp.characteristic.general
//   afp.operation.isEO
//   afp.library               // MeasureLibrary
//   afp.model                 // SmmModel root
//   afp.xmiId.AFPs            // raw OMG xmi:id token
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @standard OMG AFP 1.0 -- formal/14-01-03 (December 2013)
 * @section AutomatedFunctionPoint.xmi
 * @kind frozen lowercase namespace
 * @definition The ergonomic surface for the AFP MeasureLibrary, mirroring the
 *   uml/smm sibling packages' lowercase namespace pattern.
 */
export const afp = Object.freeze({
  scope: Object.freeze({
    element: AFP_SCOPE_Element,
    eo: AFP_SCOPE_EO,
    ei: AFP_SCOPE_EI,
    lf: AFP_SCOPE_LF,
    segment: AFP_SCOPE_Segment,
  }),
  operation: Object.freeze({
    isEO: AFP_OPERATION_isEO,
    getEOs: AFP_OPERATION_getEOs,
    isEI: AFP_OPERATION_isEI,
    getEIs: AFP_OPERATION_getEIs,
    isILF: AFP_OPERATION_isILF,
    getILFs: AFP_OPERATION_getILFs,
    isEIF: AFP_OPERATION_isEIF,
    getEIFs: AFP_OPERATION_getEIFs,
    isLF: AFP_OPERATION_isLF,
  }),
  characteristic: Object.freeze({
    general: AFP_CHARACTERISTIC_General,
    externalOutputSize: AFP_CHARACTERISTIC_ExternalOutputSize,
    externalInputSize: AFP_CHARACTERISTIC_ExternalInputSize,
    internalLogicalFileSizeAndExternaInterfaceFileSize:
      AFP_CHARACTERISTIC_InternalLogicalFileSizeAndExternaInterfaceFileSize,
    automatedFunctionPointSize: AFP_CHARACTERISTIC_AutomatedFunctionPointSize,
  }),
  category: Object.freeze({
    functionalMeasures: AFP_CATEGORY_FunctionalMeasures,
  }),
  measure: Object.freeze({
    ftr: AFP_MEASURE_FTR,
    det: AFP_MEASURE_DET,
    ret: AFP_MEASURE_RET,
    ftr_eo: AFP_MEASURE_FTR_EO,
    det_eo: AFP_MEASURE_DET_EO,
    eoc: AFP_MEASURE_EOC,
    wEO: AFP_MEASURE_wEO,
    eocSum: AFP_MEASURE_EOCsum,
    eos: AFP_MEASURE_EOs,
    ftr_ei: AFP_MEASURE_FTR_EI,
    det_ei: AFP_MEASURE_DET_EI,
    eic: AFP_MEASURE_EIC,
    eicSum: AFP_MEASURE_EICSum,
    wEI: AFP_MEASURE_wEI,
    eis: AFP_MEASURE_EIs,
    ret_lf: AFP_MEASURE_RET_LF,
    det_lf: AFP_MEASURE_DET_LF,
    dfcSum: AFP_MEASURE_DFCsum,
    dfc: AFP_MEASURE_DFC,
    wILF: AFP_MEASURE_wILF,
    ilfs: AFP_MEASURE_ILFs,
    wEIF: AFP_MEASURE_wEIF,
    eifs: AFP_MEASURE_EIFs,
    afps: AFP_MEASURE_AFPs,
  }),
  relationship: Object.freeze({
    // RescaledMeasureRelationships
    ftr_to_ftr_eo: AFP_REL_FTR_to_FTR_EO,
    det_to_det_eo: AFP_REL_DET_to_DET_EO,
    eocSum_to_eoc: AFP_REL_EOCsum_to_EOC,
    eoc_to_wEO: AFP_REL_EOC_to_wEO,
    ftr_to_ftr_ei: AFP_REL_FTR_to_FTR_EI,
    det_to_det_ei: AFP_REL_DET_to_DET_EI,
    eicSum_to_eic: AFP_REL_EICsum_to_EIC,
    eic_to_wEI: AFP_REL_EIC_to_wEI,
    ret_to_ret_lf: AFP_REL_RET_to_RET_LF,
    det_to_det_lf: AFP_REL_DET_to_DET_LF,
    dfcSum_to_dfc: AFP_REL_DFCsum_to_DFC,
    dfc_to_wILF: AFP_REL_DFC_to_wILF,
    dfc_to_wEIF: AFP_REL_DFC_to_wEIF,
    // Base1MeasureRelationships
    eocSum_to_ftr_eo: AFP_REL_EOCsum_to_FTR_EO,
    eicSum_to_ftr_ei: AFP_REL_EICSum_to_FTR_EI,
    dfcSum_to_ret_lf: AFP_REL_DFCsum_to_RET_LF,
    // Base2MeasureRelationships
    eocSum_to_det_eo: AFP_REL_EOCsum_to_DET_EO,
    eicSum_to_det_ei: AFP_REL_EICSum_to_DET_EI,
    dfcSum_to_det_lf: AFP_REL_DFCsum_to_DET_LF,
    // BaseNMeasureRelationships
    eos_to_wEO: AFP_REL_EOs_to_wEO,
    eis_to_wEI: AFP_REL_EIs_to_wEI,
    ilfs_to_wILF: AFP_REL_ILFs_to_wILF,
    eifs_to_wEIF: AFP_REL_EIFs_to_wEIF,
    afps_to_ilfs: AFP_REL_AFPs_to_ILFs,
    afps_to_eifs: AFP_REL_AFPs_to_EIFs,
    afps_to_eis: AFP_REL_AFPs_to_EIs,
    afps_to_eos: AFP_REL_AFPs_to_EOs,
  }),
  library: AFP_LIBRARY_AutomatedFunctionPoint,
  model: AFP_MODEL_AutomatedFunctionPoint,
  xmiId: AFP_XMI_ID,
} as const);
