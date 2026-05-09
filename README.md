# @amlhubs/afp — Automated Function Points 1.0 as a Typed SMM Library

## Identity

| Field | Value |
|---|---|
| Standard | OMG Automated Function Points (AFP) 1.0 |
| OMG Formal Document | [formal/14-01-03](https://www.omg.org/spec/AFP/1.0/) |
| OMG Specification | [omg.org/spec/AFP/1.0](https://www.omg.org/spec/AFP/) |
| Machine-Readable | [AutomatedFunctionPoint.xmi](https://www.omg.org/spec/AFP/20120901/AutomatedFunctionPoint.xmi) (admtf/12-09-02) |
| ISO Adoption | [ISO/IEC 19515:2019](https://www.iso.org/standard/72076.html) |
| Authority | [Object Management Group](https://www.omg.org/) (Architecture-Driven Modernization), [CISQ](https://www.it-cisq.org/), [IFPUG](https://www.ifpug.org/) compatibility |
| npm Package | `@amlhubs/afp` |
| npm Version | `0.0.1` |
| Peer Dependencies | `@amlhubs/smm@^0.0.2`, `@amlhubs/uml@^0.0.2` |
| License | UNLICENSED |

## Abstract

Automated Function Points (AFP) is the OMG specification that automates the [IFPUG Function Point Counting Practices Manual](https://www.ifpug.org/ifpug-standards/) rules over a [Knowledge Discovery Metamodel (KDM)](https://www.omg.org/spec/KDM/) representation of a software application. AFP 1.0 was adopted by the OMG in December 2013 (`formal/14-01-03`) and adopted as an international standard by ISO/IEC JTC 1 as [ISO/IEC 19515:2019](https://www.iso.org/standard/72076.html). The specification replaces the subjective judgments traditionally required of a certified IFPUG counter with deterministic counting rules that an automated tool can execute against a KDM model of the application under test.

The AFP specification is published as a [Structured Metrics Metamodel (SMM) 1.2](https://www.omg.org/spec/SMM/1.2/) measurement library — a single `SmmModel` carrying one `MeasureLibrary` ("AutomatedFunctionPointLibrary") that owns every AFP measure, scope, characteristic, and KDM-recognizer operation. AFP introduces no new metaclasses; every artefact is an instance of an SMM 1.2 metaclass already typed by [`@amlhubs/smm`](../smm/README.md). The `@amlhubs/afp` package therefore surfaces the AFP library as a set of typed, ID-stamped TypeScript instance constants and one frozen `library` aggregator that preserves every AFP §x.y citation in JSDoc, making each constant an auditable projection of the specification rather than an internal invention.

## Business Value — Why Extending This Metamodel Pays Off

Function-point sizing has been the dominant pre-implementation software-effort estimation technique for forty years. Every major software-cost estimation model — [COCOMO II](http://csse.usc.edu/csse/research/COCOMOII/cocomo_main.html), the [International Software Benchmarking Standards Group (ISBSG)](https://www.isbsg.org/) repository, [SEER-SEM](https://galorath.com/products/seer-sem/), [SLIM](https://www.qsm.com/), [TruePlanning](https://www.priceeconomics.com/) — accepts unadjusted function points (UFP) as a primary input. AFP makes that input deterministic: a counted application yields the same UFP value irrespective of counter, whereas a manual IFPUG count exhibits up to 30% inter-counter variance per [ISBSG calibration studies](https://www.isbsg.org/research/). A regulated procurement program — a federal IT contract subject to [FAR 52.232-7](https://www.acquisition.gov/far/52.232-7), a healthcare modernization subject to [HHS Acquisition Manual](https://www.hhs.gov/grants/contracts/contract-policies-regulations/index.html) cost-realism review, a defense program subject to [DoD 5000](https://www.acq.osd.mil/asda/dpc/cp/policy/policy-vault.html) earned-value baselines — that adopts AFP as its sizing convention immunizes the cost baseline from counter-variance disputes that otherwise stall payment milestones.

ISO adoption turns AFP into a regulator-recognized artefact. ISO/IEC 19515:2019 sits in the [ISO/IEC JTC 1/SC 7 software-engineering portfolio](https://www.iso.org/committee/45086.html) alongside [ISO/IEC/IEEE 12207](https://www.iso.org/standard/63712.html) (software lifecycle), [ISO/IEC 25010](https://www.iso.org/standard/35733.html) (software quality), and [ISO/IEC/IEEE 29119](https://www.iso.org/standard/81291.html) (software testing). A vendor that delivers an AFP-compliant counting pipeline can cite the ISO standard in audit responses without translating internal jargon into standards language. For ageni's customers, this means [`@amlhubs/afp`](.) plus [`@amlhubs/smm`](../smm/README.md) plus [`@amlhubs/uml`](../uml/README.md) is the executable-typed-artefact backbone of an ISO-traceable software-sizing service.

The second business lever is agentic runtime leverage. Ageni's Probabilistic Reduction Engine consumes the AFP library as the deterministic substrate over which the counting agent reasons. A counting agent that writes an AFP score against the typed `Measure` instances exported here cannot fabricate a measure that does not exist in the AFP §6–§7 inventory, cannot mis-relate `EOCsum` to anything other than `FTR_EO` and `DET_EO`, and cannot mis-attribute the `wILF` weight table without TypeScript flagging the deviation at compile time. Structural hallucinations that would otherwise slip past a natural-language review (inventing a measure, mis-typing a complexity tier, misidentifying a KDM-recognizer predicate) are caught at `tsc` time, and every surviving reference traces to an AFP §-section through the JSDoc header.

The third lever is compounding reuse across estimation domains. A typed AFP library composes upward into a [Software Cost Estimation Profile (SCE)](https://www.omg.org/spec/SCE/) implementation, into a [SysML Requirement](https://www.omg.org/spec/SysML/) traceability surface that links function-point counts to user requirements, and into a [VDML](../vdml/README.md) value-delivery analysis that ties measured size to monetized business outcomes. Every downstream ageni venture — illummaa.com's modular-housing software-platform sizing estimates, dealsempire's pitch-generation cost calibration, lesvolsarabais.ca's subscription-engine effort baseline — can reuse the same `@amlhubs/afp` typed surface as its costing input without rebuilding the AFP semantics for each venture.

The fourth lever is composability across the OMG measurement stack. AFP 1.0 is the first OMG-formalised industrial application of SMM 1.2; adopting it through a typed package makes every subsequent OMG-formalised SMM library — [Automated Quality Characteristic Measures (AQCM)](https://www.omg.org/spec/AQCM/), [Automated Technical Debt (ATDM)](https://www.omg.org/spec/ATDM/), [Automated Source Code Maintainability (ASCMM)](https://www.omg.org/spec/ASCMM/), [Automated Source Code Reliability (ASCRM)](https://www.omg.org/spec/ASCRM/), [Automated Source Code Performance Efficiency (ASCPEM)](https://www.omg.org/spec/ASCPEM/), [Automated Source Code Security (ASCSM)](https://www.omg.org/spec/ASCSM/) — installable through the same `@amlhubs/{name}` pattern this package establishes, with zero metamodel rework per addition.

## Scope — What the Package Surfaces

The package exports the complete AFP 1.0 measurement library as typed SMM 1.2 instance constants. Every constant carries a JSDoc header citing the precise AFP §-section that defines it.

| AFP Concept | §Section | SMM Metaclass | Instances Surfaced |
|---|---|---|---|
| Measurement Category | §6 | `MeasureCategory` | `FunctionalMeasures` |
| Trait / Characteristic | §6 | `Characteristic` | `General`, `ExternalOutputSize`, `ExternalInputSize`, `InternalLogicalFileSizeAndExternaInterfaceFileSize`, `AutomatedFunctionPointSize` |
| Scope (KDM-bound) | §6 | `Scope` | `Element`, `EO`, `EI`, `LF`, `Segment` |
| KDM Recognizer Operation | §6 | `Operation` | `isEO`, `getEOs`, `isEI`, `getEIs`, `isILF`, `getILFs`, `isEIF`, `getEIFs`, `isLF` |
| Base Dimensional Measure | §7 | `DimensionalMeasure` | `FTR`, `DET`, `RET` |
| Tier-Mapped Rescaled Measure | §7 | `RescaledMeasure` | `FTR_EO`, `DET_EO`, `EOC`, `wEO`, `FTR_EI`, `DET_EI`, `EIC`, `wEI`, `RET_LF`, `DET_LF`, `DFC`, `wILF`, `wEIF` |
| Two-Input Sum | §7 | `BinaryMeasure` | `EOCsum`, `EICSum`, `DFCsum` |
| Aggregated Size | §7 | `CollectiveMeasure` | `EOs`, `EIs`, `ILFs`, `EIFs`, `AFPs` |
| Measure Relationship Edges | §7 | `RescaledMeasureRelationship`, `Base1MeasureRelationship`, `Base2MeasureRelationship`, `BaseMeasureRelationship` | 17 edges connecting the measures above |

The complete enumeration lives in [`afp.ts`](./afp.ts). The frozen `library` aggregator at the bottom of the file binds every measure, scope, characteristic, and operation under the canonical AFP `MeasureLibrary` named `AutomatedFunctionPointLibrary` (XMI id `_XW4E8POaEeGAl6dCCRBZ4Q`, per the OMG-published `AutomatedFunctionPoint.xmi`).

## Dependency Topology

```
@amlhubs/uml         (UML 2.5.1 — root)
      ▲
      │ peerDependency
      └── @amlhubs/smm   (SMM 1.2 — measurement metamodel)
            ▲
            │ peerDependency
            └── @amlhubs/afp   (this package — typed AFP measurement library)
```

The edges are load-bearing. `@amlhubs/afp` imports `IMeasureCategory`, `ICharacteristic`, `IScope`, `IOperation`, `IDimensionalMeasure`, `IRescaledMeasure`, `IBinaryMeasure`, `ICollectiveMeasure`, `IMeasureLibrary`, `ISmmModel`, `IBaseMeasureRelationship`, `IBase1MeasureRelationship`, `IBase2MeasureRelationship`, and `IRescaledMeasureRelationship` from `@amlhubs/smm`. It re-exports the AFP `MeasureLibrary` instance plus every owned measure, scope, characteristic, and operation as typed TypeScript constants.

## Installation & Usage

```bash
npm install @amlhubs/afp
```

```typescript
import { afp } from '@amlhubs/afp';

// Resolve any AFP measure by its canonical name
console.log(afp.measure.afps.name);              // 'AFPs'
console.log(afp.measure.afps.shortDescription);  // 'Automated Function Point Size'

// Walk the AFP library
for (const measureId of afp.library.measureElementIds) { /* … */ }

// Bind to a KDM-recognizer
console.log(afp.operation.isEO.description);     // KDM Element predicate for External Output
```

The source artifact is [`afp.ts`](./afp.ts). Every constant JSDoc header declares `@standard OMG AFP 1.0 -- formal/14-01-03` and an `@section §x.y` reference to the AFP specification.

## Provenance & Formal References

- [OMG AFP 1.0 specification](https://www.omg.org/spec/AFP/1.0/) — formal/14-01-03 (December 2013)
- [OMG AFP machine-readable XMI](https://www.omg.org/spec/AFP/20120901/AutomatedFunctionPoint.xmi) — admtf/12-09-02
- [ISO/IEC 19515:2019](https://www.iso.org/standard/72076.html) — ISO adoption
- [OMG Structured Metrics Metamodel (SMM) 1.2](https://www.omg.org/spec/SMM/1.2/) — formal/2018-01-01 (upstream metamodel)
- [OMG Knowledge Discovery Metamodel (KDM)](https://www.omg.org/spec/KDM/) — measurand metamodel referenced by AFP `Scope.scopeClass`
- [IFPUG Function Point Counting Practices Manual](https://www.ifpug.org/ifpug-standards/) — original counting practices AFP automates
- [Object Management Group home](https://www.omg.org/)
- [CISQ — Consortium for Information & Software Quality](https://www.it-cisq.org/) — AFP co-author
